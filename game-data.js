/* ═══════════════════════════════════════════════════════════════════════════
 *  HARD TIMES — Canada 1928  |  game-data.js
 *
 *  All static, read-only data. Nothing in this file changes at runtime.
 *  Edit here to: add/change characters, stocks, events, historical text,
 *  educational notes, or market index values.
 * ═══════════════════════════════════════════════════════════════════════════ */


// ─────────────────────────────────────────────────────────────────────────
// CHARACTERS
//
// Five historically grounded Canadians, each representing a different
// region, occupation, and set of Depression-era experiences.
// ─────────────────────────────────────────────────────────────────────────

const CHARACTERS = [
  {
    id:           "farmer",
    name:         "Elias Nowak",
    occupation:   "Wheat Farmer",
    province:     "Saskatchewan",
    description:  "Prairie drought events fire from 1931 onward: dust storms, crop failures, and collapsing wheat prices will hammer your income hard. Relief comes slowly — and never enough.",
    startingCash: 800,
    startingWage: 32,
    startingFood: 6,
    startingRent: 8,
    isPrairie:    true
  },
  {
    id:           "worker",
    name:         "Margaret Chen",
    occupation:   "Steel Factory Worker",
    province:     "Hamilton, Ontario",
    description:  "Factory layoffs closely follow market downturns. When the index falls sharply, your job is at risk. Relief is available but meagre — watch your monthly flow carefully.",
    startingCash: 1000,
    startingWage: 45,
    startingFood: 8,
    startingRent: 15,
    isPrairie:    false
  },
  {
    id:           "miner",
    name:         "Alistair MacLeod",
    occupation:   "Coal Miner",
    province:     "Cape Breton, N.S.",
    description:  "Your wages are the highest of any character — but coal mines were among the first to shut down in a downturn. A big crash can mean a sudden, prolonged layoff.",
    startingCash: 900,
    startingWage: 52,
    startingFood: 9,
    startingRent: 14,
    isPrairie:    false
  },
  {
    id:           "shopkeeper",
    name:         "Henri Bouchard",
    occupation:   "General Store Owner",
    province:     "Montreal, Quebec",
    description:  "You start with the most cash and a stable (if modest) income. Your expenses are the highest of any character — Montreal rent is no joke — but you are less exposed to sudden layoffs.",
    startingCash: 1200,
    startingWage: 40,
    startingFood: 10,
    startingRent: 18,
    isPrairie:    false
  },
  {
    id:           "dockworker",
    name:         "Thomas O'Brien",
    occupation:   "Dockworker",
    province:     "Vancouver, B.C.",
    description:  "Pacific trade links Vancouver to American and Asian markets. When U.S. demand collapses after 1929, your dockwork dries up fast. Good wages while they last.",
    startingCash: 1000,
    startingWage: 48,
    startingFood: 9,
    startingRent: 16,
    isPrairie:    false
  }
];


// ─────────────────────────────────────────────────────────────────────────
// STOCKS
//
// Seven historically real companies. VOLATILITY (Beta):
//   stockPriceChange = marketIndexChange × volatility
//   0.5× = defensive (banks); 1.0× = neutral; 1.8× = speculative (RCA)
// ─────────────────────────────────────────────────────────────────────────

const STOCKS = [
  { id: "CPR", name: "Canadian Pacific Railway", sector: "Railway · 0.9×",         startPrice: 62.00, volatility: 0.90, tip: "Built Canada coast-to-coast. Passenger and freight revenue falls when trade collapses — but railways always come back." },
  { id: "BMO", name: "Bank of Montreal",          sector: "Canadian Bank · 0.5×",   startPrice: 47.00, volatility: 0.50, tip: "Canada's oldest bank. Conservative lending makes it safer than most — but no bank is immune to a full collapse." },
  { id: "RBC", name: "Royal Bank of Canada",      sector: "Canadian Bank · 0.55×",  startPrice: 44.00, volatility: 0.55, tip: "Solid and cautious. Holds its value better than industrial stocks in a downturn. Low reward, low risk." },
  { id: "HBC", name: "Hudson's Bay Company",      sector: "Retail · 1.0×",          startPrice: 28.00, volatility: 1.00, tip: "Sells goods Canadians buy every day — but when families have nothing, they stop buying. Moves with the market." },
  { id: "GM",  name: "General Motors",            sector: "U.S. Industrial · 1.2×", startPrice: 72.00, volatility: 1.20, tip: "Cars are a luxury. When jobs disappear, nobody buys a new automobile. Climbs fast, falls fast." },
  { id: "USS", name: "U.S. Steel Corporation",    sector: "U.S. Industrial · 1.3×", startPrice: 54.00, volatility: 1.30, tip: "Steel demand tracks construction and manufacturing. When factories close, orders dry up almost overnight." },
  { id: "RCA", name: "Radio Corp. of America",    sector: "Speculative · 1.8×",     startPrice: 18.00, volatility: 1.80, tip: "Pure speculation — radio is exciting but RCA has almost no real earnings. Enormous gains in booms, catastrophic in busts." }
];


// ─────────────────────────────────────────────────────────────────────────
// MARKET_INDEX_CHANGES
//
// Monthly % change (decimal) for 144 turns.
// January 1928 (turn 0) through December 1939 (turn 143).
// ─────────────────────────────────────────────────────────────────────────

