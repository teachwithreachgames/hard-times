/* ═══════════════════════════════════════════════════════════════════════════
 *  HARD TIMES — Canada 1928  |  game-logic.js
 *
 *  The full game engine: constants, state, calculations, logic, rendering,
 *  screen navigation, and entry-point handlers.
 *
 *  Depends on: game-data.js  (must be loaded first)
 * ═══════════════════════════════════════════════════════════════════════════ */


// ─────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────

const MONTH_NAMES = [
  "January", "February", "March",     "April",   "May",      "June",
  "July",    "August",   "September", "October", "November", "December"
];

const MONTH_NAMES_FR = [
  "Janvier", "Février", "Mars",   "Avril",    "Mai",      "Juin",
  "Juillet", "Août",    "Septembre", "Octobre", "Novembre", "Décembre"
];

const GAME_START_YEAR = 1928;
const GAME_END_TURN   = 143;   // December 1939
const INDEX_START     = 100;
const LOG_MAX_ENTRIES = 60;


// ─────────────────────────────────────────────────────────────────────────
// CONFIGURATION
// ─────────────────────────────────────────────────────────────────────────

const MARGIN_CONFIG = {
  monthlyInterestRate:    0.05,  // 5%/month ≈ 80%/year — typical 1920s broker rate
  maxDebt:                3000,  // maximum the broker will lend
  marginCallThreshold:    0.25,  // portfolio must cover ≥ 25¢ per $1 of debt
  marginWarningThreshold: 0.50,  // warning shown below 50%
  minTransactionAmount:   50
};

const EVENT_CONFIG = {
  baseEventProbability: 0.30,  // 30% base chance per turn
  crashEventMultiplier: 1.5    // each 1% market drop adds 1.5pp to firing probability
};


// ─────────────────────────────────────────────────────────────────────────
// AUDIO SYSTEM
//
// song_1.mp3  — plays on intro, character selection, and rules screens (loop)
// song_2.mp3  — gameplay track 1 (plays first, then hands off to song_3)
// song_3.mp3  — gameplay track 2 (plays after song_2, then hands off to song_4)
// song_4.mp3  — gameplay track 3 (plays after song_3, then loops back to song_2)
//
// Browser autoplay policy blocks audio until the first user interaction.
// A one-time click listener on the document starts song_1 as soon as the
// player clicks anything on the intro/character/rules screens.
// ─────────────────────────────────────────────────────────────────────────

const AUDIO = {
  char: new Audio("audio/song_1.mp3"),
  gameplay: [
    new Audio("audio/song_2.mp3"),
    new Audio("audio/song_3.mp3"),
    new Audio("audio/song_4.mp3")
  ],
  current:          null,   // Audio object currently playing
  gameplayIndex:    0,      // which gameplay track is active (0–2)
  inGameplay:       false,  // true once the game screen is active
  audioUnlocked:    false   // true after first user interaction
};

// song_1 loops on its own
AUDIO.char.loop = true;

// When a gameplay track ends, advance to the next one (2→3→4→2→…)
AUDIO.gameplay.forEach((track, i) => {
  track.addEventListener("ended", () => {
    if (!AUDIO.inGameplay) return;
    AUDIO.gameplayIndex = (i + 1) % AUDIO.gameplay.length;
    playGameplayTrack();
  });
});

/*
 * unlockAudio() — called on the first user click anywhere on the page.
 * Starts song_1 immediately; after that, audio plays freely.
 */
function unlockAudio() {
  if (AUDIO.audioUnlocked) return;
  AUDIO.audioUnlocked = true;
  if (!AUDIO.inGameplay) playTrack(AUDIO.char);
}
document.addEventListener("click", unlockAudio, { once: true });

/*
 * playTrack(audio) — stop whatever is playing and start the given Audio object.
 * Safe to call if the track is already playing (won't restart it).
 */
function playTrack(audio) {
  if (AUDIO.current === audio) return;
  if (AUDIO.current) {
    AUDIO.current.pause();
    AUDIO.current.currentTime = 0;
  }
  AUDIO.current = audio;
  audio.play().catch(() => {});
}

/*
 * playGameplayTrack() — start the gameplay track at AUDIO.gameplayIndex.
 */
function playGameplayTrack() {
  const track = AUDIO.gameplay[AUDIO.gameplayIndex];
  // Reset so it plays from the start even if it had played before
  if (AUDIO.current !== track) {
    if (AUDIO.current) {
      AUDIO.current.pause();
      AUDIO.current.currentTime = 0;
    }
    AUDIO.current = track;
  }
  track.play().catch(() => {});
}

/*
 * startGameplayMusic() — called when the game screen opens.
 * Switches from song_1 to the gameplay playlist starting at song_2.
 */
function startGameplayMusic() {
  AUDIO.inGameplay   = true;
  AUDIO.gameplayIndex = 0;
  if (AUDIO.char) {
    AUDIO.char.pause();
    AUDIO.char.currentTime = 0;
  }
  AUDIO.current = null;
  playGameplayTrack();
}

/*
 * stopAllAudio() — pause everything. Called on game-over.
 */
function stopAllAudio() {
  AUDIO.inGameplay = false;
  if (AUDIO.current) {
    AUDIO.current.pause();
    AUDIO.current.currentTime = 0;
    AUDIO.current = null;
  }
}


// ─────────────────────────────────────────────────────────────────────────
// GAME STATE
// ─────────────────────────────────────────────────────────────────────────

let state = {};

// The character the player has selected (set by selectCharacter())
let selectedCharacter = null;

/*
 * resetState(char) — rebuild the full game state from a character profile.
 * Called at the start of a new game and when restarting.
 */
function resetState(char) {
  const prices     = {};
  const prevPrices = {};
  const holdings   = {};
  STOCKS.forEach(stock => {
    prices[stock.id]     = stock.startPrice;
    prevPrices[stock.id] = stock.startPrice;
    holdings[stock.id]   = 0;
  });

  state = {
    turn: 0,

    cash:    char.startingCash,
    holdings,
    prices,
    prevPrices,
    debt:    0,

    indexValue:     INDEX_START,
    prevIndexValue: INDEX_START,

    employed:         true,
    monthlyWage:      char.startingWage,
    monthlyFoodCost:  char.startingFood,
    monthlyRent:      char.startingRent,
    lastLifeEventId:  null,

    isPrairie:        char.isPrairie,
    characterName:    char.name,
    characterRole:    `${char.occupation} · ${char.province}`,
    characterId:      char.id,

    // Student identity (set once on intro screen, preserved across resets)
    studentName: state.studentName || "Student",

    // Family wellbeing (0–100 each)
    familyHealth:  100,
    familyFood:    100,
    familyMorale:  100,

    // NPC neighbour
    neighbourId:        char.id,
    lastNeighbourEvent: null,

    // Modal / decision tracking
    shownDecisionIds: new Set(),
    shownTipIds:      new Set(),
    modalPending:     null,

    // Reflection journal
    journal:             [],   // { year, question, answer, netWorth, employed, turn }
    decisionLog:         [],   // { turn, year, label, text } — records player choices
    shownReflectionYears: new Set(),

    // Snapshot for annual report card
    yearStartNetWorth: char.startingCash,
    yearStartCash:     char.startingCash,

    log: [],

    shownEduNoteIds:            new Set(),
    forcedSaleOccurredThisGame: false,
    reliefCamp:                 false,

    // Historical photo database
    shownPhotoTurns:  new Set(),
    collectedPhotos:  []          // { turn, title, year, caption, imageUrl, attribution }
  };
}


// ─────────────────────────────────────────────────────────────────────────
// PURE CALCULATIONS
// ─────────────────────────────────────────────────────────────────────────

function currentDate() {
  const totalMonths = GAME_START_YEAR * 12 + state.turn;
  const year        = Math.floor(totalMonths / 12);
  const monthIndex  = totalMonths % 12;
  const months = window.LANG === "fr" ? MONTH_NAMES_FR : MONTH_NAMES;
  return { year, monthIndex, label: `${months[monthIndex]} ${year}` };
}

function calcPortfolioValue() {
  return STOCKS.reduce(
    (total, stock) => total + state.holdings[stock.id] * state.prices[stock.id], 0
  );
}

function calcNetWorth() {
  return state.cash + calcPortfolioValue() - state.debt;
}

function calcMarginRatio() {
  if (state.debt === 0) return null;
  return calcPortfolioValue() / state.debt;
}

