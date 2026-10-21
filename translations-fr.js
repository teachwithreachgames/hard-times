/* ═══════════════════════════════════════════════════════════════════════════
 *  HARD TIMES — Canada 1928  |  translations-fr.js
 *
 *  French (passé composé) translations for French Immersion students.
 *  Loaded BEFORE game-data.js and game-logic.js.
 *
 *  Usage:  t("key")  returns the string in the current language.
 *          Current language stored in  window.LANG  ("en" or "fr").
 * ═══════════════════════════════════════════════════════════════════════════ */

window.LANG = "en";

const TR = {

  // ─────────────────────────────────────────────────────────────────────────
  // INTRO SCREEN
  // ─────────────────────────────────────────────────────────────────────────
  intro_eyebrow:       { en: "A Canadian Historical Simulation · Grade 10", fr: "Une simulation historique canadienne · 10e année" },
  intro_title:         { en: "Hard Times", fr: "Temps difficiles" },
  intro_subtitle:      { en: "Canada · 1928 – 1939", fr: "Canada · 1928 – 1939" },
  intro_body:          {
    en: `The year is 1928. Stocks are rising, wages are steady, and the future looks bright. <em>It won't last.</em><br><br>In October 1929, the Wall Street Crash will shatter the North American economy. Factories will close. Farms will fail. One in four Canadians will be out of work. The Dirty Thirties have arrived.<br><br>You will live through it — as a real Canadian, in a real place, with real bills to pay. Invest wisely, protect your household, and try to survive twelve years of the Great Depression.`,
    fr: `Nous sommes en 1928. Les actions montent, les salaires sont stables et l'avenir semble radieux. <em>Ça ne durera pas.</em><br><br>En octobre 1929, le krach de Wall Street va anéantir l'économie nord-américaine. Des usines vont fermer. Des fermes vont échouer. Un Canadien sur quatre se retrouvera sans emploi. Les sales années trente sont arrivées.<br><br>Vous allez vivre cette période — en tant que vrai Canadien, dans un vrai lieu, avec de vraies factures à payer. Investissez prudemment, protégez votre foyer et essayez de survivre douze années de la Grande Dépression.`
  },
  intro_name_label:    { en: "Your Name", fr: "Votre nom" },
  intro_name_hint:     { en: "Required — your name will appear on your reflection journal.", fr: "Obligatoire — votre nom apparaîtra sur votre journal de réflexion." },
  intro_name_placeholder: { en: "First and last name", fr: "Prénom et nom de famille" },
  btn_begin:           { en: "Begin", fr: "Commencer" },
  intro_footer:        { en: "Based on Canadian economic history · 1928–1939", fr: "Basé sur l'histoire économique canadienne · 1928–1939" },

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTER SELECTION
  // ─────────────────────────────────────────────────────────────────────────
  char_title:          { en: "Choose Your Story", fr: "Choisissez votre histoire" },
  char_subtitle:       { en: "The Depression touched every corner of Canada — who will you be?", fr: "La Dépression a touché chaque coin du Canada — qui serez-vous ?" },
  char_footer_hint:    { en: "Click a character to select, then continue →", fr: "Cliquez sur un personnage, puis continuez →" },
  btn_back:            { en: "← Back", fr: "← Retour" },
  btn_continue:        { en: "Continue →", fr: "Continuer →" },
  starting_cash:       { en: "Starting Cash", fr: "Argent initial" },
  monthly_wage:        { en: "Monthly Wage", fr: "Salaire mensuel" },
  food_rent:           { en: "Food + Rent", fr: "Nourriture + Loyer" },
  prairie_badge:       { en: "⚠ Prairie Drought Risk", fr: "⚠ Risque de sécheresse des Prairies" },
  diff_hard:           { en: "Hard", fr: "Difficile" },
  diff_medium:         { en: "Medium", fr: "Moyen" },
  diff_easy:           { en: "Easy", fr: "Facile" },

  // Character occupations & descriptions (names stay English)
  occ_farmer:          { en: "Wheat Farmer", fr: "Cultivateur de blé" },
  prov_farmer:         { en: "Saskatchewan", fr: "Saskatchewan" },
  desc_farmer:         { en: "Prairie drought events fire from 1931 onward: dust storms, crop failures, and collapsing wheat prices will hammer your income hard. Relief comes slowly — and never enough.", fr: "Des événements de sécheresse frappent les Prairies à partir de 1931 : tempêtes de poussière, récoltes perdues et effondrement du prix du blé vont durement affecter vos revenus. L'aide arrive lentement — et ne suffit jamais." },
  story_farmer:        { en: "You broke prairie sod a decade ago and finally own your quarter-section outright. The rains have been good and wheat prices are rising. You've scraped together $800 to try your luck on Bay Street.", fr: "Vous avez défriché la prairie il y a dix ans et vous êtes enfin propriétaire de votre quart de section. Les pluies ont été bonnes et le prix du blé monte. Vous avez réuni 800 $ pour tenter votre chance à Bay Street." },

  occ_worker:          { en: "Steel Factory Worker", fr: "Ouvrière d'aciérie" },
  prov_worker:         { en: "Hamilton, Ontario", fr: "Hamilton, Ontario" },
  desc_worker:         { en: "Factory layoffs closely follow market downturns. When the index falls sharply, your job is at risk. Relief is available but meagre — watch your monthly flow carefully.", fr: "Les mises à pied suivent de près les baisses du marché. Quand l'indice chute, votre emploi est en danger. L'aide existe mais reste maigre — surveillez bien votre flux mensuel." },
  story_worker:        { en: "Six years on the foundry floor at Dominion Steel. Steady wages, steady hours — and a small savings account your foreman says you should put to work on Bay Street before someone else does.", fr: "Six ans à la fonderie de Dominion Steel. Un salaire stable, des heures régulières — et un petit compte d'épargne que votre contremaître vous conseille d'investir à Bay Street avant que d'autres ne le fassent." },

  occ_miner:           { en: "Coal Miner", fr: "Mineur de charbon" },
  prov_miner:          { en: "Cape Breton, N.S.", fr: "Cap-Breton, N.-É." },
  desc_miner:          { en: "Your wages are the highest of any character — but coal mines were among the first to shut down in a downturn. A big crash can mean a sudden, prolonged layoff.", fr: "Votre salaire est le plus élevé de tous les personnages — mais les mines de charbon ont été parmi les premières à fermer lors d'un ralentissement. Un grand krach peut signifier une mise à pied soudaine et prolongée." },
  story_miner:         { en: "Dominion Coal pays well enough — but every man underground knows one bad quarter can shutter a mine for months. You've saved a little more than most, just in case. The bay air is damp and the work is dangerous.", fr: "Dominion Coal paie assez bien — mais chaque mineur sait qu'un mauvais trimestre peut fermer la mine pendant des mois. Vous avez économisé un peu plus que la plupart, au cas où. L'air marin est humide et le travail est dangereux." },

  occ_shopkeeper:      { en: "General Store Owner", fr: "Propriétaire de magasin général" },
  prov_shopkeeper:     { en: "Montreal, Quebec", fr: "Montréal, Québec" },
  desc_shopkeeper:     { en: "You start with the most cash and a stable (if modest) income. Your expenses are the highest of any character — Montreal rent is no joke — but you are less exposed to sudden layoffs.", fr: "Vous commencez avec le plus d'argent et un revenu stable (quoique modeste). Vos dépenses sont les plus élevées — le loyer à Montréal n'est pas une blague — mais vous êtes moins exposé aux mises à pied soudaines." },
  story_shopkeeper:    { en: "Your shop on Saint-Laurent has served the neighbourhood for fifteen years. Business is brisk in 1928 — and a broker at the Board of Trade has been suggesting the stock market for months. Perhaps it is time.", fr: "Votre magasin sur Saint-Laurent sert le quartier depuis quinze ans. Les affaires vont bien en 1928 — et un courtier de la Bourse vous suggère d'investir depuis des mois. Peut-être est-il temps." },

  occ_dockworker:      { en: "Dockworker", fr: "Débardeur" },
  prov_dockworker:     { en: "Vancouver, B.C.", fr: "Vancouver, C.-B." },
  desc_dockworker:     { en: "Pacific trade links Vancouver to American and Asian markets. When U.S. demand collapses after 1929, your dockwork dries up fast. Good wages while they last.", fr: "Le commerce du Pacifique relie Vancouver aux marchés américains et asiatiques. Quand la demande américaine s'effondre après 1929, le travail au port disparaît vite. De bons salaires tant qu'ils durent." },
  story_dockworker:    { en: "The docks pay well when the ships are running. Vancouver is booming on Pacific trade — lumber, fish, grain. A few men you work with have made real money on the Vancouver Stock Exchange. Maybe you can too.", fr: "Les quais paient bien quand les navires circulent. Vancouver prospère grâce au commerce du Pacifique — bois, poisson, céréales. Quelques collègues ont fait fortune à la Bourse de Vancouver. Peut-être que vous le pouvez aussi." },

  // ─────────────────────────────────────────────────────────────────────────
  // RULES SCREEN
  // ─────────────────────────────────────────────────────────────────────────
  rules_title:         { en: "How to Survive the Dirty Thirties", fr: "Comment survivre aux sales années trente" },
  rules_date:          { en: "Investor's Guide · January 1928", fr: "Guide de l'investisseur · Janvier 1928" },
  rules_col1_heading:  { en: "The Market", fr: "Le marché" },
  rules_col2_heading:  { en: "Your Household", fr: "Votre foyer" },
  rules_col3_heading:  { en: "Survival", fr: "Survie" },
  btn_start_game:      { en: "Start the Game →", fr: "Commencer le jeu →" },
  rules_your_char:     { en: "Your Character", fr: "Votre personnage" },
  rules_cash_label:    { en: "Cash", fr: "Argent" },
  rules_wage_label:    { en: "Wages", fr: "Salaire" },
  rules_expenses_label:{ en: "Expenses", fr: "Dépenses" },

  // ─────────────────────────────────────────────────────────────────────────
  // GAME SCREEN — HEADER & SIDEBAR
  // ─────────────────────────────────────────────────────────────────────────
  masthead_title:      { en: "Hard Times", fr: "Temps difficiles" },
  masthead_sub:        { en: "A Canadian Historical Simulation", fr: "Une simulation historique canadienne" },
  market_index:        { en: "Market Index", fr: "Indice du marché" },

  // Sidebar panels
  panel_ledger:        { en: "Your Ledger", fr: "Votre bilan" },
  cash_on_hand:        { en: "Cash on Hand", fr: "Argent disponible" },
  portfolio_value:     { en: "Portfolio Value", fr: "Valeur du portefeuille" },
  net_worth:           { en: "NET WORTH", fr: "VALEUR NETTE" },

  panel_margin:        { en: "Margin Account", fr: "Compte sur marge" },
  debt_owed:           { en: "Debt Owed", fr: "Dette" },
  interest_rate:       { en: "Interest Rate", fr: "Taux d'intérêt" },
  interest_due:        { en: "Interest Due", fr: "Intérêts dus" },
  portfolio_debt:      { en: "Portfolio / Debt", fr: "Portefeuille / Dette" },
  margin_call_risk:    { en: "⚠ Margin Call Risk!", fr: "⚠ Risque d'appel de marge !" },
  borrow_label:        { en: "Borrow from broker", fr: "Emprunter au courtier" },
  repay_label:         { en: "Repay broker", fr: "Rembourser le courtier" },
  btn_borrow:          { en: "BORROW", fr: "EMPRUNTER" },
  btn_repay:           { en: "REPAY", fr: "REMBOURSER" },

  panel_family:        { en: "Family Wellbeing", fr: "Bien-être familial" },
  meter_health:        { en: "Health", fr: "Santé" },
  meter_food:          { en: "Food", fr: "Nourriture" },
  meter_morale:        { en: "Morale", fr: "Moral" },

  panel_neighbour:     { en: "Your Neighbour", fr: "Votre voisin" },

  panel_household:     { en: "Household", fr: "Ménage" },
  employment:          { en: "Employment", fr: "Emploi" },
  employed:            { en: "Employed", fr: "Employé(e)" },
  unemployed:          { en: "Unemployed", fr: "Sans emploi" },
  monthly_wages:       { en: "Monthly Wages", fr: "Salaire mensuel" },
  food:                { en: "Food", fr: "Nourriture" },
  rent:                { en: "Rent", fr: "Loyer" },
  monthly_flow:        { en: "MONTHLY FLOW", fr: "FLUX MENSUEL" },

  // Market board
  market_board_title:  { en: "Toronto & New York Stock Exchange — Market Board", fr: "Bourse de Toronto et de New York — Tableau du marché" },
  col_company:         { en: "Company", fr: "Entreprise" },
  col_sector:          { en: "Sector / Risk", fr: "Secteur / Risque" },
  col_tip:             { en: "Why it matters", fr: "Pourquoi c'est important" },
  col_price:           { en: "Price", fr: "Prix" },
  col_change:          { en: "% Chg", fr: "% Var" },
  col_held:            { en: "Held", fr: "Détenu" },
  col_trade:           { en: "Trade", fr: "Échange" },
  btn_buy:             { en: "BUY", fr: "ACHETER" },
  btn_sell:            { en: "SELL", fr: "VENDRE" },

  edu_did_you_know:    { en: "📖 Did You Know?", fr: "📖 Le saviez-vous ?" },
  edu_dismiss:         { en: "I understand ✓", fr: "Je comprends ✓" },
  next_turn:           { en: "Advance to Next Month", fr: "Passer au mois suivant" },
  spacebar_hint:       { en: "[ Space ]", fr: "[ Espace ]" },

  // Photo panel
  photo_panel_title:   { en: "📷 Historical Photos", fr: "📷 Photos historiques" },
  photo_empty:         { en: "Historical photographs will appear here as you progress through the Depression.", fr: "Des photographies historiques apparaîtront ici au fil de votre progression dans la Dépression." },

  // ─────────────────────────────────────────────────────────────────────────
  // CRASH OVERLAY
  // ─────────────────────────────────────────────────────────────────────────
  crash_subhead:       { en: "Extra! Extra! — October 29, 1929", fr: "Édition spéciale ! — 29 octobre 1929" },
  crash_headline:      { en: "Black Tuesday — Wall Street Collapses!", fr: "Mardi noir — Wall Street s'effondre !" },
  crash_body:          {
    en: "In a single day, billions of dollars in stock value vanished. Investors who had borrowed to buy shares were ruined instantly — their brokers demanded repayment on loans they could never cover. The panic spread north within hours. By evening, the Toronto Stock Exchange had fallen off a cliff.",
    fr: "En une seule journée, des milliards de dollars en valeur boursière ont disparu. Les investisseurs qui avaient emprunté pour acheter des actions ont été ruinés instantanément — leurs courtiers ont exigé le remboursement de prêts qu'ils ne pouvaient jamais couvrir. La panique s'est propagée vers le nord en quelques heures. En soirée, la Bourse de Toronto s'est effondrée."
  },
  crash_body2:         { en: "This is the moment that will define the next decade of your life.", fr: "C'est le moment qui va définir la prochaine décennie de votre vie." },
  crash_stat1_value:   { en: "−20%", fr: "−20 %" },
  crash_stat1_label:   { en: "Market in one day", fr: "Marché en un jour" },
  crash_stat2_value:   { en: "$14B", fr: "14 G$" },
  crash_stat2_label:   { en: "Wealth destroyed", fr: "Richesse détruite" },
  crash_stat3_value:   { en: "1 in 4", fr: "1 sur 4" },
  crash_stat3_label:   { en: "Canadians unemployed by 1932", fr: "Canadiens au chômage en 1932" },
  crash_dismiss:       { en: "I understand what just happened", fr: "Je comprends ce qui vient de se passer" },

  // ─────────────────────────────────────────────────────────────────────────
  // PHOTO OVERLAY
  // ─────────────────────────────────────────────────────────────────────────
  photo_continue:      { en: "Continue", fr: "Continuer" },

  // ─────────────────────────────────────────────────────────────────────────
  // GAME OVER / VICTORY
  // ─────────────────────────────────────────────────────────────────────────
  title_bankrupt:      { en: "Bankrupt!", fr: "Faillite !" },
  title_destitute:     { en: "Destitute!", fr: "Démuni(e) !" },
  title_survived:      { en: "You Survived!", fr: "Vous avez survécu !" },
  btn_play_again:      { en: "Play Again", fr: "Rejouer" },
  btn_new_char:        { en: "New Character", fr: "Nouveau personnage" },
  btn_download_journal:{ en: "Download Reflection Journal", fr: "Télécharger le journal de réflexion" },
  journal_hint:        { en: "Opens as a file → open in Chrome → Ctrl+P → Save as PDF", fr: "S'ouvre en fichier → ouvrir dans Chrome → Ctrl+P → Enregistrer en PDF" },

  // ─────────────────────────────────────────────────────────────────────────
  // HISTORICAL REFLECTION SCREEN
  // ─────────────────────────────────────────────────────────────────────────
  hist_title:          { en: "Complete Your Reflection Journal", fr: "Complétez votre journal de réflexion" },
  hist_write_here:     { en: "Write your answer here...", fr: "Écrivez votre réponse ici..." },
  hist_min_chars:      { en: "characters minimum", fr: "caractères minimum" },
  hist_ready:          { en: "— ready", fr: "— prêt" },
  hist_save_next:      { en: "Save & Next →", fr: "Sauvegarder & Suivant →" },
  hist_save_continue:  { en: "Save & Continue →", fr: "Sauvegarder & Continuer →" },
  hist_journal_note:   { en: "Your answers will appear in your downloadable Reflection Journal.", fr: "Vos réponses apparaîtront dans votre journal de réflexion téléchargeable." },

  // ─────────────────────────────────────────────────────────────────────────
  // COMPLETION SCREEN
  // ─────────────────────────────────────────────────────────────────────────
  complete_title:      { en: "Reflection Journal Complete", fr: "Journal de réflexion terminé" },
  complete_instructions: {
    en: "Your journal is ready to download. Open it in Chrome, then press <strong>Ctrl+P</strong> and choose <strong>Save as PDF</strong> to submit via Google Classroom.",
    fr: "Votre journal est prêt à télécharger. Ouvrez-le dans Chrome, puis appuyez sur <strong>Ctrl+P</strong> et choisissez <strong>Enregistrer en PDF</strong> pour le soumettre via Google Classroom."
  },

  // ─────────────────────────────────────────────────────────────────────────
  // MODAL SYSTEM
  // ─────────────────────────────────────────────────────────────────────────
  modal_decision:      { en: "A Decision Must Be Made", fr: "Une décision s'impose" },
  modal_must_choose:   { en: "You must choose before continuing.", fr: "Vous devez choisir avant de continuer." },
  modal_hot_tip:       { en: "Word on the Street", fr: "Rumeur de la rue" },
  modal_hot_tip_flag:  { en: "Hot Tip", fr: "Conseil" },
  modal_noted:         { en: "Noted — Continue", fr: "Noté — Continuer" },
  modal_report_title:  { en: "Year {year} in Review", fr: "Bilan de l'année {year}" },
  modal_report_kicker: { en: "Annual Report — December {year}", fr: "Rapport annuel — Décembre {year}" },
  modal_report_headline:{ en: "How Did {year} Treat You?", fr: "Comment s'est passée l'année {year} ?" },
  modal_begin_year:    { en: "Begin {year}", fr: "Commencer {year}" },
  modal_report_nw:     { en: "Net Worth", fr: "Valeur nette" },
  modal_report_change: { en: "Change This Year", fr: "Variation cette année" },
  modal_report_cash:   { en: "Cash on Hand", fr: "Argent disponible" },
  modal_report_employed:{ en: "Employed", fr: "Emploi" },
  modal_report_debt:   { en: "Debt", fr: "Dette" },
  modal_report_index:  { en: "Market Index", fr: "Indice du marché" },
  modal_report_none:   { en: "None", fr: "Aucune" },
  modal_report_yes:    { en: "Yes", fr: "Oui" },
  modal_report_no:     { en: "No", fr: "Non" },
  modal_reflect_title: { en: "{year} — Reflection", fr: "{year} — Réflexion" },
  modal_reflect_note:  { en: "Your answer will appear in your Reflection Journal.", fr: "Votre réponse apparaîtra dans votre journal de réflexion." },
  modal_reflect_save:  { en: "Save & Continue", fr: "Sauvegarder & Continuer" },
  modal_alert_understand: { en: "I understand", fr: "Je comprends" },

  // ─────────────────────────────────────────────────────────────────────────
  // ERA LABELS
  // ─────────────────────────────────────────────────────────────────────────
  era_boom:            { en: "The Boom Years", fr: "Les années d'abondance" },
  era_crash:           { en: "The Crash — 1929", fr: "Le krach — 1929" },
  era_depression:      { en: "The Great Depression", fr: "La Grande Dépression" },
  era_recovery:        { en: "Slow Recovery", fr: "Reprise lente" },
  era_war:             { en: "War Approaches — 1939", fr: "La guerre approche — 1939" },

  // ─────────────────────────────────────────────────────────────────────────
  // STOCK SECTORS & TIPS
  // ─────────────────────────────────────────────────────────────────────────
  sector_CPR:   { en: "Railway · 0.9×", fr: "Chemin de fer · 0,9×" },
  sector_BMO:   { en: "Canadian Bank · 0.5×", fr: "Banque canadienne · 0,5×" },
  sector_RBC:   { en: "Canadian Bank · 0.55×", fr: "Banque canadienne · 0,55×" },
  sector_HBC:   { en: "Retail · 1.0×", fr: "Commerce de détail · 1,0×" },
  sector_GM:    { en: "U.S. Industrial · 1.2×", fr: "Industriel américain · 1,2×" },
  sector_USS:   { en: "U.S. Industrial · 1.3×", fr: "Industriel américain · 1,3×" },
  sector_RCA:   { en: "Speculative · 1.8×", fr: "Spéculatif · 1,8×" },

  tip_CPR:      { en: "Built Canada coast-to-coast. Passenger and freight revenue falls when trade collapses — but railways always come back.", fr: "A bâti le Canada d'un océan à l'autre. Les revenus de passagers et de fret chutent quand le commerce s'effondre — mais les chemins de fer reviennent toujours." },
  tip_BMO:      { en: "Canada's oldest bank. Conservative lending makes it safer than most — but no bank is immune to a full collapse.", fr: "La plus ancienne banque du Canada. Des prêts conservateurs la rendent plus sûre que la plupart — mais aucune banque n'est à l'abri d'un effondrement total." },
  tip_RBC:      { en: "Solid and cautious. Holds its value better than industrial stocks in a downturn. Low reward, low risk.", fr: "Solide et prudente. Conserve sa valeur mieux que les actions industrielles en période de ralentissement. Faible rendement, faible risque." },
  tip_HBC:      { en: "Sells goods Canadians buy every day — but when families have nothing, they stop buying. Moves with the market.", fr: "Vend des produits que les Canadiens achètent chaque jour — mais quand les familles n'ont plus rien, elles arrêtent d'acheter. Suit le marché." },
  tip_GM:       { en: "Cars are a luxury. When jobs disappear, nobody buys a new automobile. Climbs fast, falls fast.", fr: "Les voitures sont un luxe. Quand les emplois disparaissent, personne n'achète une nouvelle automobile. Monte vite, descend vite." },
  tip_USS:      { en: "Steel demand tracks construction and manufacturing. When factories close, orders dry up almost overnight.", fr: "La demande d'acier suit la construction et la fabrication. Quand les usines ferment, les commandes disparaissent presque du jour au lendemain." },
  tip_RCA:      { en: "Pure speculation — radio is exciting but RCA has almost no real earnings. Enormous gains in booms, catastrophic in busts.", fr: "Pure spéculation — la radio est passionnante mais RCA n'a presque aucun revenu réel. D'énormes gains en période de boom, catastrophiques en période de crise." },

  // ─────────────────────────────────────────────────────────────────────────
  // HEADLINES
  // ─────────────────────────────────────────────────────────────────────────
  headline_0:   { en: "The year 1928 opens with cautious optimism on Bay Street.", fr: "L'année 1928 s'ouvre avec un optimisme prudent à Bay Street." },
  headline_6:   { en: "Summer boom: speculation reaches fever pitch across North America.", fr: "Boom estival : la spéculation atteint son paroxysme en Amérique du Nord." },
  headline_12:  { en: "New Year 1929 — prosperity seems endless. Investors double down.", fr: "Nouvel An 1929 — la prospérité semble sans fin. Les investisseurs doublent la mise." },
  headline_18:  { en: "Summer 1929: markets hit all-time highs. The good times roll.", fr: "Été 1929 : les marchés atteignent des sommets historiques. Les bons temps continuent." },
  headline_20:  { en: "September 1929: cracks appear. Some cautious investors quietly sell.", fr: "Septembre 1929 : des fissures apparaissent. Certains investisseurs prudents vendent discrètement." },
  headline_21:  { en: "BLACK TUESDAY — Wall Street collapses! Panic selling grips Toronto.", fr: "MARDI NOIR — Wall Street s'effondre ! La vente de panique saisit Toronto." },
  headline_22:  { en: "Shock spreads north. Canadian exchanges in freefall.", fr: "Le choc se propage vers le nord. Les bourses canadiennes en chute libre." },
  headline_23:  { en: "Banks restrict credit. Unemployment surges. Breadlines form in Montreal.", fr: "Les banques restreignent le crédit. Le chômage explose. Des files d'attente se forment à Montréal." },
  headline_24:  { en: "1930 dawns in misery. Dust storms begin ravaging the Prairies.", fr: "1930 commence dans la misère. Les tempêtes de poussière ravagent les Prairies." },
  headline_30:  { en: "PM Bennett promises relief — promises ring hollow in the streets.", fr: "Le PM Bennett promet de l'aide — ses promesses sonnent creux dans les rues." },
  headline_36:  { en: "1931: Banks fail across the continent. Savings wiped out overnight.", fr: "1931 : Des banques font faillite partout sur le continent. Les épargnes anéanties du jour au lendemain." },
  headline_42:  { en: "Relief camps open in British Columbia. Thousands queue for food.", fr: "Des camps de secours ouvrent en Colombie-Britannique. Des milliers de personnes font la queue pour de la nourriture." },
  headline_48:  { en: "1932: The darkest year. One in four Canadians is unemployed.", fr: "1932 : L'année la plus sombre. Un Canadien sur quatre est au chômage." },
  headline_59:  { en: "Markets appear to have found a floor. Is the worst over?", fr: "Les marchés semblent avoir trouvé un plancher. Le pire est-il passé ?" },
  headline_60:  { en: "1933: Tentative recovery. Roosevelt's New Deal offers hope.", fr: "1933 : Reprise prudente. Le New Deal de Roosevelt offre de l'espoir." },
  headline_84:  { en: "1935: PM King returns to power, promising Canadian relief programs.", fr: "1935 : Le PM King revient au pouvoir, promettant des programmes d'aide canadiens." },
  headline_96:  { en: "1936: The strongest recovery year yet. Bay Street cautiously optimistic.", fr: "1936 : La meilleure année de reprise jusqu'ici. Bay Street est prudemment optimiste." },
  headline_108: { en: "1937: A recession within the Depression strikes. Markets stumble again.", fr: "1937 : Une récession dans la Dépression frappe. Les marchés trébuchent à nouveau." },
  headline_120: { en: "1938: A slow crawl upward. The worst feels behind us.", fr: "1938 : Une lente remontée. Le pire semble derrière nous." },
  headline_132: { en: "1939: War clouds gather over Europe. Uncertainty grips markets.", fr: "1939 : Des nuages de guerre s'accumulent au-dessus de l'Europe. L'incertitude saisit les marchés." },
  headline_140: { en: "September 1939: Canada declares war on Germany. War industry stirs.", fr: "Septembre 1939 : Le Canada déclare la guerre à l'Allemagne. L'industrie de guerre se met en marche." },
  headline_143: { en: "December 1939: The Depression era draws to a close. A new world awaits.", fr: "Décembre 1939 : L'ère de la Dépression touche à sa fin. Un nouveau monde attend." },

  // ─────────────────────────────────────────────────────────────────────────
  // LIFE EVENTS
  // ─────────────────────────────────────────────────────────────────────────
  event_laid_off:           { en: "Your employer lays off workers — you have lost your job. No wages this month.", fr: "Votre employeur a mis des travailleurs à pied — vous avez perdu votre emploi. Aucun salaire ce mois-ci." },
  event_factory_wage_cut:   { en: "Factory cuts wages — your monthly pay is reduced by $10.", fr: "L'usine a réduit les salaires — votre paie mensuelle a diminué de 10 $." },
  event_mine_wage_cut:      { en: "The coal company slashes pay — mine wages drop across the region.", fr: "La compagnie de charbon a réduit les salaires — les paies des mines baissent dans toute la région." },
  event_food_up:            { en: "Food prices rise at the local market — groceries cost $3 more per month.", fr: "Les prix alimentaires ont augmenté au marché local — l'épicerie coûte 3 $ de plus par mois." },
  event_rent_up:            { en: "Your landlord raises rent — another $5 a month out of your pocket.", fr: "Votre propriétaire a augmenté le loyer — 5 $ de plus par mois de votre poche." },
  event_municipal_relief:   { en: "Municipal relief payment received — a small mercy from the city council: $10.", fr: "Paiement d'aide municipale reçu — une petite grâce du conseil municipal : 10 $." },
  event_bennett_relief:     { en: "Bennett government issues relief order — $15 distributed to struggling families.", fr: "Le gouvernement Bennett a émis un ordre de secours — 15 $ distribués aux familles en difficulté." },
  event_rehired:            { en: "A local factory reopens — you find work again at reduced wages ($35/month).", fr: "Une usine locale a rouvert — vous avez retrouvé du travail à un salaire réduit (35 $/mois)." },
  event_wages_restored:     { en: "Production picks up — your employer restores part of the wage cut.", fr: "La production a repris — votre employeur a rétabli une partie de la réduction de salaire." },
  event_food_down:          { en: "Food prices ease slightly — deflation brings rare relief at the grocery store.", fr: "Les prix alimentaires ont légèrement baissé — la déflation apporte un rare soulagement à l'épicerie." },
  event_dust_storm:         { en: "A black blizzard rolls across the Prairies — topsoil stripped, livestock choking. You spend $25 trying to save the animals and what's left of the crop.", fr: "Un blizzard noir a balayé les Prairies — la terre arable arrachée, le bétail suffoquant. Vous avez dépensé 25 $ pour essayer de sauver les animaux et ce qui reste de la récolte." },
  event_wheat_collapse:     { en: "Wheat prices collapse on the Chicago exchange — your crop income drops by $10 this month.", fr: "Les prix du blé se sont effondrés à la bourse de Chicago — vos revenus de récolte ont baissé de 10 $ ce mois-ci." },
  event_crop_failure:       { en: "Drought withers your crop before harvest. No farm income this month — just prayers for rain.", fr: "La sécheresse a flétri votre récolte avant la moisson. Aucun revenu agricole ce mois-ci — juste des prières pour la pluie." },
  event_bennett_buggy:      { en: "No money for petrol. You've hitched horses to the old Ford. Neighbours call it a 'Bennett Buggy.'", fr: "Plus d'argent pour l'essence. Vous avez attelé des chevaux au vieux Ford. Les voisins l'appellent un « Bennett Buggy »." },
  event_grasshopper:        { en: "Grasshoppers devour what the drought didn't take. The crops are gone. You lose $20 in feed and repairs.", fr: "Les sauterelles ont dévoré ce que la sécheresse n'avait pas pris. Les récoltes sont perdues. Vous avez perdu 20 $ en nourriture animale et réparations." },
  event_prairie_relief:     { en: "Province distributes seed grain and food relief to struggling farm families. You receive $22 in aid.", fr: "La province a distribué des semences et de l'aide alimentaire aux familles agricoles en difficulté. Vous avez reçu 22 $ d'aide." },
  event_good_harvest:       { en: "A rare good year — your wheat harvest beats expectations. Farm income rises by $10 this month.", fr: "Une rare bonne année — votre récolte de blé a dépassé les attentes. Les revenus agricoles ont augmenté de 10 $ ce mois-ci." },
  event_returned_farm:      { en: "Rains return and you plant again — you are back to farming after the long drought.", fr: "Les pluies sont revenues et vous avez planté à nouveau — vous êtes de retour à la ferme après la longue sécheresse." },

  // ─────────────────────────────────────────────────────────────────────────
  // EDUCATIONAL NOTES
  // ─────────────────────────────────────────────────────────────────────────
  edu_3:    { en: "Speculation means buying something hoping to sell it later at a profit — not because it has real value. In the 1920s, millions of Canadians and Americans speculated wildly on stocks.", fr: "La spéculation signifie acheter quelque chose en espérant le revendre plus tard avec profit — pas parce que cela a une vraie valeur. Dans les années 1920, des millions de Canadiens et d'Américains ont spéculé follement sur les actions." },
  edu_8:    { en: "The 'Roaring Twenties' created a dangerous bubble: stock prices kept rising because everyone expected them to keep rising — not because companies were actually worth more.", fr: "Les « Années folles » ont créé une bulle dangereuse : les prix des actions continuaient de monter parce que tout le monde s'attendait à ce qu'ils continuent de monter — pas parce que les entreprises valaient vraiment plus." },
  edu_15:   { en: "Buying 'on margin' means borrowing money to buy stocks, putting up only a fraction of the price yourself. In the 1920s you could buy $10 of stock with just $1 of your own money.", fr: "Acheter « sur marge » signifie emprunter de l'argent pour acheter des actions, en ne payant qu'une fraction du prix soi-même. Dans les années 1920, on pouvait acheter 10 $ d'actions avec seulement 1 $ de son propre argent." },
  edu_20:   { en: "A stock market crash happens when investors panic and all try to sell at once. Each sale pushes prices lower, causing more panic — a chain reaction no one can stop.", fr: "Un krach boursier se produit quand les investisseurs paniquent et essaient tous de vendre en même temps. Chaque vente pousse les prix vers le bas, causant plus de panique — une réaction en chaîne que personne ne peut arrêter." },
  edu_21:   { en: "The Wall Street Crash of October 1929 ('Black Tuesday') wiped out billions of dollars in wealth within days. Investors who had borrowed to buy stocks were suddenly ruined and could not repay their loans.", fr: "Le krach de Wall Street d'octobre 1929 (« Mardi noir ») a anéanti des milliards de dollars de richesse en quelques jours. Les investisseurs qui avaient emprunté pour acheter des actions ont été soudainement ruinés et ne pouvaient pas rembourser leurs prêts." },
  edu_22:   { en: "Canada sent most of its exports — wheat, timber, minerals — to the United States. When American demand collapsed after the crash, Canadian factories and farms lost their biggest customer overnight.", fr: "Le Canada envoyait la plupart de ses exportations — blé, bois, minéraux — aux États-Unis. Quand la demande américaine s'est effondrée après le krach, les usines et les fermes canadiennes ont perdu leur plus gros client du jour au lendemain." },
  edu_24:   { en: "When companies lose value on the stock market, they cut costs by laying off workers. Fewer jobs meant families had less to spend, so businesses lost even more — a downward spiral.", fr: "Quand les entreprises perdent de la valeur en bourse, elles réduisent les coûts en licenciant des travailleurs. Moins d'emplois signifiait que les familles avaient moins à dépenser, donc les entreprises perdaient encore plus — une spirale descendante." },
  edu_30:   { en: "PM R.B. Bennett's Conservative government initially refused large-scale relief, believing the Depression would fix itself. His response was seen as cold and out of touch with ordinary Canadians.", fr: "Le gouvernement conservateur du PM R.B. Bennett a d'abord refusé l'aide à grande échelle, croyant que la Dépression se résoudrait d'elle-même. Sa réponse a été perçue comme froide et déconnectée des Canadiens ordinaires." },
  edu_36:   { en: "Many banks had also invested in the stock market. When the market crashed, some banks failed entirely, wiping out the savings accounts of ordinary Canadians who had done nothing wrong.", fr: "Beaucoup de banques avaient aussi investi en bourse. Quand le marché s'est effondré, certaines banques ont complètement fait faillite, anéantissant les comptes d'épargne de Canadiens ordinaires qui n'avaient rien fait de mal." },
  edu_42:   { en: "The federal government opened relief camps for unemployed single men, paying 20 cents a day for hard labour. Critics called them 'slave camps' — they became a flashpoint for protests.", fr: "Le gouvernement fédéral a ouvert des camps de secours pour les hommes célibataires au chômage, payant 20 cents par jour pour un travail pénible. Les critiques les ont appelés « camps d'esclaves » — ils sont devenus un point d'éclair pour les protestations." },
  edu_48:   { en: "By 1932, about 1 in 4 Canadians had no job — the highest unemployment rate in Canadian history. On the Prairies, a severe drought hit at the same time, destroying crops and creating the 'Dust Bowl.'", fr: "En 1932, environ 1 Canadien sur 4 n'avait pas d'emploi — le taux de chômage le plus élevé de l'histoire canadienne. Dans les Prairies, une sécheresse sévère a frappé en même temps, détruisant les récoltes et créant le « Dust Bowl »." },
  edu_60:   { en: "In the U.S., President Roosevelt's 'New Deal' used government spending to create jobs and support the poor. Canada was slower to act — PM Bennett introduced limited reforms only in 1935.", fr: "Aux États-Unis, le « New Deal » du président Roosevelt a utilisé les dépenses gouvernementales pour créer des emplois et soutenir les pauvres. Le Canada a été plus lent à agir — le PM Bennett n'a introduit des réformes limitées qu'en 1935." },
  edu_84:   { en: "Mackenzie King's Liberals won the 1935 election promising more relief. The government slowly expanded programs, but payments remained very small — often less than what families needed to survive.", fr: "Les libéraux de Mackenzie King ont gagné l'élection de 1935 en promettant plus d'aide. Le gouvernement a lentement élargi les programmes, mais les paiements sont restés très petits — souvent moins que ce dont les familles avaient besoin pour survivre." },
  edu_108:  { en: "Governments cut spending in 1937, thinking the Depression was over. This triggered a new recession — proof that the economy was still fragile and needed continued support.", fr: "Les gouvernements ont réduit les dépenses en 1937, pensant que la Dépression était terminée. Cela a déclenché une nouvelle récession — preuve que l'économie était encore fragile et avait besoin d'un soutien continu." },
  edu_140:  { en: "Canada's declaration of war in September 1939 ended the Depression almost immediately. War factories needed workers, raw materials, and production — unemployment vanished within two years.", fr: "La déclaration de guerre du Canada en septembre 1939 a mis fin à la Dépression presque immédiatement. Les usines de guerre avaient besoin de travailleurs, de matières premières et de production — le chômage a disparu en deux ans." },

  // Condition-based edu notes
  edu_first_borrow:    { en: "You borrowed 'on margin.' Remember: if prices fall, you still owe this money plus 5% interest per month — exactly the trap that ruined thousands of investors in 1929.", fr: "Vous avez emprunté « sur marge ». Rappelez-vous : si les prix baissent, vous devez toujours cet argent plus 5 % d'intérêt par mois — exactement le piège qui a ruiné des milliers d'investisseurs en 1929." },
  edu_crash_chain:     { en: "Markets fall sharply when panic sets in. Investors who borrowed to buy stocks must sell quickly to repay loans — their forced selling drives prices down even further.", fr: "Les marchés chutent fortement quand la panique s'installe. Les investisseurs qui ont emprunté pour acheter des actions doivent vendre rapidement pour rembourser leurs prêts — leurs ventes forcées font baisser les prix encore plus." },
  edu_first_unemployed:{ en: "Unemployment spread through Canada like a wave: fewer orders → layoffs → families with less to spend → fewer sales → more layoffs. This feedback loop is called a 'deflationary spiral.'", fr: "Le chômage s'est propagé à travers le Canada comme une vague : moins de commandes → des mises à pied → des familles avec moins à dépenser → moins de ventes → plus de mises à pied. Cette boucle de rétroaction s'appelle une « spirale déflationniste »." },
  edu_margin_call:     { en: "A 'margin call' means your broker demands repayment because your stocks have lost value. In 1929, brokers issued thousands of margin calls in a single day, forcing mass selling.", fr: "Un « appel de marge » signifie que votre courtier exige un remboursement parce que vos actions ont perdu de la valeur. En 1929, les courtiers ont émis des milliers d'appels de marge en une seule journée, forçant des ventes massives." },
  edu_forced_sale:     { en: "When your cash runs out, survival forces you to sell investments at whatever price the market offers — often at the worst possible moment. This is the desperation that defined Depression life.", fr: "Quand votre argent est épuisé, la survie vous force à vendre vos investissements au prix que le marché offre — souvent au pire moment possible. C'est le désespoir qui a défini la vie pendant la Dépression." },

  // ─────────────────────────────────────────────────────────────────────────
  // DECISION PROMPTS
  // ─────────────────────────────────────────────────────────────────────────
  decision_broker_title:    { en: "A Broker's Advice", fr: "Le conseil d'un courtier" },
  decision_broker_kicker:   { en: "Investment Decision", fr: "Décision d'investissement" },
  decision_broker_body:     { en: "Your broker pulls you aside at the exchange. 'Everyone is buying on margin,' he says with a grin. 'Put up $100 of your own money and I'll lend you $400 more. You could control $500 in stock — a sure thing in this market.' His office is full of men doing exactly that.", fr: "Votre courtier vous prend à part à la bourse. « Tout le monde achète sur marge », dit-il avec un sourire. « Mettez 100 $ de votre argent et je vous prêterai 400 $ de plus. Vous pourriez contrôler 500 $ en actions — une affaire sûre dans ce marché. » Son bureau est plein d'hommes qui font exactement cela." },
  decision_broker_a_label:  { en: "Option A — Take the margin loan", fr: "Option A — Accepter le prêt sur marge" },
  decision_broker_a_text:   { en: "You borrow $400 from the broker and invest the full $500 in stocks. Your potential gains are huge — but so is your debt.", fr: "Vous empruntez 400 $ au courtier et investissez la totalité des 500 $ en actions. Vos gains potentiels sont énormes — mais votre dette aussi." },
  decision_broker_b_label:  { en: "Option B — Invest only what you have", fr: "Option B — Investir seulement ce que vous avez" },
  decision_broker_b_text:   { en: "You invest $100 of your own savings and walk away from the loan. Slower gains — but no debt hanging over you.", fr: "Vous investissez 100 $ de vos propres économies et refusez le prêt. Des gains plus lents — mais aucune dette au-dessus de votre tête." },
  decision_broker_c_label:  { en: "Option C — Keep your cash, watch the market", fr: "Option C — Garder votre argent, observer le marché" },
  decision_broker_c_text:   { en: "You keep your money in your pocket and watch others speculate. Your savings are safe — for now.", fr: "Vous gardez votre argent dans votre poche et regardez les autres spéculer. Vos économies sont en sécurité — pour l'instant." },

  decision_warning_title:   { en: "A Warning Sign", fr: "Un signe d'avertissement" },
  decision_warning_kicker:  { en: "October 1929 Approaches", fr: "Octobre 1929 approche" },
  decision_warning_body:    { en: "An older investor you respect takes you aside. 'I've seen this before,' he says quietly. 'Prices have gone up too fast. Too many people are borrowing to buy. When the music stops, it stops suddenly.' He has been quietly selling his shares all summer. What do you do?", fr: "Un investisseur plus âgé que vous respectez vous prend à part. « J'ai déjà vu ça », dit-il calmement. « Les prix ont monté trop vite. Trop de gens empruntent pour acheter. Quand la musique s'arrête, elle s'arrête soudainement. » Il a discrètement vendu ses actions tout l'été. Que faites-vous ?" },
  decision_warning_a_label: { en: "Option A — Sell half your stocks now", fr: "Option A — Vendre la moitié de vos actions maintenant" },
  decision_warning_a_text:  { en: "You take his advice and sell half your portfolio for cash. If he's right, you'll be protected. If he's wrong, you'll miss some gains.", fr: "Vous suivez son conseil et vendez la moitié de votre portefeuille pour de l'argent comptant. S'il a raison, vous serez protégé. S'il a tort, vous manquerez certains gains." },
  decision_warning_b_label: { en: "Option B — Sell everything and hold cash", fr: "Option B — Tout vendre et garder l'argent" },
  decision_warning_b_text:  { en: "You liquidate your entire portfolio. You'll miss any last gains — but you'll be safe if the crash comes.", fr: "Vous liquidez tout votre portefeuille. Vous manquerez les derniers gains — mais vous serez en sécurité si le krach arrive." },
  decision_warning_c_label: { en: "Option C — Stay fully invested", fr: "Option C — Rester entièrement investi" },
  decision_warning_c_text:  { en: "The market has been rising for years. You dismiss the warning and stay put — the good times will continue.", fr: "Le marché monte depuis des années. Vous ignorez l'avertissement et restez en place — les bons temps vont continuer." },

  decision_relief_title:    { en: "The Relief Camp", fr: "Le camp de secours" },
  decision_relief_kicker:   { en: "Federal Relief Program", fr: "Programme fédéral de secours" },
  decision_relief_body:     { en: "The federal government is offering work in a relief camp — hard labour clearing bush and building roads for 20 cents a day and a bunk. It is not much, but it is steady. Your neighbour took the offer last month. You have been unemployed for six months.", fr: "Le gouvernement fédéral offre du travail dans un camp de secours — du travail pénible à défricher la brousse et construire des routes pour 20 cents par jour et un lit. Ce n'est pas beaucoup, mais c'est stable. Votre voisin a accepté l'offre le mois dernier. Vous êtes au chômage depuis six mois." },
  decision_relief_a_label:  { en: "Option A — Join the relief camp", fr: "Option A — Rejoindre le camp de secours" },
  decision_relief_a_text:   { en: "You take the government work. The pay is terrible but it covers your food. You receive $4 per month for the duration of unemployment.", fr: "Vous acceptez le travail du gouvernement. La paie est terrible mais elle couvre votre nourriture. Vous recevez 4 $ par mois pour la durée du chômage." },
  decision_relief_b_label:  { en: "Option B — Keep looking for real work", fr: "Option B — Continuer à chercher un vrai emploi" },
  decision_relief_b_text:   { en: "You refuse the relief camp and keep searching for proper employment. Your pride is intact — but your savings keep draining.", fr: "Vous refusez le camp de secours et continuez à chercher un emploi convenable. Votre fierté est intacte — mais vos économies continuent de fondre." },

  decision_bank_title:      { en: "A Run on the Bank", fr: "Une ruée bancaire" },
  decision_bank_kicker:     { en: "Banking Crisis", fr: "Crise bancaire" },
  decision_bank_body:       { en: "Word spreads down the street: the local savings bank is in trouble. A crowd is gathering outside, desperate to withdraw their money before it closes. You have $50 in a savings account there. The lineup stretches around the block.", fr: "La nouvelle se répand dans la rue : la caisse d'épargne locale est en difficulté. Une foule se rassemble dehors, désespérée de retirer son argent avant la fermeture. Vous avez 50 $ dans un compte d'épargne là-bas. La file d'attente fait le tour du pâté de maisons." },
  decision_bank_a_label:    { en: "Option A — Rush to withdraw your savings", fr: "Option A — Se précipiter pour retirer vos économies" },
  decision_bank_a_text:     { en: "You join the crowd and manage to get your $50 out before the doors close. The bank fails the next day.", fr: "Vous rejoignez la foule et réussissez à retirer vos 50 $ avant la fermeture des portes. La banque fait faillite le lendemain." },
  decision_bank_b_label:    { en: "Option B — Trust the bank and stay home", fr: "Option B — Faire confiance à la banque et rester chez vous" },
  decision_bank_b_text:     { en: "You decide the panic is overblown. Unfortunately, the bank fails. Your $50 is gone.", fr: "Vous décidez que la panique est exagérée. Malheureusement, la banque fait faillite. Vos 50 $ sont perdus." },

  decision_house_title:     { en: "Sell the House?", fr: "Vendre la maison ?" },
  decision_house_kicker:    { en: "A Difficult Choice", fr: "Un choix difficile" },
  decision_house_body:      { en: "A buyer has appeared with a cash offer for your property — $300, well below what it was worth in 1928. But you are behind on expenses and your debt is mounting. If you sell now, you'll have cash to survive. But you'll have nothing to your name.", fr: "Un acheteur s'est présenté avec une offre en argent comptant pour votre propriété — 300 $, bien en dessous de sa valeur de 1928. Mais vous êtes en retard sur vos dépenses et votre dette augmente. Si vous vendez maintenant, vous aurez de l'argent pour survivre. Mais vous n'aurez plus rien à votre nom." },
  decision_house_a_label:   { en: "Option A — Sell and take the cash", fr: "Option A — Vendre et prendre l'argent" },
  decision_house_a_text:    { en: "You sell. It hurts. But $300 in hand is better than foreclosure.", fr: "Vous vendez. Ça fait mal. Mais 300 $ en main, c'est mieux que la saisie." },
  decision_house_b_label:   { en: "Option B — Hold on and find another way", fr: "Option B — Tenir bon et trouver une autre solution" },
  decision_house_b_text:    { en: "You refuse the offer. Your property — whatever it is worth now — remains yours.", fr: "Vous refusez l'offre. Votre propriété — quelle que soit sa valeur maintenant — reste la vôtre." },

  // ─────────────────────────────────────────────────────────────────────────
  // HOT TIPS
  // ─────────────────────────────────────────────────────────────────────────
  tip_rca_title:       { en: "Radio is the Future!", fr: "La radio, c'est l'avenir !" },
  tip_rca_body:        { en: "A well-dressed man at the exchange leans over: 'RCA is going through the roof. Radio is the future — every home will have one. Get in now before the price doubles again.'", fr: "Un homme bien habillé à la bourse se penche vers vous : « RCA monte en flèche. La radio, c'est l'avenir — chaque foyer en aura une. Achetez maintenant avant que le prix ne double encore. »" },
  tip_rca_source:      { en: "Overheard at the Toronto Stock Exchange, 1928", fr: "Entendu à la Bourse de Toronto, 1928" },

  tip_banks_title:     { en: "Banks Are Solid as Rock", fr: "Les banques sont solides comme le roc" },
  tip_banks_body:      { en: "Your bank manager assures you over the counter: 'The Canadian banks are the safest in the world. Conservative lending, government backing. Put your savings in bank shares — you cannot go wrong.'", fr: "Votre directeur de banque vous assure au comptoir : « Les banques canadiennes sont les plus sûres au monde. Des prêts conservateurs, un soutien gouvernemental. Placez vos économies en actions bancaires — vous ne pouvez pas vous tromper. »" },
  tip_banks_source:    { en: "Bank of Montreal branch, Spring 1929", fr: "Succursale de la Banque de Montréal, printemps 1929" },

  tip_sell_title:      { en: "Something Feels Wrong", fr: "Quelque chose ne va pas" },
  tip_sell_body:       { en: "A retired businessman who survived the Panic of 1907 sits beside you at the barbershop. 'When the shoeshine boy starts giving you stock tips,' he says, 'it is time to sell. I sold everything last week.'", fr: "Un homme d'affaires retraité qui a survécu à la Panique de 1907 s'assoit à côté de vous chez le barbier. « Quand le cireur de chaussures commence à vous donner des conseils boursiers », dit-il, « il est temps de vendre. J'ai tout vendu la semaine dernière. »" },
  tip_sell_source:     { en: "Barbershop conversation, September 1929", fr: "Conversation chez le barbier, septembre 1929" },

  tip_gm_title:        { en: "Trouble at the Factory", fr: "Des problèmes à l'usine" },
  tip_gm_body:         { en: "A factory foreman you know pulls you aside: 'GM is cutting shifts. I've seen the orders — they're down 40%. I wouldn't hold those shares if I were you.'", fr: "Un contremaître d'usine que vous connaissez vous prend à part : « GM réduit les quarts de travail. J'ai vu les commandes — elles ont baissé de 40 %. Je ne garderais pas ces actions si j'étais vous. »" },
  tip_gm_source:       { en: "Foundry worker, Hamilton, 1930", fr: "Ouvrier de fonderie, Hamilton, 1930" },

  tip_buy_low_title:   { en: "Buy When There's Blood in the Streets", fr: "Acheter quand il y a du sang dans les rues" },
  tip_buy_low_body:    { en: "A wealthy merchant who seems untouched by the Depression tells you: 'The secret is to buy when everyone else is selling. Look at these prices — they cannot go lower. This is the buying opportunity of a lifetime.'", fr: "Un riche marchand qui semble épargné par la Dépression vous dit : « Le secret est d'acheter quand tout le monde vend. Regardez ces prix — ils ne peuvent pas descendre plus bas. C'est l'occasion d'achat d'une vie. »" },
  tip_buy_low_source:  { en: "Montreal businessman, 1932", fr: "Homme d'affaires montréalais, 1932" },

  tip_cpr_title:       { en: "The Railway Always Runs", fr: "Le chemin de fer roule toujours" },
  tip_cpr_body:        { en: "An old-timer with weathered hands tells you at the diner: 'People said the same in 1907 and 1893. The CPR always comes back. It built this country. Buy it and hold it — ten years from now you'll thank me.'", fr: "Un vieux routier aux mains usées vous dit au restaurant : « Les gens disaient la même chose en 1907 et 1893. Le CPR revient toujours. Il a construit ce pays. Achetez-le et gardez-le — dans dix ans, vous me remercierez. »" },
  tip_cpr_source:      { en: "Retired railway worker, 1931", fr: "Cheminot retraité, 1931" },

  tip_war_title:       { en: "War Is Coming — and With It, Work", fr: "La guerre arrive — et avec elle, du travail" },
  tip_war_body:        { en: "A newspaper editor speaks plainly over lunch: 'Europe is heading for war. Steel, coal, munitions — Canadian industry will roar back to life. The Depression is nearly over for anyone paying attention.'", fr: "Un rédacteur de journal parle franchement au déjeuner : « L'Europe se dirige vers la guerre. Acier, charbon, munitions — l'industrie canadienne va reprendre vie. La Dépression est presque terminée pour quiconque fait attention. »" },
  tip_war_source:      { en: "Ottawa journalist, Spring 1939", fr: "Journaliste d'Ottawa, printemps 1939" },

  // ─────────────────────────────────────────────────────────────────────────
  // NPC NEIGHBOURS
  // ─────────────────────────────────────────────────────────────────────────
  npc_farmer_occ:      { en: "Neighbouring Wheat Farmer", fr: "Cultivateur de blé voisin" },
  npc_farmer_story:    { en: "Viktor farms the quarter-section next to yours. He borrowed heavily in 1927 to buy more land and a new thresher.", fr: "Viktor cultive le quart de section à côté du vôtre. Il a beaucoup emprunté en 1927 pour acheter plus de terres et une nouvelle batteuse." },
  npc_farmer_10:       { en: "Viktor borrowed $600 more to buy extra seed. 'The prices will hold,' he says.", fr: "Viktor a emprunté 600 $ de plus pour acheter des semences supplémentaires. « Les prix vont tenir », dit-il." },
  npc_farmer_22:       { en: "Viktor is stunned by the crash news. He has $800 in margin debt.", fr: "Viktor est abasourdi par les nouvelles du krach. Il a 800 $ de dette sur marge." },
  npc_farmer_30:       { en: "Viktor's wheat brought half what it did last year. He can't cover his loans.", fr: "Le blé de Viktor a rapporté moitié moins que l'an dernier. Il ne peut pas couvrir ses prêts." },
  npc_farmer_42:       { en: "Viktor lost his thresher to the bank. He is borrowing yours.", fr: "Viktor a perdu sa batteuse au profit de la banque. Il emprunte la vôtre." },
  npc_farmer_55:       { en: "Viktor and his family are on provincial relief. They eat government rations.", fr: "Viktor et sa famille sont à l'aide provinciale. Ils mangent des rations du gouvernement." },
  npc_farmer_72:       { en: "Viktor's family has left for British Columbia. The farm sits empty.", fr: "La famille de Viktor est partie en Colombie-Britannique. La ferme est vide." },
  npc_farmer_96:       { en: "Word comes that Viktor found work in a Vancouver cannery. He sends money home.", fr: "On apprend que Viktor a trouvé du travail dans une conserverie de Vancouver. Il envoie de l'argent à la maison." },
  npc_farmer_132:      { en: "A letter arrives: Viktor is working in a munitions factory. He sounds hopeful for the first time.", fr: "Une lettre arrive : Viktor travaille dans une usine de munitions. Il semble optimiste pour la première fois." },

  npc_worker_occ:      { en: "Fellow Foundry Worker", fr: "Collègue de fonderie" },
  npc_worker_story:    { en: "Stanley works the same shift as you at Dominion Steel. He put all his savings into General Motors shares in 1928.", fr: "Stanley travaille au même quart que vous chez Dominion Steel. Il a mis toutes ses économies dans des actions de General Motors en 1928." },
  npc_worker_8:        { en: "Stanley's GM shares are up 30%. He's bought more on margin. 'Easy money,' he laughs.", fr: "Les actions GM de Stanley ont monté de 30 %. Il en a acheté plus sur marge. « De l'argent facile », rit-il." },
  npc_worker_22:       { en: "Stanley got a margin call. He's lost most of what he put in.", fr: "Stanley a reçu un appel de marge. Il a perdu la plupart de ce qu'il avait investi." },
  npc_worker_28:       { en: "Stanley was laid off last week. He has no savings left.", fr: "Stanley a été mis à pied la semaine dernière. Il n'a plus d'économies." },
  npc_worker_36:       { en: "Stanley is on relief. He stood in line for four hours for a bag of flour.", fr: "Stanley est à l'aide sociale. Il a fait la queue pendant quatre heures pour un sac de farine." },
  npc_worker_50:       { en: "Stanley's wife has taken in laundry to keep the family fed.", fr: "La femme de Stanley a pris de la lessive à faire pour nourrir la famille." },
  npc_worker_72:       { en: "Stanley found part-time work at a garage. 'Better than nothing,' he says.", fr: "Stanley a trouvé un travail à temps partiel dans un garage. « Mieux que rien », dit-il." },
  npc_worker_96:       { en: "The foundry rehired Stanley at lower wages. He's grateful just to be back.", fr: "La fonderie a réembauché Stanley à un salaire réduit. Il est reconnaissant d'être de retour." },
  npc_worker_140:      { en: "Stanley got a war-production contract job. Full wages again, for the first time in a decade.", fr: "Stanley a obtenu un emploi de contrat de production de guerre. Un plein salaire à nouveau, pour la première fois en dix ans." },

  npc_miner_occ:       { en: "Fellow Coal Miner", fr: "Collègue mineur de charbon" },
  npc_miner_story:     { en: "Angus has worked Dominion Coal for twenty years. He never trusted the stock market — he put his savings in a credit union.", fr: "Angus travaille chez Dominion Coal depuis vingt ans. Il n'a jamais fait confiance à la bourse — il a mis ses économies dans une caisse populaire." },
  npc_miner_12:        { en: "Angus laughs at the stock market excitement. 'Coal is real. Paper is paper.'", fr: "Angus rit de l'excitation boursière. « Le charbon est réel. Le papier, c'est du papier. »" },
  npc_miner_26:        { en: "The mine cut shifts. Angus is working three days a week.", fr: "La mine a réduit les quarts. Angus travaille trois jours par semaine." },
  npc_miner_38:        { en: "Angus's credit union savings are still intact. He's better off than most.", fr: "Les économies d'Angus à la caisse populaire sont encore intactes. Il s'en sort mieux que la plupart." },
  npc_miner_48:        { en: "The mine is shut completely. Angus lives on his savings and odd jobs.", fr: "La mine est complètement fermée. Angus vit de ses économies et de petits boulots." },
  npc_miner_60:        { en: "Angus joined the relief camp to supplement his savings. Not proud — but practical.", fr: "Angus a rejoint le camp de secours pour compléter ses économies. Pas fier — mais pratique." },
  npc_miner_84:        { en: "The mine reopened at half capacity. Angus was one of the first called back.", fr: "La mine a rouvert à moitié de sa capacité. Angus a été parmi les premiers rappelés." },
  npc_miner_120:       { en: "Angus's savings from before the Depression helped him weather the worst. He's rebuilding.", fr: "Les économies d'Angus d'avant la Dépression l'ont aidé à traverser le pire. Il se reconstruit." },
  npc_miner_140:       { en: "War demand for coal has the mine running full shifts again. Angus calls it a miracle.", fr: "La demande de charbon pour la guerre a remis la mine en plein régime. Angus appelle ça un miracle." },

  npc_shopkeeper_occ:  { en: "Competing Shopkeeper", fr: "Commerçant concurrent" },
  npc_shopkeeper_story:{ en: "Gilles runs the hardware store two doors down on Saint-Laurent. He extended too much credit to customers in the good years.", fr: "Gilles tient la quincaillerie deux portes plus loin sur Saint-Laurent. Il a trop fait crédit à ses clients pendant les bonnes années." },
  npc_shopkeeper_10:   { en: "Gilles has extended $400 in credit to regular customers. He's confident they'll pay.", fr: "Gilles a accordé 400 $ de crédit à ses clients réguliers. Il est confiant qu'ils paieront." },
  npc_shopkeeper_24:   { en: "Customers can't pay their tabs. Gilles is owed $600 he will never see.", fr: "Les clients ne peuvent pas payer leurs dettes. Gilles est dû 600 $ qu'il ne verra jamais." },
  npc_shopkeeper_36:   { en: "Gilles closed his store on Saturdays to cut costs. Foot traffic is down 60%.", fr: "Gilles a fermé son magasin le samedi pour réduire les coûts. L'achalandage a baissé de 60 %." },
  npc_shopkeeper_48:   { en: "Gilles sold his delivery horse. 'I carry the boxes myself now,' he says.", fr: "Gilles a vendu son cheval de livraison. « Je porte les boîtes moi-même maintenant », dit-il." },
  npc_shopkeeper_60:   { en: "Gilles's store survived — barely. He has stopped extending any credit.", fr: "Le magasin de Gilles a survécu — de justesse. Il a arrêté d'accorder tout crédit." },
  npc_shopkeeper_84:   { en: "Gilles started selling second-hand goods alongside new merchandise. Business is picking up.", fr: "Gilles a commencé à vendre des articles d'occasion à côté de la nouvelle marchandise. Les affaires reprennent." },
  npc_shopkeeper_108:  { en: "Gilles quietly bought the empty shop next door at Depression prices.", fr: "Gilles a discrètement acheté le magasin vide d'à côté aux prix de la Dépression." },
  npc_shopkeeper_140:  { en: "War rationing has made Gilles's shop essential. He has a lineup every morning.", fr: "Le rationnement de guerre a rendu le magasin de Gilles essentiel. Il a une file d'attente chaque matin." },

  npc_dockworker_occ:  { en: "Fellow Dockworker", fr: "Collègue débardeur" },
  npc_dockworker_story:{ en: "Patrick works the same pier as you. He spent his savings on a small fishing boat to earn extra income on weekends.", fr: "Patrick travaille au même quai que vous. Il a dépensé ses économies pour un petit bateau de pêche afin de gagner un revenu supplémentaire les fins de semaine." },
  npc_dockworker_8:    { en: "Patrick's fishing boat is paying off. He's making $15 extra a month.", fr: "Le bateau de pêche de Patrick rapporte. Il gagne 15 $ de plus par mois." },
  npc_dockworker_22:   { en: "Dock work slowed after the crash. Patrick relies on fishing to make rent.", fr: "Le travail au port a ralenti après le krach. Patrick compte sur la pêche pour payer le loyer." },
  npc_dockworker_30:   { en: "Pacific shipping is down 40%. Patrick works two days a week at the docks.", fr: "Le transport maritime du Pacifique a baissé de 40 %. Patrick travaille deux jours par semaine au port." },
  npc_dockworker_42:   { en: "Patrick sold his fishing boat to pay rent. 'The sea will wait,' he says.", fr: "Patrick a vendu son bateau de pêche pour payer le loyer. « La mer attendra », dit-il." },
  npc_dockworker_55:   { en: "Patrick joined the On-to-Ottawa Trek protest. He was arrested briefly.", fr: "Patrick a rejoint la Marche sur Ottawa. Il a été brièvement arrêté." },
  npc_dockworker_72:   { en: "Patrick found steady work on a fish cannery crew. Lower pay but reliable.", fr: "Patrick a trouvé un travail stable dans une conserverie de poisson. Un salaire plus bas mais fiable." },
  npc_dockworker_108:  { en: "Pacific trade is recovering. Patrick is back at the docks full-time.", fr: "Le commerce du Pacifique reprend. Patrick est de retour au port à temps plein." },
  npc_dockworker_140:  { en: "War supply ships need crews. Patrick is working double shifts and earning well.", fr: "Les navires de ravitaillement de guerre ont besoin d'équipages. Patrick fait des doubles quarts et gagne bien." },

  // ─────────────────────────────────────────────────────────────────────────
  // REFLECTION QUESTIONS
  // ─────────────────────────────────────────────────────────────────────────
  reflect_1928_q: { en: "You have just completed your first year investing on Bay Street. What investment decisions did you make, and why did you make them?", fr: "Vous venez de terminer votre première année d'investissement à Bay Street. Quelles décisions d'investissement avez-vous prises et pourquoi les avez-vous prises ?" },
  reflect_1928_c: { en: "Think about what you bought, sold, or avoided — and what was going through your mind.", fr: "Pensez à ce que vous avez acheté, vendu ou évité — et à ce qui vous passait par la tête." },

  reflect_1929_q: { en: "The Wall Street Crash happened in October 1929. Describe what it felt like to watch your investments change. What did you do in response, and do you think it was the right decision?", fr: "Le krach de Wall Street a eu lieu en octobre 1929. Décrivez ce que vous avez ressenti en regardant vos investissements changer. Qu'avez-vous fait en réponse et pensez-vous que c'était la bonne décision ?" },
  reflect_1929_c: { en: "There is no wrong answer here — focus on your reasoning.", fr: "Il n'y a pas de mauvaise réponse ici — concentrez-vous sur votre raisonnement." },

  reflect_1930_q: { en: "Factories are closing and unemployment is rising across Canada. How has your household been affected so far? What has been the hardest part of managing your finances?", fr: "Des usines ferment et le chômage augmente partout au Canada. Comment votre ménage a-t-il été affecté jusqu'ici ? Quelle a été la partie la plus difficile de la gestion de vos finances ?" },
  reflect_1930_c: { en: "Look at your Monthly Flow and Family Wellbeing meters — what do the numbers tell you about your situation?", fr: "Regardez vos indicateurs de flux mensuel et de bien-être familial — que vous disent les chiffres sur votre situation ?" },

  reflect_1931_q: { en: "Banks are failing and the Dust Bowl is beginning on the Prairies. Why do you think an economic crisis in one part of the world — the United States — could cause so much damage in Canada?", fr: "Des banques font faillite et le Dust Bowl commence dans les Prairies. Pourquoi pensez-vous qu'une crise économique dans une partie du monde — les États-Unis — a pu causer autant de dommages au Canada ?" },
  reflect_1931_c: { en: "Think about trade, exports, and the connections between economies.", fr: "Pensez au commerce, aux exportations et aux liens entre les économies." },

  reflect_1932_q: { en: "This is the darkest year of the Depression. One in four Canadians has no job. Compare your situation to your neighbour's. What decisions led to the difference between you?", fr: "C'est l'année la plus sombre de la Dépression. Un Canadien sur quatre n'a pas d'emploi. Comparez votre situation à celle de votre voisin. Quelles décisions ont mené à la différence entre vous ?" },
  reflect_1932_c: { en: "Look at the Neighbour panel — what choices did they make that you did not, or vice versa?", fr: "Regardez le panneau du voisin — quels choix ont-ils faits que vous n'avez pas faits, ou vice versa ?" },

  reflect_1933_q: { en: "Relief payments are small and irregular. Do you think the government is doing enough to help struggling Canadians? What more could it do — and who should pay for it?", fr: "Les paiements d'aide sont petits et irréguliers. Pensez-vous que le gouvernement en fait assez pour aider les Canadiens en difficulté ? Que pourrait-il faire de plus — et qui devrait payer ?" },
  reflect_1933_c: { en: "This is a question about values, not just economics. There is no single right answer.", fr: "C'est une question de valeurs, pas seulement d'économie. Il n'y a pas une seule bonne réponse." },

  reflect_1934_q: { en: "You are now six years into the Depression. How has your strategy changed since 1928? What have you learned about risk, debt, and financial survival?", fr: "Vous êtes maintenant à six ans dans la Dépression. Comment votre stratégie a-t-elle changé depuis 1928 ? Qu'avez-vous appris sur le risque, la dette et la survie financière ?" },
  reflect_1934_c: { en: "Compare where you started to where you are now.", fr: "Comparez où vous avez commencé à où vous en êtes maintenant." },

  reflect_1935_q: { en: "Mackenzie King's Liberals won the election promising more relief. Do you think government programs can solve an economic depression, or does recovery have to happen on its own? Use evidence from the game to support your answer.", fr: "Les libéraux de Mackenzie King ont gagné l'élection en promettant plus d'aide. Pensez-vous que les programmes gouvernementaux peuvent résoudre une dépression économique, ou la reprise doit-elle se faire d'elle-même ? Utilisez des preuves du jeu pour appuyer votre réponse." },
  reflect_1935_c: { en: "Think about what has actually helped your household — government aid, employment, your own investments?", fr: "Pensez à ce qui a réellement aidé votre ménage — l'aide gouvernementale, l'emploi, vos propres investissements ?" },

  reflect_1936_q: { en: "Markets are recovering and some workers are being rehired. Why do you think recovery is slow and uneven rather than sudden? Who benefits first from an economic recovery?", fr: "Les marchés reprennent et certains travailleurs sont réembauchés. Pourquoi pensez-vous que la reprise est lente et inégale plutôt que soudaine ? Qui bénéficie en premier d'une reprise économique ?" },
  reflect_1936_c: { en: "Look at your stock prices and employment status — who is getting ahead and who is still struggling?", fr: "Regardez le prix de vos actions et votre statut d'emploi — qui avance et qui est encore en difficulté ?" },

  reflect_1937_q: { en: "A new recession has hit within the Depression. Economists say governments cut spending too early, which caused the downturn. What does this suggest about how governments should manage an economy during a crisis?", fr: "Une nouvelle récession a frappé au sein de la Dépression. Les économistes disent que les gouvernements ont réduit les dépenses trop tôt, ce qui a causé le ralentissement. Qu'est-ce que cela suggère sur la façon dont les gouvernements devraient gérer une économie pendant une crise ?" },
  reflect_1937_c: { en: "Consider what happened to your investments and household this year compared to last.", fr: "Considérez ce qui est arrivé à vos investissements et à votre ménage cette année par rapport à l'année dernière." },

  reflect_1938_q: { en: "You have now survived ten years of economic hardship. What is the most important lesson you take from this experience — about money, risk, government, or Canadian history?", fr: "Vous avez maintenant survécu à dix ans de difficultés économiques. Quelle est la leçon la plus importante que vous retirez de cette expérience — sur l'argent, le risque, le gouvernement ou l'histoire canadienne ?" },
  reflect_1938_c: { en: "This can be personal, historical, or both.", fr: "Cela peut être personnel, historique, ou les deux." },

  reflect_1939_q: { en: "Canada declared war on Germany in September 1939, which ended the Depression almost immediately as war industries hired workers. Is war ever an acceptable solution to an economic crisis? What does this tell us about how depressions end?", fr: "Le Canada a déclaré la guerre à l'Allemagne en septembre 1939, ce qui a mis fin à la Dépression presque immédiatement alors que les industries de guerre embauchaient des travailleurs. La guerre est-elle une solution acceptable à une crise économique ? Qu'est-ce que cela nous dit sur la façon dont les dépressions se terminent ?" },
  reflect_1939_c: { en: "Think carefully — there is real complexity here.", fr: "Réfléchissez bien — il y a une vraie complexité ici." },

  // ─────────────────────────────────────────────────────────────────────────
  // HISTORICAL PHOTOS
  // ─────────────────────────────────────────────────────────────────────────
  photo_10_title:   { en: "Bay Street, Toronto", fr: "Rue Bay, Toronto" },
  photo_10_caption: { en: "By late 1928, Toronto's Bay Street was buzzing with speculation. Cars filled the roads, businesses were booming, and stock prices seemed to climb without end. Few imagined what was coming.", fr: "À la fin de 1928, la rue Bay de Toronto bourdonnait de spéculation. Les voitures remplissaient les routes, les affaires étaient florissantes et les prix des actions semblaient monter sans fin. Peu imaginaient ce qui allait arriver." },

  photo_23_title:   { en: "Wall Street Crash — October 1929", fr: "Krach de Wall Street — Octobre 1929" },
  photo_23_caption: { en: "Crowds gathered outside the New York Stock Exchange as panic selling wiped out billions in stock value. The crash sent shockwaves through Canadian markets within hours.", fr: "Des foules se sont rassemblées devant la Bourse de New York alors que la vente de panique anéantissait des milliards en valeur boursière. Le krach a envoyé des ondes de choc à travers les marchés canadiens en quelques heures." },

  photo_24_title:   { en: "Food Line in Toronto — 1930s", fr: "File d'attente pour la nourriture à Toronto — Années 1930" },
  photo_24_caption: { en: "As the economy collapsed, food lines appeared across Canadian cities. Missions and charities struggled to feed the growing number of families who could no longer afford meals.", fr: "Alors que l'économie s'effondrait, des files d'attente pour la nourriture sont apparues dans les villes canadiennes. Les missions et les organismes de bienfaisance peinaient à nourrir le nombre croissant de familles qui ne pouvaient plus se permettre de manger." },

  photo_48_title:   { en: "Montreal Soup Kitchen — 1931", fr: "Soupe populaire à Montréal — 1931" },
  photo_48_caption: { en: "By 1932, one in four Canadians had no job. Men lined up at soup kitchens and relief offices in every major city. This was the darkest year of the Depression.", fr: "En 1932, un Canadien sur quatre n'avait pas d'emploi. Des hommes faisaient la queue aux soupes populaires et aux bureaux de secours dans chaque grande ville. C'était l'année la plus sombre de la Dépression." },

  photo_55_title:   { en: "The Bennett Buggy — 1935", fr: "Le Bennett Buggy — 1935" },
  photo_55_caption: { en: "Families who could no longer afford gasoline removed their car engines and hitched them to horses. These 'Bennett Buggies' — named mockingly after Prime Minister R.B. Bennett — became a bitter symbol of Depression poverty across the Prairies.", fr: "Les familles qui ne pouvaient plus se permettre d'essence ont enlevé les moteurs de leurs voitures et les ont attelées à des chevaux. Ces « Bennett Buggies » — nommés avec moquerie d'après le premier ministre R.B. Bennett — sont devenus un symbole amer de la pauvreté de la Dépression dans les Prairies." },

  photo_60_title:   { en: "Prime Minister R.B. Bennett", fr: "Le premier ministre R.B. Bennett" },
  photo_60_caption: { en: "Prime Minister R.B. Bennett introduced reform legislation modelled on Roosevelt's New Deal. Critics said it was too little, too late — and Canadians blamed Bennett personally for the Depression's misery.", fr: "Le premier ministre R.B. Bennett a introduit des lois de réforme inspirées du New Deal de Roosevelt. Les critiques ont dit que c'était trop peu, trop tard — et les Canadiens ont personnellement blâmé Bennett pour la misère de la Dépression." },

  photo_72_title:   { en: "On-to-Ottawa Trek — 1935", fr: "Marche sur Ottawa — 1935" },
  photo_72_caption: { en: "Frustrated relief camp workers boarded freight trains heading to Ottawa to demand jobs and wages. The trek ended violently in Regina when police moved to stop the marchers.", fr: "Des travailleurs frustrés des camps de secours ont pris des trains de marchandises en direction d'Ottawa pour exiger des emplois et des salaires. La marche s'est terminée violemment à Regina quand la police a tenté d'arrêter les marcheurs." },

  photo_84_title:   { en: "King Returns to Power — 1935", fr: "King revient au pouvoir — 1935" },
  photo_84_caption: { en: "Mackenzie King's Liberals swept the 1935 election, replacing Bennett. King promised more relief and cautious recovery — but the Depression dragged on.", fr: "Les libéraux de Mackenzie King ont remporté l'élection de 1935, remplaçant Bennett. King a promis plus d'aide et une reprise prudente — mais la Dépression a continué." },

  // ─────────────────────────────────────────────────────────────────────────
  // FAMILY ALERTS
  // ─────────────────────────────────────────────────────────────────────────
  alert_food_title:   { en: "Your Family Is Going Hungry", fr: "Votre famille a faim" },
  alert_food_body:    { en: "Your children haven't eaten properly in weeks. You can see it in their faces. This is what happens when the money runs out — not abstract numbers on a ledger, but real hunger at your own table. Thousands of Canadian families are living this right now.", fr: "Vos enfants n'ont pas mangé correctement depuis des semaines. Vous pouvez le voir sur leurs visages. C'est ce qui arrive quand l'argent manque — pas des chiffres abstraits sur un bilan, mais une vraie faim à votre propre table. Des milliers de familles canadiennes vivent cela en ce moment." },

  alert_morale_title: { en: "Your Family Is Breaking Down", fr: "Votre famille s'effondre" },
  alert_morale_body:  { en: "The strain of poverty and unemployment is tearing at your household. Arguments, silence, despair. By 1933, Canadian social workers reported a wave of family breakdowns they had never seen before — not from personal failure, but from the relentless pressure of having nothing.", fr: "La tension de la pauvreté et du chômage déchire votre foyer. Des disputes, du silence, du désespoir. En 1933, les travailleurs sociaux canadiens ont signalé une vague d'effondrements familiaux qu'ils n'avaient jamais vue auparavant — pas par échec personnel, mais par la pression incessante de n'avoir rien." },

  alert_health_title: { en: "Your Family's Health Is Failing", fr: "La santé de votre famille décline" },
  alert_health_body:  { en: "Poor nutrition has taken its toll. A doctor's visit costs money you don't have. In the 1930s, Canadian hospitals saw a rise in malnutrition-related illness among children of unemployed families. What happens to a family that cannot afford to get well?", fr: "La mauvaise nutrition a eu des conséquences. Une visite chez le médecin coûte de l'argent que vous n'avez pas. Dans les années 1930, les hôpitaux canadiens ont constaté une augmentation des maladies liées à la malnutrition chez les enfants de familles au chômage. Que se passe-t-il pour une famille qui ne peut pas se permettre de guérir ?" },

  // ─────────────────────────────────────────────────────────────────────────
  // FAMILY STATUS TEXTS
  // ─────────────────────────────────────────────────────────────────────────
  family_managing:     { en: "Your family is managing well.", fr: "Votre famille se débrouille bien." },
  family_strain:       { en: "Money is tight. Your family feels the strain.", fr: "L'argent est serré. Votre famille ressent la pression." },
  family_struggling:   { en: "Your family is struggling. Food is scarce and morale is low.", fr: "Votre famille est en difficulté. La nourriture est rare et le moral est bas." },
  family_crisis:       { en: "Crisis: your family's health and wellbeing are in serious danger.", fr: "Crise : la santé et le bien-être de votre famille sont en grave danger." },

  // ─────────────────────────────────────────────────────────────────────────
  // REPORT CARD VERDICTS
  // ─────────────────────────────────────────────────────────────────────────
  verdict_1928:        { en: "The good times are still rolling on Bay Street. But economists are beginning to worry about rising debt and inflated prices. Are you prepared for what might come?", fr: "Les bons temps continuent à Bay Street. Mais les économistes commencent à s'inquiéter de la dette croissante et des prix gonflés. Êtes-vous préparé pour ce qui pourrait arriver ?" },
  verdict_1929_bad:    { en: "The Crash of October 1929 hit you hard. You are not alone — billions of dollars were wiped out across North America in days. What will you do differently in 1930?", fr: "Le krach d'octobre 1929 vous a durement frappé. Vous n'êtes pas seul — des milliards de dollars ont été anéantis en Amérique du Nord en quelques jours. Que ferez-vous différemment en 1930 ?" },
  verdict_1929_ok:     { en: "You survived the Crash of 1929 better than most. Many who borrowed on margin lost everything in October. The Depression is only beginning — stay cautious.", fr: "Vous avez survécu au krach de 1929 mieux que la plupart. Beaucoup de ceux qui avaient emprunté sur marge ont tout perdu en octobre. La Dépression ne fait que commencer — restez prudent." },
  verdict_dark_bad:    { en: "{year} was brutal. Unemployment is rising, prices are falling, and relief is scarce. One in four Canadians has no work. Every dollar you saved matters.", fr: "{year} a été brutal. Le chômage augmente, les prix baissent et l'aide est rare. Un Canadien sur quatre n'a pas de travail. Chaque dollar que vous avez économisé compte." },
  verdict_dark_ok:     { en: "You held together through {year} — remarkable given that this is one of the worst years in Canadian economic history. The Depression is not over yet.", fr: "Vous avez tenu bon pendant {year} — remarquable étant donné que c'est l'une des pires années de l'histoire économique canadienne. La Dépression n'est pas encore terminée." },
  verdict_mid:         { en: "Recovery is slow and uneven. The government is providing more relief, but it is never enough. Stay alert — another downturn could come at any time.", fr: "La reprise est lente et inégale. Le gouvernement offre plus d'aide, mais ce n'est jamais assez. Restez vigilant — un autre ralentissement pourrait survenir à tout moment." },
  verdict_late:        { en: "The worst seems to be behind you. Markets are recovering and employment is rising — but the gains are fragile. War clouds are gathering in Europe.", fr: "Le pire semble derrière vous. Les marchés reprennent et l'emploi augmente — mais les gains sont fragiles. Des nuages de guerre s'accumulent en Europe." },
  verdict_end:         { en: "Canada stands on the edge of war. The Depression is ending — not because the economy healed, but because war production needs every worker. A dark relief.", fr: "Le Canada est au bord de la guerre. La Dépression se termine — non pas parce que l'économie a guéri, mais parce que la production de guerre a besoin de chaque travailleur. Un soulagement sombre." },

  // ─────────────────────────────────────────────────────────────────────────
  // GAME LOG MESSAGES
  // ─────────────────────────────────────────────────────────────────────────
  log_game_start:      { en: "January 1928. You are {name}, a {occ} from {prov}.", fr: "Janvier 1928. Vous êtes {name}, {occ} de {prov}." },
  log_start_info:      { en: "You have ${cash} to invest. Monthly wages: ${wage}. Expenses: ${expenses}/month. The Crash is coming — but not yet.", fr: "Vous avez {cash} $ à investir. Salaire mensuel : {wage} $. Dépenses : {expenses} $/mois. Le krach approche — mais pas encore." },
  log_prairie_warning:  { en: "Prairie warning: drought and dust storms will affect your income from 1931 onward. Wheat prices are already fragile.", fr: "Avertissement des Prairies : la sécheresse et les tempêtes de poussière affecteront vos revenus à partir de 1931. Les prix du blé sont déjà fragiles." },
  log_month_closed:    { en: "Month closed — Net worth: ${nw} | Index: {idx} ({pct})", fr: "Mois terminé — Valeur nette : {nw} $ | Indice : {idx} ({pct})" },
  log_household:       { en: "Household: {wages} — food ${food} — rent ${rent} — net {sign}${net}.", fr: "Ménage : {wages} — nourriture {food} $ — loyer {rent} $ — net {sign}{net} $." },
  log_wages_desc:      { en: "wages ${amount}", fr: "salaire {amount} $" },
  log_no_wages:        { en: "no wages (unemployed)", fr: "aucun salaire (sans emploi)" },
  log_interest:        { en: "Interest charged: ${interest} on debt of ${debt}. New debt: ${newDebt}.", fr: "Intérêts facturés : {interest} $ sur une dette de {debt} $. Nouvelle dette : {newDebt} $." },
  log_margin_call:     { en: "MARGIN CALL! Portfolio covers only {pct}% of debt. Broker liquidates your holdings.", fr: "APPEL DE MARGE ! Le portefeuille ne couvre que {pct} % de la dette. Le courtier liquide vos avoirs." },
  log_forced_sale:     { en: "Forced sale: {qty} × {name} @ ${price} — ${repaid} repaid.", fr: "Vente forcée : {qty} × {name} à {price} $ — {repaid} $ remboursés." },
  log_assets_exhausted:{ en: "Assets exhausted. You still owe ${debt} to the broker.", fr: "Actifs épuisés. Vous devez encore {debt} $ au courtier." },
  log_survival_sale:   { en: "★ Cash depleted — sold {qty} × {name} @ ${price} to cover food and rent.", fr: "★ Argent épuisé — vendu {qty} × {name} à {price} $ pour couvrir la nourriture et le loyer." },
  log_bought:          { en: "Bought {qty} × {name} @ ${price} for ${total}.", fr: "Acheté {qty} × {name} à {price} $ pour {total} $." },
  log_sold:            { en: "Sold {qty} × {name} @ ${price} for ${total}.", fr: "Vendu {qty} × {name} à {price} $ pour {total} $." },
  log_borrowed:        { en: "Borrowed ${amount} on margin. Total debt: ${debt}.", fr: "Emprunté {amount} $ sur marge. Dette totale : {debt} $." },
  log_repaid:          { en: "Repaid ${amount}. Remaining debt: ${debt}.", fr: "Remboursé {amount} $. Dette restante : {debt} $." },

  // Bankrupt / Destitute messages
  msg_bankrupt:        { en: "By {date} you owe ${debt} with nothing left to cover it. Thousands of Canadians shared your fate. The Depression spared no one who borrowed too freely.", fr: "En {date}, vous devez {debt} $ sans rien pour le couvrir. Des milliers de Canadiens ont partagé votre sort. La Dépression n'a épargné personne qui avait emprunté trop librement." },
  msg_destitute:       { en: "You lost everything by {date} — but owed nothing. The Depression ground you to dust, as it did to so many across Canada.", fr: "Vous avez tout perdu en {date} — mais ne deviez rien. La Dépression vous a réduit en poussière, comme tant d'autres à travers le Canada." },
  msg_survived_great:  { en: "You survived the entire Depression decade with ${nw} — a true fortune. You bought low and kept your nerve when others panicked.", fr: "Vous avez survécu à toute la décennie de la Dépression avec {nw} $ — une vraie fortune. Vous avez acheté bas et gardé votre sang-froid quand les autres paniquaient." },
  msg_survived_ok:     { en: "You endured 1928–1939 with ${nw} to your name. You survived the Dirty Thirties — a feat millions of Canadians could not claim.", fr: "Vous avez enduré 1928–1939 avec {nw} $ à votre nom. Vous avez survécu aux sales années trente — un exploit que des millions de Canadiens ne pouvaient pas revendiquer." },
  msg_survived_poor:   { en: "You reached 1940 with only ${nw}. The Depression left its mark, as it did on all of Canada.", fr: "Vous avez atteint 1940 avec seulement {nw} $. La Dépression a laissé sa marque, comme elle l'a fait sur tout le Canada." },

  // Historical reflection framing
  hist_framing:          { en: "Your game ended in {endYear} ({outcome}). Answer this question as if you lived through the entire Depression — drawing on what you know happened to Canadians like {name} between {endYear} and {year}.", fr: "Votre jeu s'est terminé en {endYear} ({outcome}). Répondez à cette question comme si vous aviez vécu toute la Dépression — en vous appuyant sur ce que vous savez de ce qui est arrivé aux Canadiens comme {name} entre {endYear} et {year}." },
  hist_framing_survived: { en: "You made it to 1940 as {name}. Now look back — answer this question drawing on everything {name} lived through across the entire Depression.", fr: "Vous avez atteint 1940 en tant que {name}. Regardez en arrière — répondez à cette question en vous appuyant sur tout ce que {name} a vécu pendant toute la Dépression." },
  hist_eyebrow:          { en: "{outcome} in {endYear} — but history continued", fr: "{outcome} en {endYear} — mais l'histoire a continué" },
  hist_eyebrow_survived: { en: "You survived 1928–1939 — now reflect", fr: "Vous avez survécu à 1928–1939 — réfléchissez maintenant" },
  hist_sub:            { en: "Answer the remaining questions from a historical perspective. {current} of {total} remaining.", fr: "Répondez aux questions restantes d'un point de vue historique. {current} sur {total} restantes." },

  // Language toggle
  lang_toggle:         { en: "FR", fr: "EN" },
  lang_label:          { en: "Français", fr: "English" },

  // ─────────────────────────────────────────────────────────────────────────
  // RULES SCREEN — Column content
  // ─────────────────────────────────────────────────────────────────────────
  rules_col1_num:      { en: "I. Investments", fr: "I. Investissements" },
  rules_col1_title:    { en: "The Market", fr: "Le marché" },
  rules_col1_body:     {
    en: `<p>Each month, stock prices move up or down based on the <strong>market index</strong>. Stocks with higher <strong>volatility</strong> swing harder than the index — bigger gains in good times, bigger losses in bad.</p><div class="rule-item"><strong>Buy</strong> — spend cash to purchase shares. Prices are set by the market each month.</div><div class="rule-item"><strong>Sell</strong> — convert shares back to cash at the current price.</div><div class="rule-item"><strong>Borrow</strong> — take a broker loan to buy more stock than you can afford. This is called buying "on margin."</div><div class="rule-item"><strong>Repay</strong> — pay down your loan before interest consumes you. The rate is 5% per month.</div><p>If your <strong>Portfolio ÷ Debt ratio</strong> drops below 25%, the broker seizes and sells your shares automatically. This is a <strong>margin call</strong> — the event that destroyed thousands of investors in 1929.</p>`,
    fr: `<p>Chaque mois, les prix des actions montent ou descendent en fonction de l'<strong>indice du marché</strong>. Les actions avec une <strong>volatilité</strong> plus élevée fluctuent plus que l'indice — de plus gros gains en période faste, de plus grosses pertes en période difficile.</p><div class="rule-item"><strong>Acheter</strong> — dépenser de l'argent pour acheter des actions. Les prix sont fixés par le marché chaque mois.</div><div class="rule-item"><strong>Vendre</strong> — convertir les actions en argent au prix actuel.</div><div class="rule-item"><strong>Emprunter</strong> — prendre un prêt chez le courtier pour acheter plus d'actions que vous ne pouvez vous le permettre. C'est ce qu'on appelle acheter « sur marge ».</div><div class="rule-item"><strong>Rembourser</strong> — rembourser votre prêt avant que les intérêts ne vous ruinent. Le taux est de 5 % par mois.</div><p>Si votre <strong>ratio Portefeuille ÷ Dette</strong> tombe en dessous de 25 %, le courtier saisit et vend vos actions automatiquement. C'est un <strong>appel de marge</strong> — l'événement qui a détruit des milliers d'investisseurs en 1929.</p>`
  },
  rules_col2_num:      { en: "II. Household", fr: "II. Ménage" },
  rules_col2_title:    { en: "Daily Life", fr: "La vie quotidienne" },
  rules_col2_body:     {
    en: `<p>Every month your household runs whether the market is up or down. Wages come in; food and rent go out.</p><div class="rule-item"><strong>Monthly Flow</strong> = wages − food − rent. A positive flow builds your cash. A negative flow drains it.</div><div class="rule-item"><strong>Job loss</strong> eliminates your wages immediately. If you lose your job the same month expenses are due, your cash will drop sharply.</div><div class="rule-item"><strong>Relief payments</strong> arrive when you are unemployed — but they are small and irregular.</div><p>If your cash runs out and you still hold stocks, they will be <strong>sold automatically</strong> — cheapest first — to cover your food and rent. You cannot starve on paper profits.</p>`,
    fr: `<p>Chaque mois, votre ménage fonctionne, que le marché soit en hausse ou en baisse. Les salaires entrent ; la nourriture et le loyer sortent.</p><div class="rule-item"><strong>Flux mensuel</strong> = salaire − nourriture − loyer. Un flux positif fait croître votre argent. Un flux négatif l'épuise.</div><div class="rule-item"><strong>Perte d'emploi</strong> élimine vos salaires immédiatement. Si vous perdez votre emploi le même mois où les dépenses sont dues, votre argent va chuter fortement.</div><div class="rule-item"><strong>Paiements d'aide</strong> arrivent quand vous êtes au chômage — mais ils sont petits et irréguliers.</div><p>Si votre argent est épuisé et que vous détenez encore des actions, elles seront <strong>vendues automatiquement</strong> — les moins chères d'abord — pour couvrir votre nourriture et votre loyer. On ne peut pas survivre avec des profits sur papier.</p>`
  },
  rules_col3_num:      { en: "III. Survival", fr: "III. Survie" },
  rules_col3_title:    { en: "Win & Lose", fr: "Gagner et perdre" },
  rules_col3_body:     {
    en: `<p>The game covers <strong>144 months</strong> — January 1928 to December 1939. Survive to the end and you win, regardless of wealth.</p><div class="rule-item"><strong>Bankrupt</strong> — your net worth goes negative while you still owe the broker. Thousands of Canadians ended here.</div><div class="rule-item"><strong>Destitute</strong> — all cash and stocks gone, no debt remaining. The Depression ground you to nothing.</div><div class="rule-item"><strong>Survived</strong> — you reached 1940 with something to show for it.</div><p>Watch for the <strong>📖 Did You Know?</strong> panels — they explain the real history behind what is happening to your finances each month.</p>`,
    fr: `<p>Le jeu couvre <strong>144 mois</strong> — de janvier 1928 à décembre 1939. Survivez jusqu'à la fin et vous gagnez, quelle que soit votre richesse.</p><div class="rule-item"><strong>Faillite</strong> — votre valeur nette devient négative alors que vous devez encore au courtier. Des milliers de Canadiens ont connu ce sort.</div><div class="rule-item"><strong>Démuni(e)</strong> — tout l'argent et les actions sont partis, aucune dette restante. La Dépression vous a réduit à rien.</div><div class="rule-item"><strong>Survécu</strong> — vous avez atteint 1940 avec quelque chose à montrer.</div><p>Surveillez les panneaux <strong>📖 Le saviez-vous ?</strong> — ils expliquent la vraie histoire derrière ce qui arrive à vos finances chaque mois.</p>`
  },
  rules_playing_as:    { en: "You are playing as", fr: "Vous jouez en tant que" },
  rules_change_char:   { en: "← Change Character", fr: "← Changer de personnage" },
  rules_enter_game:    { en: "❧ Enter January 1928 ❧", fr: "❧ Entrer en janvier 1928 ❧" },

  // ─────────────────────────────────────────────────────────────────────────
  // PDF JOURNAL
  // ─────────────────────────────────────────────────────────────────────────
  pdf_title:           { en: "Reflection Journal", fr: "Journal de réflexion" },
  pdf_subtitle:        { en: "Hard Times — Canada 1928–1939", fr: "Temps difficiles — Canada 1928–1939" },
  pdf_student:         { en: "Student", fr: "Élève" },
  pdf_character:       { en: "Character", fr: "Personnage" },
  pdf_date_generated:  { en: "Date Generated", fr: "Date de création" },
  pdf_final_stats:     { en: "Final Statistics", fr: "Statistiques finales" },
  pdf_final_nw:        { en: "Final Net Worth", fr: "Valeur nette finale" },
  pdf_final_cash:      { en: "Cash Remaining", fr: "Argent restant" },
  pdf_final_debt:      { en: "Debt Remaining", fr: "Dette restante" },
  pdf_final_employed:  { en: "Employed at End", fr: "Employé(e) à la fin" },
  pdf_final_family:    { en: "Family Wellbeing", fr: "Bien-être familial" },
  pdf_outcome:         { en: "Outcome", fr: "Résultat" },
  pdf_outcome_bankrupt:{ en: "Bankrupt", fr: "Faillite" },
  pdf_outcome_destitute:{ en: "Destitute", fr: "Démuni(e)" },
  pdf_outcome_survived:{ en: "Survived", fr: "Survécu" },
  pdf_decisions:       { en: "Key Decisions Made", fr: "Décisions clés prises" },
  pdf_reflections:     { en: "Yearly Reflections", fr: "Réflexions annuelles" },
  pdf_answered_hist:   { en: "Answered from historical perspective", fr: "Répondu d'un point de vue historique" },
  pdf_net_worth:       { en: "Net Worth", fr: "Valeur nette" },
  pdf_employed:        { en: "Employed", fr: "Employé(e)" },
  pdf_yes:             { en: "Yes", fr: "Oui" },
  pdf_no:              { en: "No", fr: "Non" },
  pdf_none:            { en: "None", fr: "Aucune" },
  pdf_print_btn:       { en: "Print / Save as PDF", fr: "Imprimer / Enregistrer en PDF" },
  pdf_footer:          { en: "Hard Times — A Canadian Historical Simulation · Grade 10 History", fr: "Temps difficiles — Une simulation historique canadienne · Histoire 10e année" },
  pdf_reflections_saved:{ en: "{count} reflection{s} saved across {years} years.", fr: "{count} réflexion{s} sauvegardée{s} sur {years} années." }
};


/*
 * t(key) — return the translated string for the current language.
 * Falls back to English if the key or language is missing.
 */
function t(key) {
  const entry = TR[key];
  if (!entry) return key;
  return entry[window.LANG] || entry.en || key;
}

/*
 * tf(key, vars) — translated string with variable substitution.
 * Variables: { name: "Elias", year: 1929 } replaces {name}, {year}.
 */
function tf(key, vars) {
  let str = t(key);
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      str = str.replace(new RegExp(`\\{${k}\\}`, 'g'), v);
    }
  }
  return str;
}