const MARKET_INDEX_CHANGES = [
  // 1928 (T0–11): Roaring Twenties bull run
   0.030,  0.025,  0.035,  0.020,  0.028,  0.032,
   0.040,  0.035,  0.025,  0.018,  0.030,  0.022,
  // 1929 (T12–23): Peak, then catastrophic crash
   0.028,  0.020,  0.038,  0.030,  0.025,  0.042,
   0.050,  0.038,  0.025, -0.200, -0.220, -0.180,  // Oct/Nov/Dec = THE CRASH
  // 1930 (T24–35): Shock spreads; factories and farms fail
  -0.090, -0.060, -0.080, -0.040, -0.055, -0.035,
  -0.045, -0.065, -0.055, -0.075, -0.095, -0.060,
  // 1931 (T36–47): Banking crisis; Dust Bowl begins
  -0.050, -0.035, -0.055, -0.070, -0.080, -0.050,
  -0.060, -0.085, -0.065, -0.045, -0.055, -0.040,
  // 1932 (T48–59): Darkest year; 25% unemployment
  -0.055, -0.040, -0.060, -0.035, -0.025, -0.015,
  -0.020,  0.010, -0.010,  0.005, -0.005,  0.008,
  // 1933 (T60–71): Cautious recovery; New Deal
   0.015,  0.020,  0.035,  0.025,  0.030,  0.018,
   0.022,  0.015,  0.010,  0.018,  0.012,  0.020,
  // 1934 (T72–83): Uneven, fragile gains
   0.010,  0.015, -0.010,  0.008,  0.012,  0.018,
  -0.008,  0.010,  0.005,  0.012,  0.008,  0.015,
  // 1935 (T84–95): Moderate recovery; King government
   0.018,  0.022,  0.015,  0.020,  0.025,  0.018,
   0.020,  0.015,  0.012,  0.018,  0.022,  0.025,
  // 1936 (T96–107): Strongest recovery year
   0.028,  0.022,  0.030,  0.025,  0.020,  0.028,
   0.025,  0.018,  0.022,  0.020,  0.025,  0.030,
  // 1937 (T108–119): Recession-within-Depression
   0.015,  0.010, -0.015, -0.025, -0.020, -0.010,
  -0.018, -0.030, -0.025, -0.015, -0.010, -0.008,
  // 1938 (T120–131): Slow crawl upward
  -0.012,  0.005,  0.010,  0.015,  0.008,  0.012,
   0.010,  0.015,  0.008,  0.012,  0.018,  0.015,
  // 1939 (T132–143): WWII begins Sep 1939 — Depression ends
   0.012,  0.015,  0.010,  0.018,  0.012,  0.008,
  -0.005,  0.020,  0.015,  0.010,  0.012,  0.018
];


// ─────────────────────────────────────────────────────────────────────────
// HEADLINES — shown in the event log at key historical moments
// ─────────────────────────────────────────────────────────────────────────

const HEADLINES = {
   0: "The year 1928 opens with cautious optimism on Bay Street.",
   6: "Summer boom: speculation reaches fever pitch across North America.",
  12: "New Year 1929 — prosperity seems endless. Investors double down.",
  18: "Summer 1929: markets hit all-time highs. The good times roll.",
  20: "September 1929: cracks appear. Some cautious investors quietly sell.",
  21: "BLACK TUESDAY — Wall Street collapses! Panic selling grips Toronto.",
  22: "Shock spreads north. Canadian exchanges in freefall.",
  23: "Banks restrict credit. Unemployment surges. Breadlines form in Montreal.",
  24: "1930 dawns in misery. Dust storms begin ravaging the Prairies.",
  30: "PM Bennett promises relief — promises ring hollow in the streets.",
  36: "1931: Banks fail across the continent. Savings wiped out overnight.",
  42: "Relief camps open in British Columbia. Thousands queue for food.",
  48: "1932: The darkest year. One in four Canadians is unemployed.",
  59: "Markets appear to have found a floor. Is the worst over?",
  60: "1933: Tentative recovery. Roosevelt's New Deal offers hope.",
  84: "1935: PM King returns to power, promising Canadian relief programs.",
  96: "1936: The strongest recovery year yet. Bay Street cautiously optimistic.",
 108: "1937: A recession within the Depression strikes. Markets stumble again.",
 120: "1938: A slow crawl upward. The worst feels behind us.",
 132: "1939: War clouds gather over Europe. Uncertainty grips markets.",
 140: "September 1939: Canada declares war on Germany. War industry stirs.",
 143: "December 1939: The Depression era draws to a close. A new world awaits."
};


// ─────────────────────────────────────────────────────────────────────────
// LIFE_EVENTS
//
// Household events that can fire each turn. At most ONE fires per turn.
// Each event: { id, text, cls, condition(gameState, indexChange), effect(gameState) }
// Prairie events are gated behind gs.isPrairie.
// ─────────────────────────────────────────────────────────────────────────