function formatDollars(amount) {
  return Math.abs(amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


// ─────────────────────────────────────────────────────────────────────────
// GAME LOGIC
// ─────────────────────────────────────────────────────────────────────────

function addLogEntry(text, cssClass = "") {
  const { label } = currentDate();
  state.log.unshift({ text: `[${label}] ${text}`, cls: cssClass });
  if (state.log.length > LOG_MAX_ENTRIES) state.log.pop();
}

/*
 * advancePrices() — move the market index and all stock prices forward one month.
 * Returns the indexChange for use in nextTurn().
 */
function advancePrices() {
  const indexChange = MARKET_INDEX_CHANGES[state.turn] || 0;
  state.prevIndexValue = state.indexValue;
  state.indexValue     = Math.max(0.01, state.indexValue * (1 + indexChange));
  STOCKS.forEach(stock => {
    state.prevPrices[stock.id] = state.prices[stock.id];
    state.prices[stock.id]     = Math.max(0.01, state.prices[stock.id] * (1 + indexChange * stock.volatility));
  });
  return indexChange;
}

function applyMonthlyInterest() {
  if (state.debt <= 0) return 0;
  const interest = state.debt * MARGIN_CONFIG.monthlyInterestRate;
  state.debt += interest;
  return interest;
}

/*
 * checkMarginCall() — force-liquidate holdings if portfolio/debt < threshold.
 * Most-volatile stocks sold first (mirrors real broker behaviour).
 */
function checkMarginCall() {
  const ratio = calcMarginRatio();
  if (ratio === null || ratio >= MARGIN_CONFIG.marginCallThreshold) return false;

  const pct = (ratio * 100).toFixed(0);
  const L = window.LANG;
  addLogEntry(
    L === "fr"
      ? `APPEL DE MARGE ! Le portefeuille ne couvre que ${pct} % de la dette. Le courtier liquide vos avoirs.`
      : `MARGIN CALL! Portfolio covers only ${pct}% of debt. Broker liquidates your holdings.`,
    "bad"
  );

  const liquidationOrder = [...STOCKS].sort((a, b) => b.volatility - a.volatility);
  for (const stock of liquidationOrder) {
    if (state.debt <= 0) break;
    const shares = state.holdings[stock.id];
    if (shares <= 0) continue;
    const proceeds    = shares * state.prices[stock.id];
    const repaid      = Math.min(state.debt, proceeds);
    state.holdings[stock.id] = 0;
    state.debt  -= repaid;
    state.cash  += (proceeds - repaid);
    addLogEntry(
      L === "fr"
        ? `Vente forcée : ${shares} × ${stock.name} à ${formatDollars(state.prices[stock.id])} $ — ${formatDollars(repaid)} $ remboursés.`
        : `Forced sale: ${shares} × ${stock.name} @ $${formatDollars(state.prices[stock.id])} — $${formatDollars(repaid)} repaid.`,
      "bad"
    );
  }
  if (state.debt > 0) {
    addLogEntry(
      L === "fr"
        ? `Actifs épuisés. Vous devez encore ${formatDollars(state.debt)} $ au courtier.`
        : `Assets exhausted. You still owe $${formatDollars(state.debt)} to the broker.`,
      "bad"
    );
  }
  return true;
}

/*
 * applyHouseholdEconomics() — settle wages, food, and rent each month.
 * Life events run BEFORE this so layoffs affect the same turn's wages.
 */
function applyHouseholdEconomics() {
  const wages    = state.employed ? state.monthlyWage : 0;
  const expenses = state.monthlyFoodCost + state.monthlyRent;
  const netFlow  = wages - expenses;
  state.cash += netFlow;

  const sign      = netFlow >= 0 ? "+" : "−";
  const cls       = netFlow >= 0 ? "good" : "warn";
  const L = window.LANG;
  const wagesDesc = state.employed
    ? (L === "fr" ? `salaire ${formatDollars(wages)} $` : `wages $${formatDollars(wages)}`)
    : t("log_no_wages");
  const foodLabel = L === "fr" ? "nourriture" : "food";
  const rentLabel = L === "fr" ? "loyer" : "rent";
  const hhLabel   = L === "fr" ? "Ménage" : "Household";
  addLogEntry(
    `${hhLabel}: ${wagesDesc} — ${foodLabel} ${L === "fr" ? "" : "$"}${formatDollars(state.monthlyFoodCost)}${L === "fr" ? " $" : ""} — ${rentLabel} ${L === "fr" ? "" : "$"}${formatDollars(state.monthlyRent)}${L === "fr" ? " $" : ""} — net ${sign}${L === "fr" ? "" : "$"}${formatDollars(Math.abs(netFlow))}${L === "fr" ? " $" : ""}.`,
    cls
  );
}

/*
 * forceSellForSurvival() — if cash is negative, auto-sell stocks to cover shortfall.
 * Sells least-volatile first (banks before speculative stocks).
 */
function forceSellForSurvival() {
  if (state.cash >= 0) return;

  const sellOrder = [...STOCKS].sort((a, b) => a.volatility - b.volatility);

  for (const stock of sellOrder) {
    if (state.cash >= 0) break;
    const sharesHeld = state.holdings[stock.id];
    if (sharesHeld <= 0) continue;

    const deficit       = -state.cash;
    const pricePerShare = state.prices[stock.id];
    const sharesToSell  = Math.min(sharesHeld, Math.ceil(deficit / pricePerShare));
    const proceeds      = sharesToSell * pricePerShare;

    state.cash              += proceeds;
    state.holdings[stock.id] -= sharesToSell;
    state.forcedSaleOccurredThisGame = true;

    addLogEntry(
      window.LANG === "fr"
        ? `★ Argent épuisé — vendu ${sharesToSell} × ${stock.name} à ${formatDollars(pricePerShare)} $ pour couvrir la nourriture et le loyer.`
        : `★ Cash depleted — sold ${sharesToSell} × ${stock.name} @ $${formatDollars(pricePerShare)} to cover food and rent.`,
      "warn"
    );
  }
}

/*
 * fireLifeEvent(indexChange) — pick and apply one eligible life event.
 * Fires BEFORE household economics so employment changes affect same-turn wages.
 */
function fireLifeEvent(indexChange) {
  const eligible = LIFE_EVENTS.filter(e =>
    e.id !== state.lastLifeEventId && e.condition(state, indexChange)
  );
  if (eligible.length === 0) return;

  const crashSeverity  = Math.max(0, -indexChange);
  const probability    = EVENT_CONFIG.baseEventProbability + crashSeverity * EVENT_CONFIG.crashEventMultiplier;
  if (Math.random() > probability) return;

  const chosen = eligible[Math.floor(Math.random() * eligible.length)];
  chosen.effect(state);
  state.lastLifeEventId = chosen.id;

  const eventKey = "event_" + chosen.id;
  const eventText = TR[eventKey] ? t(eventKey) : chosen.text;
  addLogEntry(`★ ${eventText}`, chosen.cls);

  const banner       = document.getElementById("life-event-banner");
  banner.textContent = eventText;
  banner.className   = "show";
}

function buyStock(stockId, quantity) {
  const L = window.LANG;
  if (quantity <= 0 || isNaN(quantity)) return { ok: false, msg: L === "fr" ? "Entrez une quantité valide." : "Enter a valid quantity." };
  const cost = quantity * state.prices[stockId];
  const name = STOCKS.find(s => s.id === stockId).name;
  if (cost > state.cash) {
    return { ok: false, msg: L === "fr" ? `Besoin de ${formatDollars(cost)} $ — seulement ${formatDollars(state.cash)} $ disponibles.` : `Need $${formatDollars(cost)} — only $${formatDollars(state.cash)} on hand.` };
  }
  state.cash -= cost;
  state.holdings[stockId] += quantity;
  return { ok: true, msg: L === "fr" ? `Acheté ${quantity} × ${name} pour ${formatDollars(cost)} $.` : `Bought ${quantity} × ${name} for $${formatDollars(cost)}.` };
}

function sellStock(stockId, quantity) {
  const L = window.LANG;
  if (quantity <= 0 || isNaN(quantity)) return { ok: false, msg: L === "fr" ? "Entrez une quantité valide." : "Enter a valid quantity." };
  const held = state.holdings[stockId];
  if (quantity > held) return { ok: false, msg: L === "fr" ? `Vous ne détenez que ${held} action(s).` : `You only hold ${held} share(s).` };
  const name     = STOCKS.find(s => s.id === stockId).name;
  const proceeds = quantity * state.prices[stockId];
  state.cash += proceeds;
  state.holdings[stockId] -= quantity;
  return { ok: true, msg: L === "fr" ? `Vendu ${quantity} × ${name} pour ${formatDollars(proceeds)} $.` : `Sold ${quantity} × ${name} for $${formatDollars(proceeds)}.` };
}

function borrowMoney(amount) {
  const L = window.LANG;
  if (isNaN(amount) || amount < MARGIN_CONFIG.minTransactionAmount) {
    return { ok: false, msg: L === "fr" ? `Emprunt minimum de ${MARGIN_CONFIG.minTransactionAmount} $.` : `Minimum borrow is $${MARGIN_CONFIG.minTransactionAmount}.` };
  }
  if (state.debt + amount > MARGIN_CONFIG.maxDebt) {
    const avail = MARGIN_CONFIG.maxDebt - state.debt;
    if (avail <= 0) return { ok: false, msg: L === "fr" ? `Limite de crédit de ${formatDollars(MARGIN_CONFIG.maxDebt)} $ atteinte.` : `Credit limit of $${formatDollars(MARGIN_CONFIG.maxDebt)} reached.` };
    return { ok: false, msg: L === "fr" ? `Vous pouvez emprunter au maximum ${formatDollars(avail)} $ de plus.` : `You may borrow at most $${formatDollars(avail)} more.` };
  }
  state.debt += amount;
  state.cash += amount;
  return { ok: true, msg: L === "fr" ? `Emprunté ${formatDollars(amount)} $ à ${(MARGIN_CONFIG.monthlyInterestRate * 100).toFixed(0)} %/mois. Dette totale : ${formatDollars(state.debt)} $.` : `Borrowed $${formatDollars(amount)} at ${(MARGIN_CONFIG.monthlyInterestRate * 100).toFixed(0)}%/month. Total debt: $${formatDollars(state.debt)}.` };
}

function repayDebt(amount) {
  const L = window.LANG;
  if (isNaN(amount) || amount < MARGIN_CONFIG.minTransactionAmount) {
    return { ok: false, msg: L === "fr" ? `Remboursement minimum de ${MARGIN_CONFIG.minTransactionAmount} $.` : `Minimum repayment is $${MARGIN_CONFIG.minTransactionAmount}.` };
  }
  if (state.debt === 0) return { ok: false, msg: L === "fr" ? "Vous n'avez aucune dette." : "You have no outstanding debt." };
  const repay = Math.min(amount, state.debt);
  if (repay > state.cash) {
    return { ok: false, msg: L === "fr" ? `Pas assez d'argent. Vous avez ${formatDollars(state.cash)} $ mais avez besoin de ${formatDollars(repay)} $.` : `Not enough cash. You have $${formatDollars(state.cash)} but need $${formatDollars(repay)}.` };
  }
  state.cash -= repay;
  state.debt -= repay;
  return { ok: true, msg: L === "fr" ? `Remboursé ${formatDollars(repay)} $. Dette restante : ${formatDollars(state.debt)} $.` : `Repaid $${formatDollars(repay)}. Remaining debt: $${formatDollars(state.debt)}.` };
}


// ─────────────────────────────────────────────────────────────────────────
// EDUCATIONAL LAYER
// ─────────────────────────────────────────────────────────────────────────

function showEduToast(text) {
  document.getElementById("edu-toast-body").textContent = text;
  document.getElementById("edu-toast").classList.add("show");
}

function dismissEduToast() {
  document.getElementById("edu-toast").classList.remove("show");
}

/*
 * fireEduNotes(indexChange) — deliver one educational note per turn.
 * Priority 1: scheduled turn-keyed note. Priority 2: condition-based note.
 */
function fireEduNotes(indexChange) {
  const turnNote = EDU_TURN_NOTES[state.turn];
  if (turnNote) {
    const eduKey = "edu_" + state.turn;
    const eduText = TR[eduKey] ? t(eduKey) : turnNote.text;
    addLogEntry(`📖 ${eduText}`, "edu");
    if (turnNote.popup) showEduToast(eduText);
    return;
  }
  for (const note of EDU_CONDITION_NOTES) {
    if (state.shownEduNoteIds.has(note.id)) continue;
    if (!note.condition(state, indexChange)) continue;
    state.shownEduNoteIds.add(note.id);
    const condKey = "edu_" + note.id;
    const condText = TR[condKey] ? t(condKey) : note.text;
    addLogEntry(`📖 ${condText}`, "edu");
    if (note.popup) showEduToast(condText);
    break;
  }
}


// ─────────────────────────────────────────────────────────────────────────
// MODAL SYSTEM
// Handles decision prompts, hot tips, and annual report cards.
// While a modal is showing, the Next Turn button is disabled.
// ─────────────────────────────────────────────────────────────────────────

function showModal(config) {
  document.getElementById("modal-title").textContent = config.title || "Hard Times";
  document.getElementById("modal-date").textContent  = currentDate().label;
  document.getElementById("modal-body").innerHTML    = config.body;
  document.getElementById("modal-footer").innerHTML  = config.footer;
  document.getElementById("modal-backdrop").classList.add("show");
  document.getElementById("next-turn-btn").disabled = true;
}

function closeModal() {
  document.getElementById("modal-backdrop").classList.remove("show");
  document.getElementById("next-turn-btn").disabled = false;
}

function buildDecisionModal(prompt) {
  // Map prompt IDs to translation key prefixes
  const prefixMap = {
    "broker_tip_1928": "decision_broker",
    "crash_warning_1929": "decision_warning",
    "relief_camp_1932": "decision_relief",
    "bank_run_1931": "decision_bank",
    "sell_house_1933": "decision_house"
  };
  const prefix = prefixMap[prompt.id];

  const kickerText   = prefix && TR[prefix + "_kicker"] ? t(prefix + "_kicker") : prompt.kicker;
  const titleText    = prefix && TR[prefix + "_title"] ? t(prefix + "_title") : prompt.title;
  const bodyText     = prefix && TR[prefix + "_body"] ? t(prefix + "_body") : prompt.body;

  const kicker   = `<div class="modal-kicker">${kickerText}</div>`;
  const headline = `<div class="modal-headline">${titleText}</div>`;
  const text     = `<div class="modal-text">${bodyText}</div>`;

  const choiceLetters = ["a", "b", "c"];
  const choices  = prompt.choices.map((c, i) => {
    const letter = choiceLetters[i];
    const cLabel = prefix && TR[prefix + "_" + letter + "_label"] ? t(prefix + "_" + letter + "_label") : c.label;
    const cText  = prefix && TR[prefix + "_" + letter + "_text"] ? t(prefix + "_" + letter + "_text") : c.text;
    return `
    <button class="modal-choice-btn" onclick="resolveDecision(${i})">
      <span class="choice-label">${cLabel}</span>
      ${cText}
    </button>`;
  }).join("");

  const body   = kicker + headline + text + `<div class="modal-choices">${choices}</div>`;
  const footer = `<span style="font-family:'Courier Prime',monospace;font-size:9px;color:var(--faded);font-style:italic">${t("modal_must_choose")}</span>`;
  showModal({ title: t("modal_decision"), body, footer });
  state.modalPending = prompt;
}

function resolveDecision(choiceIndex) {
  const prompt = state.modalPending;
  if (!prompt) return;
  const choice = prompt.choices[choiceIndex];
  choice.effect(state);
  const { year } = currentDate();

  // Get translated label for log
  const prefixMap = {
    "broker_tip_1928": "decision_broker",
    "crash_warning_1929": "decision_warning",
    "relief_camp_1932": "decision_relief",
    "bank_run_1931": "decision_bank",
    "sell_house_1933": "decision_house"
  };
  const prefix = prefixMap[prompt.id];
  const choiceLetters = ["a", "b", "c"];
  const letter = choiceLetters[choiceIndex];
  const cLabel = prefix && TR[prefix + "_" + letter + "_label"] ? t(prefix + "_" + letter + "_label") : choice.label;
  const cText  = prefix && TR[prefix + "_" + letter + "_text"] ? t(prefix + "_" + letter + "_text") : choice.text;
  const cleanLabel = cLabel.replace(/Option [A-C] — /, "");

  state.decisionLog.push({
    turn:  state.turn,
    year,
    label: cleanLabel,
    text:  cText
  });
  const decLabel = window.LANG === "fr" ? "Décision" : "Decision";
  addLogEntry(`${decLabel}: ${cleanLabel} — ${cText}`, "warn");
  state.modalPending = null;
  closeModal();
  renderAll();
}

function buildTipModal(tip) {
  // Map tip IDs to translation key prefixes
  const tipPrefixMap = {
    "tip_rca_buy": "tip_rca",
    "tip_banks_safe": "tip_banks",
    "tip_sell_before_crash": "tip_sell",
    "tip_gm_layoffs": "tip_gm",
    "tip_buy_low_1932": "tip_buy_low",
    "tip_cpr_steady": "tip_cpr",
    "tip_war_economy": "tip_war"
  };
  const prefix = tipPrefixMap[tip.id];
  const tipTitle  = prefix && TR[prefix + "_title"] ? t(prefix + "_title") : tip.title;
  const tipBody   = prefix && TR[prefix + "_body"] ? t(prefix + "_body") : tip.body;
  const tipSource = prefix && TR[prefix + "_source"] ? t(prefix + "_source") : tip.source;

  const flag     = `<span class="modal-tip-flag">${t("modal_hot_tip_flag")}</span>`;
  const headline = `<div class="modal-headline">${tipTitle}</div>`;
  const text     = `<div class="modal-text">${tipBody}</div>`;
  const source   = `<div class="modal-tip-source">${tipSource}</div>`;
  const body     = flag + headline + text + source;
  const footer   = `<button class="screen-btn" onclick="closeTip()">${t("modal_noted")}</button>`;
  showModal({ title: t("modal_hot_tip"), body, footer });
}

function closeTip() {
  state.modalPending = null;
  closeModal();
}

function buildReportCard(year) {
  const nw        = calcNetWorth();
  const nwDelta   = nw - state.yearStartNetWorth;
  const employed  = state.employed ? t("modal_report_yes") : t("modal_report_no");
  const deltaSign = nwDelta >= 0 ? "+" : "−";
  const deltaVal  = `${deltaSign}$${formatDollars(Math.abs(nwDelta))}`;
  const deltaCls  = nwDelta >= 0 ? "good" : "bad";

  const indexNow  = state.indexValue;
  const verdict   = buildReportVerdict(year, nwDelta);

  const grid = `
    <div class="modal-report-grid">
      <div class="modal-report-stat">
        <div class="modal-report-stat-label">${t("modal_report_nw")}</div>
        <div class="modal-report-stat-value">${nw >= 0 ? "$" : "−$"}${formatDollars(nw)}</div>
      </div>
      <div class="modal-report-stat">
        <div class="modal-report-stat-label">${t("modal_report_change")}</div>
        <div class="modal-report-stat-value ${deltaCls}">${deltaVal}</div>
      </div>
      <div class="modal-report-stat">
        <div class="modal-report-stat-label">${t("modal_report_cash")}</div>
        <div class="modal-report-stat-value">$${formatDollars(state.cash)}</div>
      </div>
      <div class="modal-report-stat">
        <div class="modal-report-stat-label">${t("modal_report_employed")}</div>
        <div class="modal-report-stat-value ${state.employed ? "good" : "bad"}">${employed}</div>
      </div>
      <div class="modal-report-stat">
        <div class="modal-report-stat-label">${t("modal_report_debt")}</div>
        <div class="modal-report-stat-value ${state.debt > 0 ? "bad" : ""}">${state.debt > 0 ? "$" + formatDollars(state.debt) : t("modal_report_none")}</div>
      </div>
      <div class="modal-report-stat">
        <div class="modal-report-stat-label">${t("modal_report_index")}</div>
        <div class="modal-report-stat-value">${indexNow.toFixed(1)}</div>
      </div>
    </div>`;

  const kickerText = tf("modal_report_kicker", { year });
  const headText   = tf("modal_report_headline", { year });
  const body   = `<div class="modal-kicker">${kickerText}</div>
    <div class="modal-headline">${headText}</div>` + grid +
    `<div class="modal-report-verdict">${verdict}</div>`;
  const footer = `<button class="screen-btn" onclick="closeReportCard()">${tf("modal_begin_year", { year: year + 1 })}</button>`;
  showModal({ title: tf("modal_report_title", { year }), body, footer });
}

function buildReportVerdict(year, nwDelta) {
  if (year === 1928) return t("verdict_1928");
  if (year === 1929) return nwDelta < -200 ? t("verdict_1929_bad") : t("verdict_1929_ok");
  if (year <= 1932) return nwDelta < 0
    ? tf("verdict_dark_bad", { year })
    : tf("verdict_dark_ok", { year });
  if (year <= 1935) return t("verdict_mid");
  if (year <= 1938) return t("verdict_late");
  return t("verdict_end");
}

function closeReportCard() {
  const year = state._reportYear;
  state.modalPending = null;
  closeModal();
  // Snapshot for next year's comparison (set here so it uses the just-closed year's values)
  state.yearStartNetWorth = calcNetWorth();
  state.yearStartCash     = state.cash;
  // Reflection fires immediately after the report card each December
  if (!checkReflection(year)) {
    // No reflection this year — check if a photo is waiting for this turn
    checkHistoricalPhoto();
  }
}

/*
 * checkDecisionPrompts() — fire a decision prompt if one is scheduled for this turn.
 */
function checkDecisionPrompts() {
  for (const prompt of DECISION_PROMPTS) {
    if (prompt.turn === state.turn && !state.shownDecisionIds.has(prompt.id)) {
      state.shownDecisionIds.add(prompt.id);
      buildDecisionModal(prompt);
      return true;
    }
  }
  return false;
}

/*
 * checkHotTips() — randomly fire a hot tip if one is eligible this turn.
 */
function checkHotTips() {
  const eligible = HOT_TIPS.filter(t =>
    !state.shownTipIds.has(t.id) &&
    state.turn >= t.minTurn &&
    state.turn <= t.maxTurn &&
    Math.random() < t.probability
  );
  if (eligible.length === 0) return false;
  const tip = eligible[Math.floor(Math.random() * eligible.length)];
  state.shownTipIds.add(tip.id);
  buildTipModal(tip);
  return true;
}

/*
 * checkAnnualReport() — show the year-end report card every December.
 */
function checkAnnualReport() {
  const { monthIndex, year } = currentDate();
  if (monthIndex === 11) {  // December (0-indexed month 11)
    buildReportCard(year);
    return true;
  }
  return false;
}


// ─────────────────────────────────────────────────────────────────────────
// FAMILY METER
// ─────────────────────────────────────────────────────────────────────────

/*
 * updateFamilyMeters() — recalculate health, food, and morale each turn
 * based on cash flow, employment, and market conditions.
 */
function updateFamilyMeters(indexChange) {
  const wages   = state.employed ? state.monthlyWage : 0;
  const netFlow = wages - state.monthlyFoodCost - state.monthlyRent;

  // ── FOOD ──────────────────────────────────────────────────────────────
  // Degrades when cash is nearly gone or expenses exceed income.
  // Only recovers when genuinely stable (positive flow AND reasonable cash).
  // Once at 0, it stays at 0 until conditions clearly improve.
  if (netFlow < -10 || state.cash < 10) {
    state.familyFood = Math.max(0, state.familyFood - 15);
  } else if (netFlow >= 0 && state.cash >= 50 && state.familyFood < 100) {
    state.familyFood = Math.min(100, state.familyFood + 5);
  }
  // Hard floor: food cannot recover at all if still in deficit
  if (netFlow < 0 && state.familyFood === 0) {
    state.familyFood = 0;
  }

  // ── HEALTH ────────────────────────────────────────────────────────────
  // Follows food closely but lags behind — degrades when food is poor,
  // only recovers slowly when food is genuinely good.
  // Once at 0, requires food > 70 sustained to recover (not just > 60).
  if (state.familyFood < 30) {
    state.familyHealth = Math.max(0, state.familyHealth - 10);
  } else if (state.familyFood >= 70 && state.cash >= 20 && state.familyHealth < 100) {
    state.familyHealth = Math.min(100, state.familyHealth + 3);
  }
  // Hard floor: health cannot recover while food is still depleted
  if (state.familyFood < 20 && state.familyHealth === 0) {
    state.familyHealth = 0;
  }

  // ── MORALE ────────────────────────────────────────────────────────────
  // Unemployment always degrades morale — this overrides any market uplift.
  // Market mood only affects morale when the player IS employed.
  // Debt is an always-on drag regardless of employment.
  if (!state.employed) {
    // Unemployed: morale always falls, no positive path
    state.familyMorale = Math.max(0, state.familyMorale - 8);
  } else {
    // Employed: market mood can shift morale, but only mildly
    if (indexChange > 0.02) {
      state.familyMorale = Math.min(100, state.familyMorale + 4);
    } else if (indexChange < -0.05) {
      state.familyMorale = Math.max(0, state.familyMorale - 5);
    }
  }
  // Debt is a morale drag regardless of employment status
  if (state.debt > 500) {
    state.familyMorale = Math.max(0, state.familyMorale - 3);
  }
  // Morale cannot recover while unemployed AND food is depleted
  if (!state.employed && state.familyFood < 20) {
    state.familyMorale = 0;
  }
}

function familyStatusText() {
  const avg = (state.familyHealth + state.familyFood + state.familyMorale) / 3;
  if (avg >= 75) return t("family_managing");
  if (avg >= 50) return t("family_strain");
  if (avg >= 25) return t("family_struggling");
  return t("family_crisis");
}

function meterClass(value) {
  if (value >= 60) return "high";
  if (value >= 30) return "medium";
  return "low";
}


// ─────────────────────────────────────────────────────────────────────────
// NPC NEIGHBOUR
// ─────────────────────────────────────────────────────────────────────────

function getNeighbourData() {
  return NPC_NEIGHBOURS[state.neighbourId] || NPC_NEIGHBOURS.worker;
}

function updateNeighbour() {
  const neighbour = getNeighbourData();
  const event = neighbour.events.find(e => e.turn === state.turn);
  if (event) {
    state.lastNeighbourEvent = event;
  }
}


// ─────────────────────────────────────────────────────────────────────────
// UI RENDERING
// ─────────────────────────────────────────────────────────────────────────

function renderDate() {
  document.getElementById("date-display").textContent = currentDate().label;
}

function renderLedger() {
  document.getElementById("cash-display").textContent      = `$${formatDollars(state.cash)}`;
  document.getElementById("portfolio-display").textContent = `$${formatDollars(calcPortfolioValue())}`;

  const nw   = calcNetWorth();
  const nwEl = document.getElementById("net-worth-value");
  nwEl.textContent = (nw < 0 ? "−$" : "$") + formatDollars(nw);
  nwEl.style.color = nw < 0 ? "var(--red)" : "var(--accent)";

  document.getElementById("index-value-display").textContent = state.indexValue.toFixed(2);
  const idxPct = ((state.indexValue - state.prevIndexValue) / state.prevIndexValue) * 100;
  const idxEl  = document.getElementById("index-change-display");
  idxEl.textContent = `${idxPct >= 0 ? "+" : ""}${idxPct.toFixed(2)}%`;
  idxEl.style.color = idxPct > 0.01 ? "var(--green)" : idxPct < -0.01 ? "var(--red)" : "var(--faded)";
}

function renderMarginPanel() {
  const interest = state.debt * MARGIN_CONFIG.monthlyInterestRate;
  const ratio    = calcMarginRatio();

  document.getElementById("debt-value").textContent            = `$${formatDollars(state.debt)}`;
  document.getElementById("interest-rate-display").textContent = `${(MARGIN_CONFIG.monthlyInterestRate * 100).toFixed(0)}%/mo`;
  document.getElementById("interest-due-display").textContent  = `$${formatDollars(interest)}`;

  const ratioEl = document.getElementById("margin-ratio-display");
  if (ratio === null) {
    ratioEl.textContent = "—";
    ratioEl.style.color = "var(--faded)";
  } else {
    ratioEl.textContent = `${(ratio * 100).toFixed(0)}%`;
    ratioEl.style.color = ratio < MARGIN_CONFIG.marginCallThreshold ? "var(--red)"
                        : ratio < MARGIN_CONFIG.marginWarningThreshold ? "var(--warn)"
                        : "var(--green)";
  }

  const portfolioVal = calcPortfolioValue();
  const atRisk = ratio !== null && portfolioVal > 0 && ratio < MARGIN_CONFIG.marginWarningThreshold;
  const warnEl = document.getElementById("margin-warning");
  warnEl.classList.toggle("show", atRisk);
  if (atRisk) {
    warnEl.textContent = ratio < MARGIN_CONFIG.marginCallThreshold
      ? "⚠ MARGIN CALL IMMINENT!"
      : "⚠ Margin Call Risk — reduce debt!";
  }
}

function renderHouseholdPanel() {
  const jobEl = document.getElementById("job-status-value");
  jobEl.textContent = state.employed ? t("employed") : t("unemployed");
  jobEl.className   = "ledger-value " + (state.employed ? "employed" : "unemployed");

  document.getElementById("income-display").textContent =
    state.employed ? `$${formatDollars(state.monthlyWage)}` : "$0.00";
  document.getElementById("food-display").textContent = `$${formatDollars(state.monthlyFoodCost)}`;
  document.getElementById("rent-display").textContent = `$${formatDollars(state.monthlyRent)}`;

  const wages   = state.employed ? state.monthlyWage : 0;
  const netFlow = wages - state.monthlyFoodCost - state.monthlyRent;
  const flowEl  = document.getElementById("flow-display");
  flowEl.textContent = (netFlow >= 0 ? "+" : "−") + `$${formatDollars(Math.abs(netFlow))}`;
  flowEl.className   = "ledger-value " + (netFlow >= 0 ? "flow-positive" : "flow-negative");
}

function renderStockTable() {
  const tbody = document.getElementById("stock-rows");
  tbody.innerHTML = "";
  STOCKS.forEach(stock => {
    const cur     = state.prices[stock.id];
    const prev    = state.prevPrices[stock.id];
    const held    = state.holdings[stock.id];
    const arrow   = cur > prev ? "▲" : cur < prev ? "▼" : "—";
    const pCls    = cur > prev ? "price-up" : cur < prev ? "price-down" : "price-flat";
    const pct     = ((cur - prev) / prev) * 100;
    const pctStr  = `${pct >= 0 ? "+" : ""}${pct.toFixed(2)}%`;
    const pctCls  = pct > 0.01 ? "price-up" : pct < -0.01 ? "price-down" : "price-flat";
    const sector  = t("sector_" + stock.id) || stock.sector;
    const tip     = t("tip_" + stock.id) || stock.tip;
    const row     = document.createElement("tr");
    row.innerHTML = `
      <td style="font-size:11px;font-weight:700">${stock.name}</td>
      <td style="font-size:9px;color:var(--faded);font-style:italic;white-space:nowrap">${sector}</td>
      <td class="stock-tip">${tip}</td>
      <td class="${pCls}" style="white-space:nowrap">${arrow} $${formatDollars(cur)}</td>
      <td class="${pctCls}" style="font-size:10px;white-space:nowrap">${pctStr}</td>
      <td style="text-align:center;font-size:11px">${held}</td>
      <td>
        <div class="trade-row">
          <input class="qty-input" type="number" min="1" value="1" id="qty-${stock.id}" aria-label="Qty for ${stock.name}"/>
          <button class="btn btn-buy"  onclick="handleBuy('${stock.id}')">${t("btn_buy")}</button>
          <button class="btn btn-sell" onclick="handleSell('${stock.id}')" ${held === 0 ? "disabled" : ""}>${t("btn_sell")}</button>
        </div>
      </td>`;
    tbody.appendChild(row);
  });
}

function renderEventLog() {
  document.getElementById("event-log").innerHTML =
    state.log.map(e => `<div class="log-entry ${e.cls}">${e.text}</div>`).join("");
}

function renderCharacterTag() {
  document.getElementById("tag-name").textContent = state.characterName;
  const occKey = "occ_" + state.characterId;
  const provKey = "prov_" + state.characterId;
  const occ = TR[occKey] ? t(occKey) : selectedCharacter ? selectedCharacter.occupation : "";
  const prov = TR[provKey] ? t(provKey) : selectedCharacter ? selectedCharacter.province : "";
  document.getElementById("tag-role").textContent = `${occ} · ${prov}`;
}

function renderFamilyMeter() {
  const setMeter = (id, value) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.width = value + "%";
    el.className = `family-meter-fill ${meterClass(value)}`;
  };
  setMeter("meter-health", state.familyHealth);
  setMeter("meter-food",   state.familyFood);
  setMeter("meter-morale", state.familyMorale);
  const txt = document.getElementById("family-status-text");
  if (txt) txt.textContent = familyStatusText();
}

function renderNeighbour() {
  const neighbour = getNeighbourData();
  const nameEl    = document.getElementById("neighbour-name");
  const statusEl  = document.getElementById("neighbour-status");
  const eventEl   = document.getElementById("neighbour-event");
  if (!nameEl) return;
  nameEl.textContent   = neighbour.name;

  const npcId = state.neighbourId;
  const occKey = "npc_" + npcId + "_occ";
  statusEl.textContent = TR[occKey] ? t(occKey) : neighbour.occupation;

  if (state.lastNeighbourEvent) {
    const evtTurn = state.lastNeighbourEvent.turn;
    const evtKey  = "npc_" + npcId + "_" + evtTurn;
    const evtText = TR[evtKey] ? t(evtKey) : state.lastNeighbourEvent.text;
    eventEl.textContent = evtText;
    eventEl.className   = `neighbour-event ${state.lastNeighbourEvent.cls}`;
  } else {
    const storyKey = "npc_" + npcId + "_story";
    eventEl.textContent = TR[storyKey] ? t(storyKey) : neighbour.story;
    eventEl.className   = "neighbour-event";
  }
}

function renderAll() {
  renderDate();
  renderLedger();
  renderMarginPanel();
  renderHouseholdPanel();
  renderFamilyMeter();
  renderNeighbour();
  renderStockTable();
  renderEventLog();
  renderProgressBar();
}

function showEndScreen(title, message) {
  // For early endings (bankrupt/destitute before Dec 1939), go straight
  // to the historical reflection screen — no overlay race condition.
  if (state.turn <= GAME_END_TURN) {
    startHistoricalReflections(title, message);
    return;
  }

  // Survived to end — show overlay with download button
  document.getElementById("overlay-title").textContent = title;
  document.getElementById("overlay-msg").textContent   = message;
  document.getElementById("overlay").classList.add("show");
  document.getElementById("next-turn-btn").disabled    = true;
  const row = document.getElementById("journal-download-row");
  if (row) row.style.display = "block";
}


// ─────────────────────────────────────────────────────────────────────────
// SCREEN NAVIGATION
// ─────────────────────────────────────────────────────────────────────────

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(el => el.classList.remove("active"));
  document.getElementById(id).classList.add("active");

  // Play song_1 on all pre-game screens (only fires if audio has been unlocked)
  if (id === "screen-intro" || id === "screen-character" || id === "screen-rules") {
    AUDIO.inGameplay = false;
    if (AUDIO.audioUnlocked) playTrack(AUDIO.char);
  }
}

