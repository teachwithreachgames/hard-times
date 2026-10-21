/* ═══════════════════════════════════════════════════════════════════════════
 *  HARD TIMES — Canada 1928  |  play-mode.js
 *
 *  Adds a choice of play mode on the intro screen:
 *    • "classroom" — reflection questions after each December + downloadable
 *                    Reflection Journal (the original behaviour)
 *    • "free"      — no reflection questions, no journal; just play
 *
 *  Loaded AFTER game-logic.js. It wraps a few existing functions rather than
 *  editing them, so the core engine stays untouched.
 * ═══════════════════════════════════════════════════════════════════════════ */

window.PLAY_MODE = "classroom";

// ── Translations for the mode picker ─────────────────────────────────────
Object.assign(TR, {
  mode_label:            { en: "Choose a Mode", fr: "Choisissez un mode" },
  mode_classroom_title:  { en: "Classroom Mode", fr: "Mode classe" },
  mode_classroom_desc:   { en: "Answer a reflection question at the end of each year and download your Reflection Journal.", fr: "Répondez à une question de réflexion à la fin de chaque année et téléchargez votre journal de réflexion." },
  mode_free_title:       { en: "Free Play", fr: "Jeu libre" },
  mode_free_desc:        { en: "No questions — just play through the Depression from 1928 to 1939.", fr: "Aucune question — jouez simplement à travers la Dépression, de 1928 à 1939." },
  intro_name_hint_free:  { en: "Required — enter your name to begin.", fr: "Obligatoire — entrez votre nom pour commencer." }
});

// ── Mode selection (called by the buttons on the intro screen) ───────────
function selectPlayMode(mode) {
  window.PLAY_MODE = mode;
  document.querySelectorAll(".mode-option").forEach(btn => {
    const on = btn.dataset.mode === mode;
    btn.classList.toggle("selected", on);
    btn.setAttribute("aria-checked", on ? "true" : "false");
  });
  updateNameHintForMode();
}

function isFreePlay() {
  return window.PLAY_MODE === "free";
}

function updateNameHintForMode() {
  const hint = document.querySelector(".name-hint");
  if (hint) hint.textContent = t(isFreePlay() ? "intro_name_hint_free" : "intro_name_hint");
}

// ── Skip the yearly reflection question in Free Play ─────────────────────
// closeReportCard() falls through to checkHistoricalPhoto() when this
// returns false, so the game simply carries on into January.
const _checkReflectionClassroom = checkReflection;
checkReflection = function (year) {
  if (isFreePlay()) return false;
  return _checkReflectionClassroom(year);
};

// ── End of game in Free Play: plain overlay, no journal ──────────────────
const _showEndScreenClassroom = showEndScreen;
showEndScreen = function (title, message) {
  if (!isFreePlay()) {
    _showEndScreenClassroom(title, message);
    return;
  }
  document.getElementById("overlay-title").textContent = title;
  document.getElementById("overlay-msg").textContent   = message;
  document.getElementById("overlay").classList.add("show");
  document.getElementById("next-turn-btn").disabled    = true;
  const row = document.getElementById("journal-download-row");
  if (row) row.style.display = "none";
};

// ── Keep the picker translated when the language is toggled ──────────────
const _applyLanguageBase = applyLanguage;
applyLanguage = function () {
  _applyLanguageBase();
  const label = document.getElementById("mode-label");
  if (label) label.textContent = t("mode_label");
  document.querySelectorAll(".mode-option").forEach(btn => {
    const key = btn.dataset.mode === "free" ? "mode_free" : "mode_classroom";
    btn.querySelector(".mode-option-title").textContent = t(key + "_title");
    btn.querySelector(".mode-option-desc").textContent  = t(key + "_desc");
  });
  updateNameHintForMode();
};

applyLanguage();