const LIFE_EVENTS = [

  // ── UNIVERSAL: JOB-LOSS ─────────────────────────────────────────────────
  {
    id: "laid_off",
    text: "Your employer lays off workers — you have lost your job. No wages this month.",
    cls: "bad",
    condition: (gs, idx) => gs.employed && idx <= -0.08,
    effect:    (gs) => { gs.employed = false; }
  },
  {
    id: "factory_wage_cut",
    text: "Factory cuts wages — your monthly pay is reduced by $10.",
    cls: "bad",
    condition: (gs, idx) => gs.employed && idx <= -0.04 && gs.monthlyWage > 20,
    effect:    (gs) => { gs.monthlyWage = Math.max(15, gs.monthlyWage - 10); }
  },
  {
    id: "mine_wage_cut",
    text: "The coal company slashes pay — mine wages drop across the region.",
    cls: "bad",
    condition: (gs, idx) => gs.employed && idx <= -0.05 && gs.monthlyWage > 25,
    effect:    (gs) => { gs.monthlyWage = Math.max(15, gs.monthlyWage - 8); }
  },

  // ── UNIVERSAL: COST OF LIVING ────────────────────────────────────────────
  {
    id: "food_up",
    text: "Food prices rise at the local market — groceries cost $3 more per month.",
    cls: "bad",
    condition: (gs, idx) => gs.turn >= 24 && gs.monthlyFoodCost < 20,
    effect:    (gs) => { gs.monthlyFoodCost += 3; }
  },
  {
    id: "rent_up",
    text: "Your landlord raises rent — another $5 a month out of your pocket.",
    cls: "bad",
    condition: (gs, idx) => gs.turn >= 30 && gs.monthlyRent < 28,
    effect:    (gs) => { gs.monthlyRent += 5; }
  },

  // ── UNIVERSAL: GOVERNMENT AID ────────────────────────────────────────────
  {
    id: "municipal_relief",
    text: "Municipal relief payment received — a small mercy from the city council: $10.",
    cls: "good",
    condition: (gs, idx) => !gs.employed && gs.turn >= 24,
    effect:    (gs) => { gs.cash += 10; }
  },
  {
    id: "bennett_relief",
    text: "Bennett government issues relief order — $15 distributed to struggling families.",
    cls: "good",
    condition: (gs, idx) => !gs.employed && gs.turn >= 30 && gs.turn <= 84,
    effect:    (gs) => { gs.cash += 15; }
  },

  // ── UNIVERSAL: RECOVERY ──────────────────────────────────────────────────
  {
    id: "rehired",
    text: "A local factory reopens — you find work again at reduced wages ($35/month).",
    cls: "good",
    condition: (gs, idx) => !gs.employed && idx >= 0.01 && gs.turn >= 60,
    effect:    (gs) => { gs.employed = true; gs.monthlyWage = Math.max(gs.monthlyWage, 35); }
  },
  {
    id: "wages_restored",
    text: "Production picks up — your employer restores part of the wage cut.",
    cls: "good",
    condition: (gs, idx) => gs.employed && idx >= 0.02 && gs.monthlyWage < 40,
    effect:    (gs) => { gs.monthlyWage = Math.min(45, gs.monthlyWage + 8); }
  },
  {
    id: "food_down",
    text: "Food prices ease slightly — deflation brings rare relief at the grocery store.",
    cls: "good",
    condition: (gs, idx) => gs.turn >= 36 && gs.monthlyFoodCost > 8,
    effect:    (gs) => { gs.monthlyFoodCost = Math.max(8, gs.monthlyFoodCost - 2); }
  },

  // ── PRAIRIE-SPECIFIC EVENTS ──────────────────────────────────────────────
  // Only fire when gs.isPrairie is true (Elias Nowak / farmer character).
  // Historical context: The Dust Bowl of 1931–1938 devastated the Canadian
  // Prairies. In Saskatchewan, 66% of the rural population was on relief by 1937.

  {
    id: "dust_storm",
    text: "A black blizzard rolls across the Prairies — topsoil stripped, livestock choking. You spend $25 trying to save the animals and what's left of the crop.",
    cls: "bad",
    condition: (gs, idx) => gs.isPrairie && gs.turn >= 36 && gs.turn <= 120,
    effect:    (gs) => { gs.cash -= 25; }
  },
  {
    id: "wheat_price_collapse",
    text: "Wheat prices collapse on the Chicago exchange — your crop income drops by $10 this month.",
    cls: "bad",
    condition: (gs, idx) => gs.isPrairie && gs.turn >= 24 && gs.monthlyWage > 15,
    effect:    (gs) => { gs.monthlyWage = Math.max(12, gs.monthlyWage - 10); }
  },
  {
    id: "crop_failure",
    text: "Drought withers your crop before harvest. No farm income this month — just prayers for rain.",
    cls: "bad",
    condition: (gs, idx) => gs.isPrairie && gs.turn >= 36 && gs.turn <= 108 && gs.employed,
    effect:    (gs) => { gs.employed = false; }
  },
  {
    id: "bennett_buggy",
    text: "No money for petrol. You've hitched horses to the old Ford. Neighbours call it a 'Bennett Buggy.'",
    cls: "bad",
    // Named mockingly after PM R.B. Bennett
    condition: (gs, idx) => gs.isPrairie && gs.turn >= 30 && gs.turn <= 84,
    effect:    (gs) => { gs.cash -= 8; }
  },
  {
    id: "grasshopper_plague",
    text: "Grasshoppers devour what the drought didn't take. The crops are gone. You lose $20 in feed and repairs.",
    cls: "bad",
    condition: (gs, idx) => gs.isPrairie && gs.turn >= 48 && gs.turn <= 96,
    effect:    (gs) => { gs.cash -= 20; }
  },
  {
    id: "prairie_farm_relief",
    text: "Province distributes seed grain and food relief to struggling farm families. You receive $22 in aid.",
    cls: "good",
    condition: (gs, idx) => gs.isPrairie && gs.turn >= 30 && gs.turn <= 108,
    effect:    (gs) => { gs.cash += 22; }
  },
  {
    id: "good_harvest",
    text: "A rare good year — your wheat harvest beats expectations. Farm income rises by $10 this month.",
    cls: "good",
    condition: (gs, idx) => gs.isPrairie && idx >= 0 && gs.turn >= 60 && gs.turn <= 132,
    effect:    (gs) => { gs.monthlyWage = Math.min(40, gs.monthlyWage + 10); }
  },
  {
    id: "returned_to_farm",
    text: "Rains return and you plant again — you are back to farming after the long drought.",
    cls: "good",
    condition: (gs, idx) => gs.isPrairie && !gs.employed && idx >= 0.01 && gs.turn >= 84,
    effect:    (gs) => { gs.employed = true; gs.monthlyWage = Math.max(gs.monthlyWage, 28); }
  }
];