function selectCharacter(id) {
  selectedCharacter = CHARACTERS.find(c => c.id === id);
  document.querySelectorAll(".char-card").forEach(card => {
    card.classList.toggle("selected", card.dataset.charId === id);
  });
  document.getElementById("btn-to-rules").disabled = false;
}

function proceedToRules() {
  if (!selectedCharacter) return;
  const c = selectedCharacter;

  document.getElementById("rules-char-name").textContent     = c.name;
  document.getElementById("rules-char-role").textContent     = `${c.occupation} · ${c.province}`;
  document.getElementById("rules-char-cash").textContent     = `$${c.startingCash.toFixed(2)}`;
  document.getElementById("rules-char-wage").textContent     = `$${c.startingWage.toFixed(2)}/mo`;
  document.getElementById("rules-char-expenses").textContent = `$${(c.startingFood + c.startingRent).toFixed(2)}/mo`;
  document.getElementById("rules-char-note").textContent     = c.description;

  showScreen("screen-rules");
}

function startGame() {
  if (!selectedCharacter) return;

  resetState(selectedCharacter);
  state.studentName = studentName;
  renderCharacterTag();

  const c = selectedCharacter;
  const occKey = "occ_" + c.id;
  const provKey = "prov_" + c.id;
  const occ = TR[occKey] ? t(occKey) : c.occupation;
  const prov = TR[provKey] ? t(provKey) : c.province;

  if (window.LANG === "fr") {
    addLogEntry(`Janvier 1928. Vous êtes ${state.characterName}, ${occ} de ${prov}.`);
    addLogEntry(
      `Vous avez ${formatDollars(c.startingCash)} $ à investir. ` +
      `Salaire mensuel : ${formatDollars(c.startingWage)} $. ` +
      `Dépenses : ${formatDollars(c.startingFood + c.startingRent)} $/mois. ` +
      `Le krach approche — mais pas encore.`
    );
  } else {
    addLogEntry(`January 1928. You are ${state.characterName}, a ${occ} from ${prov}.`);
    addLogEntry(
      `You have $${formatDollars(c.startingCash)} to invest. ` +
      `Monthly wages: $${formatDollars(c.startingWage)}. ` +
      `Expenses: $${formatDollars(c.startingFood + c.startingRent)}/month. ` +
      `The Crash is coming — but not yet.`
    );
  }
  if (c.isPrairie) {
    addLogEntry(t("log_prairie_warning"), "warn");
  }

  showScreen("screen-game");
  startGameplayMusic();
  renderAll();
  renderNeighbour();
  renderPhotoPanel();
  // Fire turn-0 photo (Bay Street 1928) on game start
  checkHistoricalPhoto();
}

function restartGame() {
  document.getElementById("overlay").classList.remove("show");
  document.getElementById("photo-overlay").classList.remove("show");
  document.getElementById("next-turn-btn").disabled = false;
  document.getElementById("life-event-banner").className = "";
  document.getElementById("edu-toast").classList.remove("show");
  const row = document.getElementById("journal-download-row");
  if (row) row.style.display = "none";
  crashShown = false;
  photoOverlayActive = false;
  shownFamilyAlerts.clear();
  histQueue   = [];
  histIndex   = 0;
  histOutcome = "";
  startGame();
}

function newCharacter() {
  document.getElementById("overlay").classList.remove("show");
  document.getElementById("photo-overlay").classList.remove("show");
  document.getElementById("next-turn-btn").disabled = false;
  document.getElementById("life-event-banner").className = "";
  document.getElementById("edu-toast").classList.remove("show");
  const row = document.getElementById("journal-download-row");
  if (row) row.style.display = "none";
  crashShown = false;
  photoOverlayActive = false;
  shownFamilyAlerts.clear();
  histQueue   = [];
  histIndex   = 0;
  histOutcome = "";
  selectedCharacter = null;
  document.querySelectorAll(".char-card").forEach(card => card.classList.remove("selected"));
  document.getElementById("btn-to-rules").disabled = true;
  showScreen("screen-character");
}


// ─────────────────────────────────────────────────────────────────────────
// ENTRY POINTS  (called by HTML onclick handlers)
// ─────────────────────────────────────────────────────────────────────────

function handleBuy(stockId) {
  const qty    = parseInt(document.getElementById(`qty-${stockId}`).value, 10);
  const result = buyStock(stockId, qty);
  addLogEntry(result.msg, result.ok ? "good" : "bad");
  renderAll();
}

function handleSell(stockId) {
  const qty    = parseInt(document.getElementById(`qty-${stockId}`).value, 10);
  const result = sellStock(stockId, qty);
  addLogEntry(result.msg, result.ok ? "good" : "bad");
  renderAll();
}

function handleBorrow() {
  const result = borrowMoney(parseFloat(document.getElementById("borrow-amount").value));
  addLogEntry(result.msg, result.ok ? "warn" : "bad");
  renderAll();
}