// ─────────────────────────────────────────────────────────────────────────
// EDU_TURN_NOTES — educational notes tied to specific turn numbers
// ─────────────────────────────────────────────────────────────────────────

const EDU_TURN_NOTES = {
  3:   { text: "Speculation means buying something hoping to sell it later at a profit — not because it has real value. In the 1920s, millions of Canadians and Americans speculated wildly on stocks.", popup: true },
  8:   { text: "The 'Roaring Twenties' created a dangerous bubble: stock prices kept rising because everyone expected them to keep rising — not because companies were actually worth more.", popup: false },
  15:  { text: "Buying 'on margin' means borrowing money to buy stocks, putting up only a fraction of the price yourself. In the 1920s you could buy $10 of stock with just $1 of your own money.", popup: true },
  20:  { text: "A stock market crash happens when investors panic and all try to sell at once. Each sale pushes prices lower, causing more panic — a chain reaction no one can stop.", popup: false },
  21:  { text: "The Wall Street Crash of October 1929 ('Black Tuesday') wiped out billions of dollars in wealth within days. Investors who had borrowed to buy stocks were suddenly ruined and could not repay their loans.", popup: true },
  22:  { text: "Canada sent most of its exports — wheat, timber, minerals — to the United States. When American demand collapsed after the crash, Canadian factories and farms lost their biggest customer overnight.", popup: true },
  24:  { text: "When companies lose value on the stock market, they cut costs by laying off workers. Fewer jobs meant families had less to spend, so businesses lost even more — a downward spiral.", popup: false },
  30:  { text: "PM R.B. Bennett's Conservative government initially refused large-scale relief, believing the Depression would fix itself. His response was seen as cold and out of touch with ordinary Canadians.", popup: false },
  36:  { text: "Many banks had also invested in the stock market. When the market crashed, some banks failed entirely, wiping out the savings accounts of ordinary Canadians who had done nothing wrong.", popup: true },
  42:  { text: "The federal government opened relief camps for unemployed single men, paying 20 cents a day for hard labour. Critics called them 'slave camps' — they became a flashpoint for protests.", popup: false },
  48:  { text: "By 1932, about 1 in 4 Canadians had no job — the highest unemployment rate in Canadian history. On the Prairies, a severe drought hit at the same time, destroying crops and creating the 'Dust Bowl.'", popup: true },
  60:  { text: "In the U.S., President Roosevelt's 'New Deal' used government spending to create jobs and support the poor. Canada was slower to act — PM Bennett introduced limited reforms only in 1935.", popup: false },
  84:  { text: "Mackenzie King's Liberals won the 1935 election promising more relief. The government slowly expanded programs, but payments remained very small — often less than what families needed to survive.", popup: false },
  108: { text: "Governments cut spending in 1937, thinking the Depression was over. This triggered a new recession — proof that the economy was still fragile and needed continued support.", popup: false },
  140: { text: "Canada's declaration of war in September 1939 ended the Depression almost immediately. War factories needed workers, raw materials, and production — unemployment vanished within two years.", popup: true }
};


// ─────────────────────────────────────────────────────────────────────────
// EDU_CONDITION_NOTES — educational notes triggered by game conditions
// ─────────────────────────────────────────────────────────────────────────

const EDU_CONDITION_NOTES = [
  {
    id: "first_borrow",
    text: "You borrowed 'on margin.' Remember: if prices fall, you still owe this money plus 5% interest per month — exactly the trap that ruined thousands of investors in 1929.",
    popup: true,
    condition: (gs, idx) => gs.debt > 0
  },
  {
    id: "crash_chain",
    text: "Markets fall sharply when panic sets in. Investors who borrowed to buy stocks must sell quickly to repay loans — their forced selling drives prices down even further.",
    popup: false,
    condition: (gs, idx) => idx <= -0.08
  },
  {
    id: "first_unemployed",
    text: "Unemployment spread through Canada like a wave: fewer orders → layoffs → families with less to spend → fewer sales → more layoffs. This feedback loop is called a 'deflationary spiral.'",
    popup: true,
    condition: (gs, idx) => !gs.employed
  },
  {
    id: "margin_call_warning",
    text: "A 'margin call' means your broker demands repayment because your stocks have lost value. In 1929, brokers issued thousands of margin calls in a single day, forcing mass selling.",
    popup: true,
    condition: (gs, idx) => {
      if (gs.debt <= 0) return false;
      const portfolioValue = STOCKS.reduce(
        (sum, s) => sum + gs.holdings[s.id] * gs.prices[s.id], 0
      );
      return (portfolioValue / gs.debt) < 0.55;
    }
  },
  {
    id: "forced_sale_edu",
    text: "When your cash runs out, survival forces you to sell investments at whatever price the market offers — often at the worst possible moment. This is the desperation that defined Depression life.",
    popup: true,
    condition: (gs, idx) => gs.forcedSaleOccurredThisGame === true
  }
];

// ─────────────────────────────────────────────────────────────────────────
// DECISION_PROMPTS
//
// Forced choices that pause the game and make students think.
// Each prompt: { id, turn, title, kicker, body, choices[] }
// Each choice: { label, text, effect(gameState) }
// Prompts fire at specific turns (exact month) — one per game.
// ─────────────────────────────────────────────────────────────────────────

const DECISION_PROMPTS = [
  {
    id: "broker_tip_1928",
    turn: 4,  // April 1928
    title: "A Broker's Advice",
    kicker: "Investment Decision",
    body: "Your broker pulls you aside at the exchange. 'Everyone is buying on margin,' he says with a grin. 'Put up $100 of your own money and I'll lend you $400 more. You could control $500 in stock — a sure thing in this market.' His office is full of men doing exactly that.",
    choices: [
      {
        label: "Option A — Take the margin loan",
        text: "You borrow $400 from the broker and invest the full $500 in stocks. Your potential gains are huge — but so is your debt.",
        effect: (gs) => { gs.cash += 400; gs.debt += 400; }
      },
      {
        label: "Option B — Invest only what you have",
        text: "You invest $100 of your own savings and walk away from the loan. Slower gains — but no debt hanging over you.",
        effect: (gs) => { /* no change — player invests manually */ }
      },
      {
        label: "Option C — Keep your cash, watch the market",
        text: "You keep your money in your pocket and watch others speculate. Your savings are safe — for now.",
        effect: (gs) => { /* no change */ }
      }
    ]
  },
  {
    id: "crash_warning_1929",
    turn: 19,  // July 1929
    title: "A Warning Sign",
    kicker: "October 1929 Approaches",
    body: "An older investor you respect takes you aside. 'I've seen this before,' he says quietly. 'Prices have gone up too fast. Too many people are borrowing to buy. When the music stops, it stops suddenly.' He has been quietly selling his shares all summer. What do you do?",
    choices: [
      {
        label: "Option A — Sell half your stocks now",
        text: "You take his advice and sell half your portfolio for cash. If he's right, you'll be protected. If he's wrong, you'll miss some gains.",
        effect: (gs) => {
          STOCKS.forEach(s => {
            const sell = Math.floor(gs.holdings[s.id] / 2);
            if (sell > 0) { gs.cash += sell * gs.prices[s.id]; gs.holdings[s.id] -= sell; }
          });
        }
      },
      {
        label: "Option B — Sell everything and hold cash",
        text: "You liquidate your entire portfolio. You'll miss any last gains — but you'll be safe if the crash comes.",
        effect: (gs) => {
          STOCKS.forEach(s => {
            gs.cash += gs.holdings[s.id] * gs.prices[s.id]; gs.holdings[s.id] = 0;
          });
        }
      },
      {
        label: "Option C — Stay fully invested",
        text: "The market has been rising for years. You dismiss the warning and stay put — the good times will continue.",
        effect: (gs) => { /* no change */ }
      }
    ]
  },
  {
    id: "relief_camp_1932",
    turn: 52,  // April 1932
    title: "The Relief Camp",
    kicker: "Federal Relief Program",
    body: "The federal government is offering work in a relief camp — hard labour clearing bush and building roads for 20 cents a day and a bunk. It is not much, but it is steady. Your neighbour took the offer last month. You have been unemployed for six months.",
    choices: [
      {
        label: "Option A — Join the relief camp",
        text: "You take the government work. The pay is terrible but it covers your food. You receive $4 per month for the duration of unemployment.",
        effect: (gs) => { if (!gs.employed) gs.cash += 4; gs.reliefCamp = true; }
      },
      {
        label: "Option B — Keep looking for real work",
        text: "You refuse the relief camp and keep searching for proper employment. Your pride is intact — but your savings keep draining.",
        effect: (gs) => { /* no change */ }
      }
    ]
  },
  {
    id: "bank_run_1931",
    turn: 40,  // April 1931
    title: "A Run on the Bank",
    kicker: "Banking Crisis",
    body: "Word spreads down the street: the local savings bank is in trouble. A crowd is gathering outside, desperate to withdraw their money before it closes. You have $50 in a savings account there. The lineup stretches around the block.",
    choices: [
      {
        label: "Option A — Rush to withdraw your savings",
        text: "You join the crowd and manage to get your $50 out before the doors close. The bank fails the next day.",
        effect: (gs) => { gs.cash += 50; }
      },
      {
        label: "Option B — Trust the bank and stay home",
        text: "You decide the panic is overblown. Unfortunately, the bank fails. Your $50 is gone.",
        effect: (gs) => { /* no gain — savings lost */ }
      }
    ]
  },
  {
    id: "sell_house_1933",
    turn: 64,  // April 1933
    title: "Sell the House?",
    kicker: "A Difficult Choice",
    body: "A buyer has appeared with a cash offer for your property — $300, well below what it was worth in 1928. But you are behind on expenses and your debt is mounting. If you sell now, you'll have cash to survive. But you'll have nothing to your name.",
    choices: [
      {
        label: "Option A — Sell and take the cash",
        text: "You sell. It hurts. But $300 in hand is better than foreclosure.",
        effect: (gs) => { gs.cash += 300; gs.monthlyRent = Math.min(gs.monthlyRent + 8, 30); }
      },
      {
        label: "Option B — Hold on and find another way",
        text: "You refuse the offer. Your property — whatever it is worth now — remains yours.",
        effect: (gs) => { /* no change */ }
      }
    ]
  }
];


// ─────────────────────────────────────────────────────────────────────────
// HOT_TIPS
//
// Rumours and insider whispers that appear randomly during gameplay.
// Each tip: { id, title, body, source, minTurn, maxTurn, probability }
// Tips offer advice that may or may not be sound — students must judge.
// ─────────────────────────────────────────────────────────────────────────