function handleRepay() {
  const result = repayDebt(parseFloat(document.getElementById("repay-amount").value));
  addLogEntry(result.msg, result.ok ? "good" : "bad");
  renderAll();
}

/*
 * nextTurn() — the main game loop (one calendar month per click).
 *
 * ORDER OF OPERATIONS:
 *   1. Advance prices              (market moves)
 *   2. Charge monthly interest     (debt compounds)
 *   3. Margin call check           (broker may liquidate)
 *   4. Fire one life event         (BEFORE wages — layoffs affect same-turn pay)
 *   5. Apply household economics   (wages in, food/rent out)
 *   6. Forced survival sale        (if cash is negative, sell stocks to survive)
 *   7. Fire one educational note
 *   8. Historical headline
 *   9. Month-end summary log
 *  10. Capture date label          (BEFORE turn increment)
 *  11. Increment turn counter
 *  12. End condition checks
 *  13. Re-render
 */
function nextTurn() {
  // Block if a modal or photo overlay is waiting for a response
  if (state.modalPending) return;
  if (photoOverlayActive) return;

  const indexChange = advancePrices();

  const interest = applyMonthlyInterest();
  if (interest > 0) {
    const intMsg = window.LANG === "fr"
      ? `Intérêts facturés : ${formatDollars(interest)} $ sur une dette de ${formatDollars(state.debt - interest)} $. Nouvelle dette : ${formatDollars(state.debt)} $.`
      : `Interest charged: $${formatDollars(interest)} on debt of $${formatDollars(state.debt - interest)}. New debt: $${formatDollars(state.debt)}.`;
    addLogEntry(intMsg, "bad");
  }

  checkMarginCall();
  fireLifeEvent(indexChange);
  applyHouseholdEconomics();
  forceSellForSurvival();
  fireEduNotes(indexChange);
  updateFamilyMeters(indexChange);
  updateNeighbour();

  if (HEADLINES[state.turn]) {
    const hlKey = "headline_" + state.turn;
    const hlText = TR[hlKey] ? t(hlKey) : HEADLINES[state.turn];
    addLogEntry(hlText, (state.turn >= 21 && state.turn <= 59) ? "bad" : "");
  }

  addLogEntry(
    `${window.LANG === "fr" ? "Mois terminé" : "Month closed"} — ${window.LANG === "fr" ? "Valeur nette" : "Net worth"}: $${formatDollars(calcNetWorth())} | ${window.LANG === "fr" ? "Indice" : "Index"}: ${state.indexValue.toFixed(1)} (${indexChange >= 0 ? "+" : ""}${(indexChange * 100).toFixed(1)}%)`
  );

  const dateLabel  = currentDate().label;
  const { monthIndex: closingMonth, year: closingYear } = currentDate();
  state.turn++;

  // End conditions
  if (calcNetWorth() < 0 && state.debt > 0) {
    renderAll();
    stopAllAudio();
    const msg = window.LANG === "fr"
      ? `En ${dateLabel}, vous devez ${formatDollars(state.debt)} $ sans rien pour le couvrir. Des milliers de Canadiens ont partagé votre sort. La Dépression n'a épargné personne qui avait emprunté trop librement.`
      : `By ${dateLabel} you owe $${formatDollars(state.debt)} with nothing left to cover it. Thousands of Canadians shared your fate. The Depression spared no one who borrowed too freely.`;
    showEndScreen(t("title_bankrupt"), msg);
    return;
  }

  if (state.cash <= 0 && calcPortfolioValue() < 1 && state.debt === 0) {
    renderAll();
    stopAllAudio();
    const msg = window.LANG === "fr"
      ? `Vous avez tout perdu en ${dateLabel} — mais ne deviez rien. La Dépression vous a réduit en poussière, comme tant d'autres à travers le Canada.`
      : `You lost everything by ${dateLabel} — but owed nothing. The Depression ground you to dust, as it did to so many across Canada.`;
    showEndScreen(t("title_destitute"), msg);
    return;
  }

  if (state.turn > GAME_END_TURN) {
    renderAll();
    stopAllAudio();
    const nw  = calcNetWorth();
    const nwStr = formatDollars(nw);
    let msg;
    if (window.LANG === "fr") {
      msg = nw >= 2000
        ? `Vous avez survécu à toute la décennie de la Dépression avec ${nwStr} $ — une vraie fortune. Vous avez acheté bas et gardé votre sang-froid quand les autres paniquaient.`
        : nw >= 1000
          ? `Vous avez enduré 1928–1939 avec ${nwStr} $ à votre nom. Vous avez survécu aux sales années trente — un exploit que des millions de Canadiens ne pouvaient pas revendiquer.`
          : `Vous avez atteint 1940 avec seulement ${nwStr} $. La Dépression a laissé sa marque, comme elle l'a fait sur tout le Canada.`;
    } else {
      msg = nw >= 2000
        ? `You survived the entire Depression decade with $${nwStr} — a true fortune. You bought low and kept your nerve when others panicked.`
        : nw >= 1000
          ? `You endured 1928–1939 with $${nwStr} to your name. You survived the Dirty Thirties — a feat millions of Canadians could not claim.`
          : `You reached 1940 with only $${nwStr}. The Depression left its mark, as it did on all of Canada.`;
    }
    showEndScreen(t("title_survived"), msg);
    return;
  }

  renderAll();

  // Check for modals AFTER rendering — priority order:
  // Annual report (December) fires FIRST — it triggers reflections and must never be skipped.
  // Then: historical photo → crash overlay → decision prompts → family alerts → hot tips
  if (closingMonth === 11) {
    state._reportYear = closingYear;
    buildReportCard(closingYear);
    return;
  }
  if (checkHistoricalPhoto()) return;
  if (state.turn === 22 && !crashShown) { showCrashOverlay(); return; }
  if (checkDecisionPrompts()) return;
  if (checkFamilyAlerts())    return;
  checkHotTips();
}


// ─────────────────────────────────────────────────────────────────────────
// PROGRESS BAR + ERA SYSTEM
// ─────────────────────────────────────────────────────────────────────────

/*
 * getEra() — return an era key and label for the current turn.
 * Used to colour the progress bar and Next Turn button.
 */
function getEra() {
  if (state.turn <= 20)  return { key: "era-boom",       label: t("era_boom") };
  if (state.turn <= 23)  return { key: "era-crash",      label: t("era_crash") };
  if (state.turn <= 83)  return { key: "era-depression", label: t("era_depression") };
  if (state.turn <= 131) return { key: "era-recovery",   label: t("era_recovery") };
  return                        { key: "era-war",         label: t("era_war") };
}

function renderProgressBar() {
  const pct  = Math.min(100, (state.turn / (GAME_END_TURN + 1)) * 100);
  const era  = getEra();
  const fill = document.getElementById("timeline-fill");
  const lbl  = document.getElementById("timeline-label");
  const btn  = document.getElementById("next-turn-btn");
  if (!fill) return;
  fill.style.width = pct + "%";

  // Swap era class on fill and button
  const eras = ["era-boom","era-crash","era-depression","era-recovery","era-war"];
  fill.classList.remove(...eras);
  fill.classList.add(era.key);
  btn.classList.remove(...eras);
  btn.classList.add(era.key);

  if (lbl) lbl.textContent = era.label;
}


// ─────────────────────────────────────────────────────────────────────────
// BLACK TUESDAY CRASH OVERLAY
// ─────────────────────────────────────────────────────────────────────────

let crashShown = false;

function showCrashOverlay() {
  document.getElementById("crash-overlay").classList.add("show");
  document.getElementById("next-turn-btn").disabled = true;
}

function dismissCrashOverlay() {
  document.getElementById("crash-overlay").classList.remove("show");
  document.getElementById("next-turn-btn").disabled = false;
  crashShown = true;
}


// ─────────────────────────────────────────────────────────────────────────
// CRITICAL FAMILY ALERTS
// ─────────────────────────────────────────────────────────────────────────

/*
 * Thresholds that trigger a one-time interruption modal.
 * Each fires once per game when a meter first crosses the threshold.
 */
const FAMILY_ALERT_THRESHOLDS = [
  {
    id:    "food_critical",
    check: (gs) => gs.familyFood <= 20 && gs.familyFood > 0,
    title: "Your Family Is Going Hungry",
    body:  "Your children haven't eaten properly in weeks. You can see it in their faces. This is what happens when the money runs out — not abstract numbers on a ledger, but real hunger at your own table. Thousands of Canadian families are living this right now.",
    cls:   "alert"
  },
  {
    id:    "morale_critical",
    check: (gs) => gs.familyMorale <= 15 && gs.familyMorale > 0,
    title: "Your Family Is Breaking Down",
    body:  "The strain of poverty and unemployment is tearing at your household. Arguments, silence, despair. By 1933, Canadian social workers reported a wave of family breakdowns they had never seen before — not from personal failure, but from the relentless pressure of having nothing.",
    cls:   "alert"
  },
  {
    id:    "health_critical",
    check: (gs) => gs.familyHealth <= 20 && gs.familyHealth > 0,
    title: "Your Family's Health Is Failing",
    body:  "Poor nutrition has taken its toll. A doctor's visit costs money you don't have. In the 1930s, Canadian hospitals saw a rise in malnutrition-related illness among children of unemployed families. What happens to a family that cannot afford to get well?",
    cls:   "alert"
  }
];

const shownFamilyAlerts = new Set();

function checkFamilyAlerts() {
  const alertTrMap = {
    "food_critical":   "alert_food",
    "morale_critical": "alert_morale",
    "health_critical": "alert_health"
  };
  for (const alert of FAMILY_ALERT_THRESHOLDS) {
    if (shownFamilyAlerts.has(alert.id)) continue;
    if (!alert.check(state)) continue;
    shownFamilyAlerts.add(alert.id);
    const prefix = alertTrMap[alert.id];
    const alertTitle = prefix && TR[prefix + "_title"] ? t(prefix + "_title") : alert.title;
    const alertBody  = prefix && TR[prefix + "_body"] ? t(prefix + "_body") : alert.body;
    const body   = `<div class="modal-text">${alertBody}</div>`;
    const footer = `<button class="screen-btn" onclick="closeFamilyAlert()">${t("modal_alert_understand")}</button>`;
    document.getElementById("modal-card").classList.add("alert");
    showModal({ title: alertTitle, body, footer });
    state.modalPending = { id: alert.id };
    return true;
  }
  return false;
}

function closeFamilyAlert() {
  document.getElementById("modal-card").classList.remove("alert");
  state.modalPending = null;
  closeModal();
}


// ─────────────────────────────────────────────────────────────────────────
// SPACEBAR SHORTCUT
// ─────────────────────────────────────────────────────────────────────────

document.addEventListener("keydown", (e) => {
  if (e.code !== "Space") return;
  // Don't fire if user is typing in any text field or interacting with a control
  const tag = document.activeElement && document.activeElement.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || tag === "BUTTON") return;
  if (document.activeElement && document.activeElement.isContentEditable) return;
  e.preventDefault();
  const btn = document.getElementById("next-turn-btn");
  if (btn && !btn.disabled) nextTurn();
});


// ─────────────────────────────────────────────────────────────────────────
// STUDENT NAME + JOURNAL SYSTEM
// ─────────────────────────────────────────────────────────────────────────

// Global student name — survives resets so the student only types it once
let studentName = "";

/*
 * validateNameEntry() — enable Begin button only when name has content.
 */
function validateNameEntry() {
  const val = document.getElementById("student-name-input").value.trim();
  document.getElementById("btn-begin").disabled = val.length < 2;
}

/*
 * beginFromIntro() — save name and proceed to character selection.
 */
function beginFromIntro() {
  const val = document.getElementById("student-name-input").value.trim();
  if (val.length < 2) return;
  studentName = val;
  showScreen("screen-character");
}

/*
 * checkReflection() — fire the annual reflection question.
 * Fires at the END of each December (after the report card is dismissed).
 * Returns true if a reflection modal was opened.
 */
function checkReflection(year) {
  if (!year) return false;
  const q = REFLECTION_QUESTIONS.find(r => r.year === year);
  if (!q) return false;
  if (state.shownReflectionYears.has(year)) return false;
  state.shownReflectionYears.add(year);
  buildReflectionModal(q, year);
  return true;
}

function buildReflectionModal(q, year) {
  const nw       = calcNetWorth();
  const qKey     = "reflect_" + year + "_q";
  const cKey     = "reflect_" + year + "_c";
  const qText    = TR[qKey] ? t(qKey) : q.question;
  const cText    = TR[cKey] ? t(cKey) : q.context;
  const context  = `<div class="reflection-context">${cText}</div>`;
  const question = `<div class="reflection-question">${qText}</div>`;
  const counter  = `<div class="reflection-counter" id="reflect-counter">0 / 20 ${t("hist_min_chars")}</div>`;
  const textarea = `<textarea class="reflection-textarea" id="reflect-input"
    placeholder="${t("hist_write_here")}"
    oninput="onReflectInput()"
    rows="5"></textarea>${counter}`;

  const body   = context + question + textarea;
  const footer = `
    <span style="font-family:'Courier Prime',monospace;font-size:9px;color:var(--faded);font-style:italic">
      ${t("modal_reflect_note")}
    </span>
    <button class="screen-btn" id="reflect-submit-btn" onclick="submitReflection('${q.id}',${year})" disabled>
      ${t("modal_reflect_save")}
    </button>`;

  showModal({ title: tf("modal_reflect_title", { year }), body, footer });
  state.modalPending = { id: `reflect_${year}` };
}

/*
 * onReflectInput() — update character counter, enable submit at 20+ chars.
 */
function onReflectInput() {
  const val     = (document.getElementById("reflect-input").value || "").trim();
  const len     = val.length;
  const counter = document.getElementById("reflect-counter");
  const btn     = document.getElementById("reflect-submit-btn");
  if (!counter || !btn) return;
  const ready = len >= 20;
  const charWord = window.LANG === "fr" ? "caractère" : "character";
  counter.textContent  = `${len} ${charWord}${len === 1 ? "" : "s"}${ready ? ` ${t("hist_ready")}` : ` / 20 ${t("hist_min_chars")}`}`;
  counter.className    = `reflection-counter${ready ? " ready" : ""}`;
  btn.disabled         = !ready;
}

/*
 * submitReflection() — store the answer and close the modal.
 */
function submitReflection(qId, year) {
  const answer = (document.getElementById("reflect-input").value || "").trim();
  if (answer.length < 20) return;
  const q = REFLECTION_QUESTIONS.find(r => r.id === qId);
  state.journal.push({
    turn:     state.turn,
    year,
    question: q ? q.question : "",
    answer,
    netWorth: calcNetWorth(),
    employed: state.employed
  });
  state.modalPending = null;
  closeModal();
  // A photo may be queued for this same turn (blocked when report card fired first)
  checkHistoricalPhoto();
}


// ─────────────────────────────────────────────────────────────────────────
// PDF JOURNAL EXPORT
// ─────────────────────────────────────────────────────────────────────────

/*
 * downloadJournalPDF() — populate the hidden print container and trigger
 * the browser's print dialog. On Chromebooks, students choose "Save as PDF".
 */
function downloadJournalPDF() {
  const L = window.LANG;
  const nw         = calcNetWorth();
  const nwClass    = nw >= 0 ? "good" : "bad";
  const nwStr      = (nw < 0 ? "−$" : "$") + formatDollars(nw);
  const outcome    = nw < 0 ? t("pdf_outcome_bankrupt") : nw === 0 ? t("pdf_outcome_destitute") : t("pdf_outcome_survived");
  const avgFamily  = Math.round((state.familyHealth + state.familyFood + state.familyMorale) / 3);
  const familyCls  = avgFamily >= 60 ? "good" : avgFamily >= 30 ? "" : "bad";
  const dateLocale = L === "fr" ? "fr-CA" : "en-CA";
  const dateStr    = new Date().toLocaleDateString(dateLocale, { year:"numeric", month:"long", day:"numeric" });

  const occKey = "occ_" + state.characterId;
  const provKey = "prov_" + state.characterId;
  const charRole = `${TR[occKey] ? t(occKey) : (selectedCharacter ? selectedCharacter.occupation : "")} · ${TR[provKey] ? t(provKey) : (selectedCharacter ? selectedCharacter.province : "")}`;

  // Cover section
  const cover = `
    <div class="pj-cover">
      <div class="pj-cover-title">${t("intro_title")} — Canada 1928</div>
      <div class="pj-cover-sub">${t("pdf_title")} &amp; ${L === "fr" ? "Dossier économique" : "Economic Record"}</div>
      <div class="pj-cover-meta">
        <strong>${t("pdf_student")} :</strong> ${escHtml(studentName)}<br>
        <strong>${t("pdf_character")} :</strong> ${escHtml(state.characterName)} — ${escHtml(charRole)}<br>
        <strong>${t("pdf_outcome")} :</strong> ${outcome}<br>
        <strong>${t("pdf_date_generated")} :</strong> ${dateStr}
      </div>
    </div>`;

  // Summary stats
  const stats = `
    <div class="pj-section-title">${t("pdf_final_stats")}</div>
    <div class="pj-stats-grid">
      <div class="pj-stat">
        <div class="pj-stat-label">${t("pdf_final_nw")}</div>
        <div class="pj-stat-value ${nwClass}">${nwStr}</div>
      </div>
      <div class="pj-stat">
        <div class="pj-stat-label">${t("pdf_final_employed")}</div>
        <div class="pj-stat-value ${state.employed ? "good" : "bad"}">${state.employed ? t("pdf_yes") : t("pdf_no")}</div>
      </div>
      <div class="pj-stat">
        <div class="pj-stat-label">${t("pdf_final_family")}</div>
        <div class="pj-stat-value ${familyCls}">${avgFamily}%</div>
      </div>
      <div class="pj-stat">
        <div class="pj-stat-label">${t("pdf_final_debt")}</div>
        <div class="pj-stat-value ${state.debt > 0 ? "bad" : "good"}">${state.debt > 0 ? "$" + formatDollars(state.debt) : t("pdf_none")}</div>
      </div>
      <div class="pj-stat">
        <div class="pj-stat-label">${L === "fr" ? "Mois survécus" : "Turns Survived"}</div>
        <div class="pj-stat-value">${state.turn} / 144</div>
      </div>
      <div class="pj-stat">
        <div class="pj-stat-label">${t("modal_report_index")}</div>
        <div class="pj-stat-value">${state.indexValue.toFixed(1)}</div>
      </div>
    </div>`;

  // Decisions section
  let decisions = "";
  if (state.decisionLog.length > 0) {
    const rows = state.decisionLog.map(d =>
      `<div class="pj-decision"><strong>${d.year} :</strong> ${escHtml(d.label)} — ${escHtml(d.text)}</div>`
    ).join("");
    decisions = `<div class="pj-section-title">${t("pdf_decisions")}</div><div class="pj-decisions">${rows}</div>`;
  }

  // Reflection entries
  const endOfLabel = L === "fr" ? "Fin de" : "End of";
  const nwLabel    = L === "fr" ? "Valeur nette" : "Net Worth";
  const empLabel   = L === "fr" ? "Employé(e)" : "Employed";
  const unempLabel = L === "fr" ? "Sans emploi" : "Unemployed";
  const histNote   = t("pdf_answered_hist");

  let reflections = "";
  if (state.journal.length > 0) {
    const entries = state.journal.map(e => {
      // Try to get translated question
      const qKey = "reflect_" + e.year + "_q";
      const qText = TR[qKey] ? t(qKey) : e.question;
      return `
      <div class="pj-entry">
        <div class="pj-entry-header">
          <span class="pj-entry-date">${endOfLabel} ${e.year}${e.historical ? " ★" : ""}</span>
          <span class="pj-entry-stats">${nwLabel}: ${e.netWorth >= 0 ? "$" : "−$"}${formatDollars(e.netWorth)} · ${e.employed ? empLabel : unempLabel}</span>
        </div>
        <div class="pj-entry-q">${escHtml(qText)}</div>
        <div class="pj-entry-a">${escHtml(e.answer)}</div>
        ${e.historical ? `<div class="pj-entry-historical">★ ${histNote}</div>` : ""}
      </div>`;
    }).join("");
    const histNoteBlock = state.journal.some(e => e.historical)
      ? `<div class="pj-historical-note">★ ${L === "fr" ? "Les questions marquées d'une étoile ont été répondues d'un point de vue historique — le jeu de l'élève s'est terminé avant d'atteindre ces années." : "Questions marked with a star were answered from a historical perspective — the student's game ended before these years were reached."}</div>`
      : "";
    reflections = `<div class="pj-section-title">${t("pdf_reflections")} (${state.journal.length} / 12)</div>${histNoteBlock}${entries}`;
  } else {
    reflections = `<div class="pj-section-title">${t("pdf_reflections")}</div><p style="font-size:12px;color:#666;font-style:italic">${L === "fr" ? "Aucune réflexion n'a été enregistrée dans cette partie." : "No reflections were recorded this game."}</p>`;
  }

  // Footer
  const footer = `
    <div class="pj-footer">
      ${t("pdf_footer")}<br>
      ${L === "fr" ? "Généré le" : "Generated"} ${dateStr} · ${escHtml(studentName)}
    </div>`;

  const fullHTML = `<!DOCTYPE html>
<html lang="${L}">
<head>
<meta charset="UTF-8">
<title>${t("pdf_title")} — ${escHtml(studentName)}</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:Georgia,serif;color:#000;padding:28px 36px;max-width:760px;margin:0 auto;line-height:1.5}
@media print{@page{margin:15mm;size:A4}body{padding:0;max-width:100%}}
.pj-cover{text-align:center;padding:36px 0 28px;border-bottom:2px solid #000;margin-bottom:32px}
.pj-cover-title{font-size:26px;font-weight:bold;margin-bottom:8px}
.pj-cover-sub{font-size:13px;color:#444;margin-bottom:20px}
.pj-cover-meta{font-size:12px;line-height:2}
.pj-cover-meta strong{color:#000}
.pj-stats-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:24px 0}
.pj-stat{border:1px solid #ccc;padding:10px 12px;text-align:center}
.pj-stat-label{font-size:9px;text-transform:uppercase;letter-spacing:1px;color:#666;display:block;margin-bottom:4px}
.pj-stat-value{font-size:20px;font-weight:bold;display:block}
.pj-stat-value.good{color:#1a4f1a}
.pj-stat-value.bad{color:#8b1a1a}
.pj-section-title{font-size:11px;font-weight:bold;text-transform:uppercase;letter-spacing:2px;border-bottom:2px solid #000;padding-bottom:4px;margin:32px 0 16px;page-break-after:avoid}
.pj-entry{margin-bottom:24px;border-bottom:1px solid #eee;padding-bottom:20px;page-break-inside:avoid}
.pj-entry:last-child{border-bottom:none}
.pj-entry-header{display:flex;justify-content:space-between;align-items:baseline;border-bottom:1px solid #ddd;padding-bottom:5px;margin-bottom:10px}
.pj-entry-date{font-size:11px;font-weight:bold}
.pj-entry-stats{font-size:10px;color:#555}
.pj-entry-q{font-size:11px;font-style:italic;color:#333;margin-bottom:9px;line-height:1.6}
.pj-entry-a{font-size:12px;line-height:1.85;padding-left:14px;border-left:3px solid #999}
.pj-entry-historical{font-size:9px;color:#888;font-style:italic;margin-top:6px}
.pj-decisions{margin-bottom:24px}
.pj-decision{font-size:11px;line-height:1.65;margin-bottom:10px;padding-left:14px;border-left:2px solid #bbb;page-break-inside:avoid}
.pj-historical-note{font-size:10px;color:#8b4a00;font-style:italic;padding:9px 13px;border:1px solid #8b4a00;margin-bottom:18px}
.pj-footer{margin-top:40px;border-top:1px solid #000;padding-top:12px;font-size:9px;color:#555;text-align:center}
.print-btn{display:block;margin:0 auto 32px;padding:12px 32px;background:#1a4f1a;color:#fff;border:none;font-size:14px;font-family:Georgia,serif;cursor:pointer;letter-spacing:1px}
.print-btn:hover{background:#2a6f2a}
@media print{.print-btn{display:none}}
</style>
</head>
<body>
<button class="print-btn" onclick="window.print()">${t("pdf_print_btn")}</button>
${cover}${stats}${decisions}${reflections}${footer}
</body>
</html>`;

  const safeName   = (studentName || "Student").replace(/[^a-z0-9]/gi, "-");
  const prefix     = L === "fr" ? "Journal-Reflexion" : "Reflection-Journal";
  const blob       = new Blob([fullHTML], { type: "text/html;charset=utf-8" });
  const blobURL    = URL.createObjectURL(blob);
  const link       = document.createElement("a");
  link.href        = blobURL;
  link.download    = `${prefix}-${safeName}.html`;
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  setTimeout(() => { document.body.removeChild(link); URL.revokeObjectURL(blobURL); }, 1000);
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}