const HOT_TIPS = [
  {
    id: "tip_rca_buy",
    title: "Radio is the Future!",
    body: "A well-dressed man at the exchange leans over: 'RCA is going through the roof. Radio is the future — every home will have one. Get in now before the price doubles again.'",
    source: "Overheard at the Toronto Stock Exchange, 1928",
    minTurn: 2, maxTurn: 18, probability: 0.25
  },
  {
    id: "tip_banks_safe",
    title: "Banks Are Solid as Rock",
    body: "Your bank manager assures you over the counter: 'The Canadian banks are the safest in the world. Conservative lending, government backing. Put your savings in bank shares — you cannot go wrong.'",
    source: "Bank of Montreal branch, Spring 1929",
    minTurn: 8, maxTurn: 20, probability: 0.20
  },
  {
    id: "tip_sell_before_crash",
    title: "Something Feels Wrong",
    body: "A retired businessman who survived the Panic of 1907 sits beside you at the barbershop. 'When the shoeshine boy starts giving you stock tips,' he says, 'it is time to sell. I sold everything last week.'",
    source: "Barbershop conversation, September 1929",
    minTurn: 17, maxTurn: 21, probability: 0.35
  },
  {
    id: "tip_gm_layoffs",
    title: "Trouble at the Factory",
    body: "A factory foreman you know pulls you aside: 'GM is cutting shifts. I've seen the orders — they're down 40%. I wouldn't hold those shares if I were you.'",
    source: "Foundry worker, Hamilton, 1930",
    minTurn: 24, maxTurn: 36, probability: 0.30
  },
  {
    id: "tip_buy_low_1932",
    title: "Buy When There's Blood in the Streets",
    body: "A wealthy merchant who seems untouched by the Depression tells you: 'The secret is to buy when everyone else is selling. Look at these prices — they cannot go lower. This is the buying opportunity of a lifetime.'",
    source: "Montreal businessman, 1932",
    minTurn: 48, maxTurn: 62, probability: 0.25
  },
  {
    id: "tip_cpr_steady",
    title: "The Railway Always Runs",
    body: "An old-timer with weathered hands tells you at the diner: 'People said the same in 1907 and 1893. The CPR always comes back. It built this country. Buy it and hold it — ten years from now you'll thank me.'",
    source: "Retired railway worker, 1931",
    minTurn: 36, maxTurn: 84, probability: 0.20
  },
  {
    id: "tip_war_economy",
    title: "War Is Coming — and With It, Work",
    body: "A newspaper editor speaks plainly over lunch: 'Europe is heading for war. Steel, coal, munitions — Canadian industry will roar back to life. The Depression is nearly over for anyone paying attention.'",
    source: "Ottawa journalist, Spring 1939",
    minTurn: 130, maxTurn: 143, probability: 0.40
  }
];


// ─────────────────────────────────────────────────────────────────────────
// NPC_NEIGHBOURS
//
// One neighbour is assigned per character at game start. They mirror the
// player's world but make different (often worse) choices.
// ─────────────────────────────────────────────────────────────────────────