// ─────────────────────────────────────────────────────────────────────────
// HISTORICAL REFLECTION SYSTEM (Option A — early game-over pivot)
//
// When a student goes bankrupt or destitute before December 1939, they are
// redirected here to answer the remaining reflection questions from a
// historical perspective before downloading their PDF.
// ─────────────────────────────────────────────────────────────────────────

let histQueue   = [];   // remaining REFLECTION_QUESTIONS not yet answered
let histIndex   = 0;    // current position in histQueue
let histOutcome = "";   // "Bankrupt!" or "Destitute!" — shown in framing text

/*
 * startHistoricalReflections(outcome) — build the queue of unanswered
 * questions and navigate to the historical reflection screen.
 */
function startHistoricalReflections(outcome, outcomeMessage) {
  histOutcome = outcome;

  // Close the win overlay if it's open (winner path)
  document.getElementById("overlay").classList.remove("show");

  // Queue every question whose year hasn't been answered in-game yet
  histQueue = REFLECTION_QUESTIONS.filter(
    q => !state.shownReflectionYears.has(q.year)
  );
  histIndex = 0;

  if (histQueue.length === 0) {
    showHistComplete();
    return;
  }

  showScreen("screen-historical");

  // Show the outcome message only for loss endings (not for winners)
  const outcomeEl = document.getElementById("hist-outcome-msg");
  if (outcomeEl && outcomeMessage) {
    outcomeEl.textContent = outcomeMessage;
    outcomeEl.style.display = "block";
  } else if (outcomeEl) {
    outcomeEl.style.display = "none";
  }

  renderHistQuestion();
}

/*
 * renderHistQuestion() — populate the historical reflection screen with
 * the current question from histQueue.
 */
function renderHistQuestion() {
  const q        = histQueue[histIndex];
  const total    = histQueue.length;
  const current  = histIndex + 1;
  const pct      = Math.round((histIndex / total) * 100);

  // Work out the game-end year for framing context
  const endYear = GAME_START_YEAR + Math.floor(state.turn / 12);
  const outcome = histOutcome.replace("!", "");

  // Framing message — use positive "survived" copy for winners
  const survived    = histOutcome === "Survived!";
  const framingKey  = survived ? "hist_framing_survived" : "hist_framing";
  const eyebrowKey  = survived ? "hist_eyebrow_survived" : "hist_eyebrow";
  const framingText = tf(framingKey, { endYear, outcome, name: state.characterName, year: q.year });

  const eyebrowText = tf(eyebrowKey, { outcome, endYear });
  const subText = tf("hist_sub", { current, total });
  const progressLabel = window.LANG === "fr" ? `Question ${current} sur ${total}` : `Question ${current} of ${total}`;

  // Translated question and context
  const qKey = "reflect_" + q.year + "_q";
  const cKey = "reflect_" + q.year + "_c";
  const qText = TR[qKey] ? t(qKey) : q.question;
  const cText = TR[cKey] ? t(cKey) : q.context;

  document.getElementById("hist-eyebrow").textContent       = eyebrowText;
  document.getElementById("hist-sub").textContent           = subText;
  document.getElementById("hist-progress-label").textContent = progressLabel;
  document.getElementById("hist-progress-fill").style.width  = pct + "%";
  document.getElementById("hist-year-badge").textContent    = q.year;
  document.getElementById("hist-question").textContent      = qText;
  document.getElementById("hist-context").textContent       = cText;
  document.getElementById("hist-framing").textContent       = framingText;
  document.getElementById("hist-framing").classList.add("show");

  // Reset textarea and counter
  const ta = document.getElementById("hist-textarea");
  if (ta) { ta.value = ""; ta.placeholder = t("hist_write_here"); }
  const counter = document.getElementById("hist-counter");
  if (counter) { counter.textContent = `0 / 20 ${t("hist_min_chars")}`; counter.className = "reflection-counter"; }
  const btn = document.getElementById("hist-next-btn");
  if (btn) {
    btn.disabled    = true;
    btn.textContent = t("hist_save_continue");
  }
}

/*
 * onHistReflectInput() — live counter for the historical textarea.
 */
function onHistReflectInput() {
  const val     = (document.getElementById("hist-textarea").value || "").trim();
  const len     = val.length;
  const counter = document.getElementById("hist-counter");
  const btn     = document.getElementById("hist-next-btn");
  if (!counter || !btn) return;
  const ready = len >= 20;
  const charWord = window.LANG === "fr" ? "caractère" : "character";
  counter.textContent = `${len} ${charWord}${len === 1 ? "" : "s"}${ready ? ` ${t("hist_ready")}` : ` / 20 ${t("hist_min_chars")}`}`;
  counter.className   = `reflection-counter${ready ? " ready" : ""}`;
  btn.disabled        = !ready;
}

/*
 * submitHistReflection() — save the answer, advance to next question
 * or trigger the PDF download if this was the last one.
 */
function submitHistReflection() {
  const answer = (document.getElementById("hist-textarea").value || "").trim();
  if (answer.length < 20) return;

  const q = histQueue[histIndex];
  // Mark as shown so it doesn't re-appear
  state.shownReflectionYears.add(q.year);
  // Store in journal with a flag indicating it was answered historically
  state.journal.push({
    turn:        state.turn,
    year:        q.year,
    question:    q.question,
    answer,
    netWorth:    calcNetWorth(),
    employed:    state.employed,
    historical:  true   // flag for PDF rendering
  });

  histIndex++;

  if (histIndex >= histQueue.length) {
    showHistComplete();
  } else {
    renderHistQuestion();
    // Scroll to top of card
    const card = document.querySelector(".hist-card");
    if (card) card.scrollTop = 0;
  }
}

/*
 * showHistComplete() — all historical questions answered.
 * Show a completion message and the download button.
 */
function showHistComplete() {
  showScreen("screen-complete");
  const count = state.journal.length;
  const years = new Set(state.journal.map(e => e.year)).size;
  const L = window.LANG;
  document.getElementById("complete-count").textContent = L === "fr"
    ? `${count} réflexion${count === 1 ? "" : "s"} sauvegardée${count === 1 ? "" : "s"} sur ${years} années.`
    : `${count} reflection${count === 1 ? "" : "s"} saved across ${years} years.`;
}


// ─────────────────────────────────────────────────────────────────────────
// HISTORICAL PHOTO DATABASE
//
// Photos trigger on specific turns. When a photo fires:
//   1. A full-screen overlay shows the image + caption + attribution
//   2. The photo is added to the right-hand thumbnail gallery
//   3. Clicking a thumbnail re-opens the overlay for that photo
// ─────────────────────────────────────────────────────────────────────────

let photoOverlayActive = false;

/*
 * checkHistoricalPhoto() — check if a photo should fire this turn.
 * Called from nextTurn() after rendering but before modals.
 * Returns true if a photo overlay was shown (blocks further modals).
 */
function checkHistoricalPhoto() {
  if (typeof HISTORICAL_PHOTOS === "undefined") return false;

  const photo = HISTORICAL_PHOTOS.find(p => p.turn === state.turn);
  if (!photo || state.shownPhotoTurns.has(photo.turn)) return false;

  state.shownPhotoTurns.add(photo.turn);
  state.collectedPhotos.push(photo);

  showPhotoOverlay(photo);
  renderPhotoPanel();
  return true;
}

/*
 * showPhotoOverlay(photo) — display the full-screen photo overlay.
 */
function showPhotoOverlay(photo) {
  photoOverlayActive = true;
  const titleKey = "photo_" + photo.turn + "_title";
  const captionKey = "photo_" + photo.turn + "_caption";
  const title = TR[titleKey] ? t(titleKey) : photo.title;
  const caption = TR[captionKey] ? t(captionKey) : photo.caption;
  document.getElementById("photo-overlay-img").src       = photo.imageUrl;
  document.getElementById("photo-overlay-img").alt       = title;
  document.getElementById("photo-overlay-title").textContent = title;
  document.getElementById("photo-overlay-year").textContent  = photo.year;
  document.getElementById("photo-overlay-text").textContent  = caption;
  document.getElementById("photo-overlay-credit").textContent = photo.attribution;
  document.getElementById("photo-overlay").classList.add("show");
  document.getElementById("next-turn-btn").disabled = true;
}

/*
 * dismissPhotoOverlay() — close the photo overlay and resume the game.
 */
function dismissPhotoOverlay() {
  document.getElementById("photo-overlay").classList.remove("show");
  photoOverlayActive = false;
  // Only re-enable next turn button if no other modal is pending
  if (!state.modalPending) {
    document.getElementById("next-turn-btn").disabled = false;
  }
}

/*
 * renderPhotoPanel() — redraw the thumbnail gallery in the right panel.
 */
function renderPhotoPanel() {
  const container = document.getElementById("photo-thumbs");
  const emptyMsg  = document.getElementById("photo-empty");
  const countEl   = document.getElementById("photo-count");
  if (!container) return;

  const total = (typeof HISTORICAL_PHOTOS !== "undefined") ? HISTORICAL_PHOTOS.length : 0;
  const collected = state.collectedPhotos.length;
  if (countEl) countEl.textContent = `${collected} / ${total}`;

  if (collected === 0) {
    if (emptyMsg) emptyMsg.style.display = "block";
    container.innerHTML = "";
    return;
  }

  if (emptyMsg) emptyMsg.style.display = "none";

  container.innerHTML = "";
  // Show newest first
  const reversed = [...state.collectedPhotos].reverse();
  reversed.forEach((photo, i) => {
    const titleKey = "photo_" + photo.turn + "_title";
    const title = TR[titleKey] ? t(titleKey) : photo.title;
    const thumb = document.createElement("div");
    thumb.className = "photo-thumb" + (i === 0 ? " new-photo" : "");
    thumb.onclick = () => showPhotoOverlay(photo);
    thumb.innerHTML = `
      <img class="photo-thumb-img" src="${photo.imageUrl}" alt="${title}" loading="lazy"/>
      <div class="photo-thumb-title">${title}</div>
      <div class="photo-thumb-year">${photo.year}</div>
    `;
    container.appendChild(thumb);
  });
}


// ─────────────────────────────────────────────────────────────────────────
// LANGUAGE SYSTEM
//
// Switches between English ("en") and French ("fr"). The translation
// lookup is defined in translations-fr.js via the t() and tf() functions.
// applyLanguage() rewrites all static UI text on the current screen.
// ─────────────────────────────────────────────────────────────────────────

function toggleLanguage() {
  window.LANG = (window.LANG === "en") ? "fr" : "en";
  applyLanguage();
  // If in-game, re-render everything
  if (document.getElementById("screen-game").classList.contains("active")) {
    renderAll();
    renderPhotoPanel();
  }
}