const NPC_NEIGHBOURS = {
  farmer: {
    name: "Viktor Petrenko",
    occupation: "Neighbouring Wheat Farmer",
    story: "Viktor farms the quarter-section next to yours. He borrowed heavily in 1927 to buy more land and a new thresher.",
    events: [
      { turn: 10, text: "Viktor borrowed $600 more to buy extra seed. 'The prices will hold,' he says.",                     cls: "bad" },
      { turn: 22, text: "Viktor is stunned by the crash news. He has $800 in margin debt.",                                 cls: "bad" },
      { turn: 30, text: "Viktor's wheat brought half what it did last year. He can't cover his loans.",                    cls: "bad" },
      { turn: 42, text: "Viktor lost his thresher to the bank. He is borrowing yours.",                                    cls: "bad" },
      { turn: 55, text: "Viktor and his family are on provincial relief. They eat government rations.",                    cls: "bad" },
      { turn: 72, text: "Viktor's family has left for British Columbia. The farm sits empty.",                             cls: "bad" },
      { turn: 96, text: "Word comes that Viktor found work in a Vancouver cannery. He sends money home.",                  cls: "good" },
      { turn: 132, text: "A letter arrives: Viktor is working in a munitions factory. He sounds hopeful for the first time.", cls: "good" }
    ]
  },
  worker: {
    name: "Stanley Kowalski",
    occupation: "Fellow Foundry Worker",
    story: "Stanley works the same shift as you at Dominion Steel. He put all his savings into General Motors shares in 1928.",
    events: [
      { turn: 8,  text: "Stanley's GM shares are up 30%. He's bought more on margin. 'Easy money,' he laughs.",           cls: "bad" },
      { turn: 22, text: "Stanley got a margin call. He's lost most of what he put in.",                                    cls: "bad" },
      { turn: 28, text: "Stanley was laid off last week. He has no savings left.",                                         cls: "bad" },
      { turn: 36, text: "Stanley is on relief. He stood in line for four hours for a bag of flour.",                       cls: "bad" },
      { turn: 50, text: "Stanley's wife has taken in laundry to keep the family fed.",                                     cls: "bad" },
      { turn: 72, text: "Stanley found part-time work at a garage. 'Better than nothing,' he says.",                      cls: "good" },
      { turn: 96, text: "The foundry rehired Stanley at lower wages. He's grateful just to be back.",                     cls: "good" },
      { turn: 140, text: "Stanley got a war-production contract job. Full wages again, for the first time in a decade.",  cls: "good" }
    ]
  },
  miner: {
    name: "Angus MacDonald",
    occupation: "Fellow Coal Miner",
    story: "Angus has worked Dominion Coal for twenty years. He never trusted the stock market — he put his savings in a credit union.",
    events: [
      { turn: 12, text: "Angus laughs at the stock market excitement. 'Coal is real. Paper is paper.'",                   cls: "good" },
      { turn: 26, text: "The mine cut shifts. Angus is working three days a week.",                                        cls: "bad" },
      { turn: 38, text: "Angus's credit union savings are still intact. He's better off than most.",                      cls: "good" },
      { turn: 48, text: "The mine is shut completely. Angus lives on his savings and odd jobs.",                           cls: "bad" },
      { turn: 60, text: "Angus joined the relief camp to supplement his savings. Not proud — but practical.",             cls: "bad" },
      { turn: 84, text: "The mine reopened at half capacity. Angus was one of the first called back.",                    cls: "good" },
      { turn: 120, text: "Angus's savings from before the Depression helped him weather the worst. He's rebuilding.",     cls: "good" },
      { turn: 140, text: "War demand for coal has the mine running full shifts again. Angus calls it a miracle.",         cls: "good" }
    ]
  },
  shopkeeper: {
    name: "Gilles Tremblay",
    occupation: "Competing Shopkeeper",
    story: "Gilles runs the hardware store two doors down on Saint-Laurent. He extended too much credit to customers in the good years.",
    events: [
      { turn: 10, text: "Gilles has extended $400 in credit to regular customers. He's confident they'll pay.",           cls: "bad" },
      { turn: 24, text: "Customers can't pay their tabs. Gilles is owed $600 he will never see.",                          cls: "bad" },
      { turn: 36, text: "Gilles closed his store on Saturdays to cut costs. Foot traffic is down 60%.",                   cls: "bad" },
      { turn: 48, text: "Gilles sold his delivery horse. 'I carry the boxes myself now,' he says.",                        cls: "bad" },
      { turn: 60, text: "Gilles's store survived — barely. He has stopped extending any credit.",                         cls: "good" },
      { turn: 84, text: "Gilles started selling second-hand goods alongside new merchandise. Business is picking up.",    cls: "good" },
      { turn: 108, text: "Gilles quietly bought the empty shop next door at Depression prices.",                           cls: "good" },
      { turn: 140, text: "War rationing has made Gilles's shop essential. He has a lineup every morning.",                cls: "good" }
    ]
  },
  dockworker: {
    name: "Patrick Finnegan",
    occupation: "Fellow Dockworker",
    story: "Patrick works the same pier as you. He spent his savings on a small fishing boat to earn extra income on weekends.",
    events: [
      { turn: 8,  text: "Patrick's fishing boat is paying off. He's making $15 extra a month.",                           cls: "good" },
      { turn: 22, text: "Dock work slowed after the crash. Patrick relies on fishing to make rent.",                       cls: "bad" },
      { turn: 30, text: "Pacific shipping is down 40%. Patrick works two days a week at the docks.",                      cls: "bad" },
      { turn: 42, text: "Patrick sold his fishing boat to pay rent. 'The sea will wait,' he says.",                        cls: "bad" },
      { turn: 55, text: "Patrick joined the On-to-Ottawa Trek protest. He was arrested briefly.",                         cls: "bad" },
      { turn: 72, text: "Patrick found steady work on a fish cannery crew. Lower pay but reliable.",                      cls: "good" },
      { turn: 108, text: "Pacific trade is recovering. Patrick is back at the docks full-time.",                          cls: "good" },
      { turn: 140, text: "War supply ships need crews. Patrick is working double shifts and earning well.",                cls: "good" }
    ]
  }
};


// ─────────────────────────────────────────────────────────────────────────
// HISTORICAL PHOTO DATABASE
//
// Photos are triggered on specific turns, matching key events in the game.
// Each photo shows as a full overlay (with caption + attribution) and then
// saves to a thumbnail gallery in the right-hand photo database panel.
//
// Fields:
//   turn        — game turn (0–143) when the photo appears
//   title       — short display title
//   year        — historical year
//   caption     — 1–2 sentence description for students
//   imageUrl    — Wikimedia Commons (or similar public-domain) URL
//   attribution — credit line (photographer, source, license)
// ─────────────────────────────────────────────────────────────────────────

const HISTORICAL_PHOTOS = [
  {
    turn: 10,
    title: "Bay Street, Toronto",
    year: 1928,
    caption: "By late 1928, Toronto's Bay Street was buzzing with speculation. Cars filled the roads, businesses were booming, and stock prices seemed to climb without end. Few imagined what was coming.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Toronto%2C_Bay_Street_looking_north_towards_City_Hall_%28I0026223%29.jpg",
    attribution: "Archives of Ontario, OGL-ON, via Wikimedia Commons"
  },
  {
    turn: 23,
    title: "Wall Street Crash — October 1929",
    year: 1929,
    caption: "Crowds gathered outside the New York Stock Exchange as panic selling wiped out billions in stock value. The crash sent shockwaves through Canadian markets within hours.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Crowds_gathering_outside_New_York_Stock_Exchange.jpg",
    attribution: "Associated Press, Public domain, via Wikimedia Commons"
  },
  {
    turn: 24,
    title: "Food Line in Toronto — 1930s",
    year: 1930,
    caption: "As the economy collapsed, food lines appeared across Canadian cities. Missions and charities struggled to feed the growing number of families who could no longer afford meals.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/ad/YongeStreetMission.jpg",
    attribution: "Yonge Street Mission, Public domain, via Wikimedia Commons"
  },
  {
    turn: 48,
    title: "Montreal Soup Kitchen — 1931",
    year: 1932,
    caption: "By 1932, one in four Canadians had no job. Men lined up at soup kitchens and relief offices in every major city. This was the darkest year of the Depression.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3f/MontrealSoupKitchen1931.jpg",
    attribution: "Public domain, via Wikimedia Commons"
  },
  {
    turn: 55,
    title: "The Bennett Buggy — 1935",
    year: 1932,
    caption: "Families who could no longer afford gasoline removed their car engines and hitched them to horses. These 'Bennett Buggies' — named mockingly after Prime Minister R.B. Bennett — became a bitter symbol of Depression poverty across the Prairies.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Bennett_buggy.jpg",
    attribution: "Glenbow Archives NA-3958-3, Public domain, via Wikimedia Commons"
  },
  {
    turn: 60,
    title: "Prime Minister R.B. Bennett",
    year: 1933,
    caption: "Prime Minister R.B. Bennett introduced reform legislation modelled on Roosevelt's New Deal. Critics said it was too little, too late — and Canadians blamed Bennett personally for the Depression's misery.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Richard_Bedford_Bennett.jpg",
    attribution: "Public domain, via Wikimedia Commons"
  },
  {
    turn: 72,
    title: "On-to-Ottawa Trek — 1935",
    year: 1935,
    caption: "Frustrated relief camp workers boarded freight trains heading to Ottawa to demand jobs and wages. The trek ended violently in Regina when police moved to stop the marchers.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/37/Kamloops_on_to_Ottawa.jpg",
    attribution: "Public domain, via Wikimedia Commons"
  },
  {
    turn: 84,
    title: "King Returns to Power — 1935",
    year: 1935,
    caption: "Mackenzie King's Liberals swept the 1935 election, replacing Bennett. King promised more relief and cautious recovery — but the Depression dragged on.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/48/WilliamLyonMackenzieKing.jpg",
    attribution: "Unknown author, Library and Archives Canada / C-027645, Public domain, via Wikimedia Commons"
  }
];


// ─────────────────────────────────────────────────────────────────────────
// REFLECTION_QUESTIONS
//
// One question fires at the end of each calendar year (every 12 turns).
// Questions escalate in difficulty — early ones are observational,
// later ones ask for analysis and connection to broader history.
//
// Each: { id, year, question, context }
//   context — a one-line prompt to help students frame their answer
// ─────────────────────────────────────────────────────────────────────────

const REFLECTION_QUESTIONS = [
  {
    id: "reflect_1928",
    year: 1928,
    question: "You have just completed your first year investing on Bay Street. What investment decisions did you make, and why did you make them?",
    context: "Think about what you bought, sold, or avoided — and what was going through your mind."
  },
  {
    id: "reflect_1929",
    year: 1929,
    question: "The Wall Street Crash happened in October 1929. Describe what it felt like to watch your investments change. What did you do in response, and do you think it was the right decision?",
    context: "There is no wrong answer here — focus on your reasoning."
  },
  {
    id: "reflect_1930",
    year: 1930,
    question: "Factories are closing and unemployment is rising across Canada. How has your household been affected so far? What has been the hardest part of managing your finances?",
    context: "Look at your Monthly Flow and Family Wellbeing meters — what do the numbers tell you about your situation?"
  },
  {
    id: "reflect_1931",
    year: 1931,
    question: "Banks are failing and the Dust Bowl is beginning on the Prairies. Why do you think an economic crisis in one part of the world — the United States — could cause so much damage in Canada?",
    context: "Think about trade, exports, and the connections between economies."
  },
  {
    id: "reflect_1932",
    year: 1932,
    question: "This is the darkest year of the Depression. One in four Canadians has no job. Compare your situation to your neighbour's. What decisions led to the difference between you?",
    context: "Look at the Neighbour panel — what choices did they make that you did not, or vice versa?"
  },
  {
    id: "reflect_1933",
    year: 1933,
    question: "Relief payments are small and irregular. Do you think the government is doing enough to help struggling Canadians? What more could it do — and who should pay for it?",
    context: "This is a question about values, not just economics. There is no single right answer."
  },
  {
    id: "reflect_1934",
    year: 1934,
    question: "You are now six years into the Depression. How has your strategy changed since 1928? What have you learned about risk, debt, and financial survival?",
    context: "Compare where you started to where you are now."
  },
  {
    id: "reflect_1935",
    year: 1935,
    question: "Mackenzie King's Liberals won the election promising more relief. Do you think government programs can solve an economic depression, or does recovery have to happen on its own? Use evidence from the game to support your answer.",
    context: "Think about what has actually helped your household — government aid, employment, your own investments?"
  },
  {
    id: "reflect_1936",
    year: 1936,
    question: "Markets are recovering and some workers are being rehired. Why do you think recovery is slow and uneven rather than sudden? Who benefits first from an economic recovery?",
    context: "Look at your stock prices and employment status — who is getting ahead and who is still struggling?"
  },
  {
    id: "reflect_1937",
    year: 1937,
    question: "A new recession has hit within the Depression. Economists say governments cut spending too early, which caused the downturn. What does this suggest about how governments should manage an economy during a crisis?",
    context: "Consider what happened to your investments and household this year compared to last."
  },
  {
    id: "reflect_1938",
    year: 1938,
    question: "You have now survived ten years of economic hardship. What is the most important lesson you take from this experience — about money, risk, government, or Canadian history?",
    context: "This can be personal, historical, or both."
  },
  {
    id: "reflect_1939",
    year: 1939,
    question: "Canada declared war on Germany in September 1939, which ended the Depression almost immediately as war industries hired workers. Is war ever an acceptable solution to an economic crisis? What does this tell us about how depressions end?",
    context: "Think carefully — there is real complexity here."
  }
];