function applyLanguage() {
  const L = window.LANG;

  // Toggle button labels
  const introBtn  = document.getElementById("lang-btn-intro");
  const headerBtn = document.getElementById("lang-btn-header");
  if (introBtn)  introBtn.textContent  = L === "en" ? "FR · Français" : "EN · English";
  if (headerBtn) headerBtn.textContent = L === "en" ? "FR" : "EN";

  // ── INTRO SCREEN ──
  const introEyebrow = document.querySelector(".intro-eyebrow");
  if (introEyebrow) introEyebrow.textContent = t("intro_eyebrow");
  const introTitle = document.querySelector(".intro-title");
  if (introTitle) introTitle.textContent = t("intro_title");
  const introSubtitle = document.querySelector(".intro-subtitle");
  if (introSubtitle) introSubtitle.textContent = t("intro_subtitle");
  const introBody = document.querySelector(".intro-body");
  if (introBody) introBody.innerHTML = t("intro_body");
  const nameLabel = document.querySelector(".name-label");
  if (nameLabel) nameLabel.textContent = t("intro_name_label");
  const nameHint = document.querySelector(".name-hint");
  if (nameHint) nameHint.textContent = t("intro_name_hint");
  const nameInput = document.getElementById("student-name-input");
  if (nameInput) nameInput.placeholder = t("intro_name_placeholder");
  const btnBegin = document.getElementById("btn-begin");
  if (btnBegin) btnBegin.textContent = t("btn_begin");
  const introFooter = document.querySelector(".intro-footer");
  if (introFooter) introFooter.textContent = t("intro_footer");

  // ── CHARACTER SCREEN ──
  const charTitle = document.querySelector(".char-header-title");
  if (charTitle) charTitle.textContent = t("char_title");
  const charSub = document.querySelector(".char-header-sub");
  if (charSub) charSub.textContent = t("char_subtitle");
  const charHint = document.querySelector(".char-footer-hint");
  if (charHint) charHint.textContent = t("char_footer_hint");

  // Character cards — update occupation, province, story, stats labels
  document.querySelectorAll(".char-card").forEach(card => {
    const id = card.dataset.charId;
    if (!id) return;
    const occEl = card.querySelector(".char-occupation");
    if (occEl) occEl.textContent = t("occ_" + id);
    const provEl = card.querySelector(".char-province");
    if (provEl) provEl.textContent = t("prov_" + id);
    const storyEl = card.querySelector(".char-story");
    if (storyEl) storyEl.textContent = t("story_" + id);
    const diffEl = card.querySelector(".char-difficulty");
    if (diffEl) {
      if (diffEl.classList.contains("diff-hard"))   diffEl.textContent = t("diff_hard");
      if (diffEl.classList.contains("diff-medium")) diffEl.textContent = t("diff_medium");
      if (diffEl.classList.contains("diff-easy"))   diffEl.textContent = t("diff_easy");
    }
    const prairieBadge = card.querySelector(".char-prairie-badge");
    if (prairieBadge) prairieBadge.textContent = t("prairie_badge");

    // Stat labels
    const statRows = card.querySelectorAll(".char-stat-row");
    if (statRows.length >= 3) {
      statRows[0].querySelector("span:first-child").textContent = t("starting_cash");
      statRows[1].querySelector("span:first-child").textContent = t("monthly_wage");
      statRows[2].querySelector("span:first-child").textContent = t("food_rent");
    }
  });

  // ── RULES SCREEN ──
  const rulesTitle = document.querySelector(".rules-title");
  if (rulesTitle) rulesTitle.textContent = t("rules_title");
  const rulesDate = document.querySelector(".rules-date");
  if (rulesDate) rulesDate.textContent = t("rules_date");

  // ── GAME SCREEN — HEADER ──
  const mastheadTitle = document.getElementById("masthead-title");
  if (mastheadTitle) mastheadTitle.textContent = t("masthead_title");
  const mastheadSub = document.getElementById("masthead-sub");
  if (mastheadSub) mastheadSub.textContent = L === "en" ? "A Canadian Economic Survival Chronicle · Est. 1928" : "Une chronique canadienne de survie économique · Est. 1928";

  // ── SIDEBAR PANELS ──
  // Ledger
  const panelTitles = document.querySelectorAll(".panel-title");
  if (panelTitles[0]) panelTitles[0].textContent = t("panel_ledger");
  if (panelTitles[1]) panelTitles[1].textContent = t("panel_margin");

  // Ledger labels
  const ledgerLabels = document.querySelectorAll(".ledger-label");
  const ledgerMap = [
    "cash_on_hand", "portfolio_value", "net_worth",
    "debt_owed", "interest_rate", "interest_due", "portfolio_debt",
    "employment", "monthly_wages", "food", "rent", "monthly_flow"
  ];
  ledgerLabels.forEach((el, i) => {
    if (ledgerMap[i]) {
      const key = ledgerMap[i];
      if (key === "net_worth") el.textContent = t("net_worth");
      else if (key === "monthly_flow") el.textContent = t("monthly_flow");
      else el.textContent = t(key);
    }
  });

  // Family panel
  const familyTitle = document.querySelector(".family-title");
  if (familyTitle) familyTitle.textContent = t("panel_family");
  const meterLabels = document.querySelectorAll(".family-meter-label");
  if (meterLabels[0]) meterLabels[0].textContent = t("meter_health");
  if (meterLabels[1]) meterLabels[1].textContent = t("meter_food");
  if (meterLabels[2]) meterLabels[2].textContent = t("meter_morale");

  // Neighbour panel
  const neighbourTitle = document.querySelector(".neighbour-title");
  if (neighbourTitle) neighbourTitle.textContent = t("panel_neighbour");

  // Household panel title
  if (panelTitles[2]) panelTitles[2].textContent = t("panel_household");

  // Borrow/repay labels
  const borrowLabels = document.querySelectorAll(".borrow-section-label");
  if (borrowLabels[0]) borrowLabels[0].textContent = t("borrow_label");
  if (borrowLabels[1]) borrowLabels[1].textContent = t("repay_label");

  // Margin warning
  const marginWarn = document.getElementById("margin-warning");
  if (marginWarn) marginWarn.textContent = t("margin_call_risk");

  // Borrow/Repay buttons
  document.querySelectorAll(".btn-borrow").forEach(b => b.textContent = t("btn_borrow"));
  document.querySelectorAll(".btn-repay").forEach(b => b.textContent = t("btn_repay"));

  // Market board
  const marketTitle = document.querySelector(".market-title");
  if (marketTitle) marketTitle.textContent = t("market_board_title");

  // Edu toast
  const eduToastLabel = document.querySelector(".edu-toast-header span:first-child");
  if (eduToastLabel) eduToastLabel.textContent = t("edu_did_you_know");
  const eduToastClose = document.getElementById("edu-toast-close");
  if (eduToastClose) eduToastClose.textContent = t("edu_dismiss");

  // Next turn button
  const nextBtn = document.getElementById("next-turn-btn");
  if (nextBtn) nextBtn.innerHTML = `${t("next_turn")} <span id="spacebar-hint">${t("spacebar_hint")}</span>`;

  // Photo panel
  const photoTitle = document.querySelector(".photo-panel-title span:first-child");
  if (photoTitle) photoTitle.textContent = t("photo_panel_title");
  const photoEmpty = document.getElementById("photo-empty");
  if (photoEmpty) photoEmpty.textContent = t("photo_empty");

  // Photo overlay continue button
  const photoContBtn = document.querySelector("#photo-overlay .screen-btn");
  if (photoContBtn) photoContBtn.textContent = t("photo_continue");

  // Crash overlay
  const crashSub = document.querySelector(".crash-subhead");
  if (crashSub) crashSub.textContent = t("crash_subhead");
  const crashHead = document.querySelector(".crash-headline");
  if (crashHead) crashHead.textContent = t("crash_headline");
  const crashBody = document.querySelector(".crash-body");
  if (crashBody) crashBody.innerHTML = t("crash_body") + "<br><br>" + t("crash_body2");
  const crashDismiss = document.querySelector("#crash-overlay .screen-btn");
  if (crashDismiss) crashDismiss.textContent = t("crash_dismiss");

  // Crash stats
  const crashStats = document.querySelectorAll(".crash-stat");
  if (crashStats[0]) {
    crashStats[0].querySelector(".crash-stat-value").textContent = t("crash_stat1_value");
    crashStats[0].querySelector(".crash-stat-label").textContent = t("crash_stat1_label");
  }
  if (crashStats[1]) {
    crashStats[1].querySelector(".crash-stat-value").textContent = t("crash_stat2_value");
    crashStats[1].querySelector(".crash-stat-label").textContent = t("crash_stat2_label");
  }
  if (crashStats[2]) {
    crashStats[2].querySelector(".crash-stat-value").textContent = t("crash_stat3_value");
    crashStats[2].querySelector(".crash-stat-label").textContent = t("crash_stat3_label");
  }

  // Game-over overlay
  const overlayBtns = document.querySelectorAll(".overlay-btns button");
  if (overlayBtns[0]) overlayBtns[0].textContent = t("btn_play_again");
  if (overlayBtns[1]) overlayBtns[1].textContent = t("btn_new_char");
  const journalBtn = document.querySelector(".journal-download-btn");
  if (journalBtn) journalBtn.textContent = t("btn_download_journal");
  const journalHint = document.querySelector(".journal-download-hint");
  if (journalHint) journalHint.textContent = t("journal_hint");

  // Completion screen
  const completeTitle = document.querySelector("#screen-complete .page-card div[style*='font-size:24px']");
  // More robust: just update key elements we can target

  // ── RULES SCREEN ── (full column content)
  const rulesCols = document.querySelectorAll(".rules-col");
  if (rulesCols[0]) {
    const h0 = rulesCols[0].querySelector(".rules-col-heading");
    const t0 = rulesCols[0].querySelector(".rules-col-title");
    const b0 = rulesCols[0].querySelector(".rules-body");
    if (h0) h0.textContent = t("rules_col1_num");
    if (t0) t0.textContent = t("rules_col1_title");
    if (b0) b0.innerHTML = t("rules_col1_body");
  }
  if (rulesCols[1]) {
    const h1 = rulesCols[1].querySelector(".rules-col-heading");
    const t1 = rulesCols[1].querySelector(".rules-col-title");
    const b1 = rulesCols[1].querySelector(".rules-body");
    if (h1) h1.textContent = t("rules_col2_num");
    if (t1) t1.textContent = t("rules_col2_title");
    if (b1) b1.innerHTML = t("rules_col2_body");
  }
  if (rulesCols[2]) {
    const h2 = rulesCols[2].querySelector(".rules-col-heading");
    const t2 = rulesCols[2].querySelector(".rules-col-title");
    const b2 = rulesCols[2].querySelector(".rules-body");
    if (h2) h2.textContent = t("rules_col3_num");
    if (t2) t2.textContent = t("rules_col3_title");
    if (b2) b2.innerHTML = t("rules_col3_body");
  }

  // Rules character box
  const rulesPlayingAs = document.querySelector(".rules-char-label");
  if (rulesPlayingAs) rulesPlayingAs.textContent = t("rules_playing_as");
  const rulesStatLabels = document.querySelectorAll(".rules-char-stat-label");
  if (rulesStatLabels[0]) rulesStatLabels[0].textContent = t("starting_cash");
  if (rulesStatLabels[1]) rulesStatLabels[1].textContent = t("monthly_wage");
  if (rulesStatLabels[2]) rulesStatLabels[2].textContent = L === "fr" ? "Dépenses" : "Expenses";

  // Rules footer buttons
  const rulesFooterBtns = document.querySelectorAll(".rules-footer .screen-btn");
  if (rulesFooterBtns[0]) rulesFooterBtns[0].textContent = t("rules_change_char");
  if (rulesFooterBtns[1]) rulesFooterBtns[1].textContent = t("rules_enter_game");

  // Rules character description
  if (selectedCharacter) {
    const descKey = "desc_" + selectedCharacter.id;
    const noteEl = document.getElementById("rules-char-note");
    if (noteEl && TR[descKey]) noteEl.textContent = t(descKey);
    const roleEl = document.getElementById("rules-char-role");
    const occKey2 = "occ_" + selectedCharacter.id;
    const provKey2 = "prov_" + selectedCharacter.id;
    if (roleEl) roleEl.textContent = `${TR[occKey2] ? t(occKey2) : selectedCharacter.occupation} · ${TR[provKey2] ? t(provKey2) : selectedCharacter.province}`;
  }

  // Stock table header
  const ths = document.querySelectorAll(".stock-table th");
  if (ths.length >= 7) {
    ths[0].textContent = t("col_company");
    ths[1].textContent = t("col_sector");
    ths[2].textContent = t("col_tip");
    ths[3].textContent = t("col_price");
    ths[4].textContent = t("col_change");
    ths[5].textContent = t("col_held");
    ths[6].textContent = t("col_trade");
  }
}


// ─────────────────────────────────────────────────────────────────────────
// INITIALISATION — runs once on page load
// ─────────────────────────────────────────────────────────────────────────

showScreen("screen-intro");
applyLanguage();
