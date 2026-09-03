// ─────────────────────────────────────────────────────────────────────────────
// INTERFACE LANGUAGE — English / 繁體中文
//
// WHAT IS TRANSLATED: chrome this repo authored — menu rows, settings, the pane's tabs, the
// roll's status words, flashcard controls, the legend, announcer sentences, field names.
//
// WHAT IS NEVER TRANSLATED, and the rule that keeps it that way: anything that arrives from
// `content/` — technique names, position names, submission names, system and principle names,
// every authored sentence in a dossier or a flashcard, and every URL slug. Those are looked up
// by NOTHING here: the dictionary is keyed by short ids, and the DOM sweep at the bottom only
// replaces a text node whose ENTIRE content is a key in `NG_I18N_SWEEP`, which holds UI phrases
// only. A node reading "Mount" or "Knee Slice Pass" matches no key and is left alone.
//
// Traditional Chinese, Taiwan usage (設定 / 閃卡 / 對練 / 挑戰). BJJ vocabulary that Taiwanese
// gyms say in English stays in English — guard, pass, sweep, mount, EDGE, gi / no-gi.
//
// THE FUNCTION IS `ngT`, NOT `t`. `t` is a local variable in dozens of methods in app.src.jsx
// (`const t = ...` for time, tone, text); a top-level `t` would be shadowed in exactly those
// scopes and the call would resolve to a number. `ngT` cannot collide.
// ─────────────────────────────────────────────────────────────────────────────

const NG_I18N_KEY = "bjjmap-lang";

const NG_I18N_ZH = {
  // ── menu ──
  "menu.language": "語言",
  "menu.settings": "設定",
  "menu.shortcuts": "鍵盤快速鍵",
  "menu.terms": "條款",
  "menu.privacy": "隱私",
  "menu.aria": "選單",
  "menu.label": "選單",

  // ── pane tabs ──
  "pane.explore": "探索",
  "pane.challenges": "挑戰",
  "pane.history": "最近幾場",
  "pane.historySub": "你最近的對練",
  "pane.masteredSub": "已精熟 {pct}",
  "pane.aria": "探索、挑戰與最近幾場",
  "pane.open": "開啟面板",
  "pane.close": "關閉",

  // ── explore ──
  "explore.search": "搜尋技術…",
  "explore.yourLists": "你的清單",
  "explore.noLists": "還沒有清單 — 按 + 建立一個。",
  "explore.results": "{n} 個結果",
  "explore.systems": "Systems",
  "explore.principles": "Principles",
  "explore.positions": "Positions",
  "explore.transitions": "Transitions",
  "explore.submissions": "Submissions",
  "explore.learning": "Learning",
  "explore.seeMore": "看更多",
  "explore.more": "更多",
  "explore.less": "收起",

  // ── pane footer stats ──
  "stats.mastered": "已精熟",
  "stats.due": "待複習",
  "stats.new": "新的",
  "stats.today": "今天",
  "stats.weakSpots": "弱點",

  // ── legend ──
  "legend.position": "Position",
  "legend.transition": "Transition",
  "legend.submission": "Submission",
  "legend.win": "有利",
  "legend.lose": "不利",

  // ── roll / gameplay ──
  "roll.won": "獲勝",
  "roll.tapped": "被拍",
  "roll.reset": "重設",
  "roll.ended": "結束",
  "roll.states": "{n} 個狀態",
  "roll.thisRoll": "本場對練",
  "roll.latest": "最新",
  "roll.youGoFor": "你選擇",
  "roll.attacking": "正在攻擊",
  "roll.finishIt": "完成它",
  "roll.countered": "被反制",
  "roll.correct": "答對",
  "roll.notQuite": "還差一點",
  "roll.oddsUp": "這一回合勝率上升",
  "roll.oddsDown": "這一回合 {n}",
  "roll.playFromHere": "從這裡開始",
  "roll.goFor": "使出 {name}",
  "roll.back": "返回",
  "roll.cancel": "取消",
  "roll.startRoll": "開始對練",
  "roll.startFresh": "開始新的一場",
  "roll.rollFrom": "從 {name} 開始，{role}？",
  "roll.attackingRole": "進攻",
  "roll.defendingRole": "防守",
  "roll.top": "TOP",
  "roll.bottom": "BOTTOM",
  "roll.decide": "決定中 {n}…",
  "roll.timesUp": "時間到",
  "roll.noRolls": "還沒有對練 — 按下播放，你的對練就會一場一場出現在這裡。",
  "roll.successRate": "成功率",
  "roll.edge": "EDGE",
  "roll.chance": "機率",

  // ── flashcards ──
  "fc.showAnswer": "看答案",
  "fc.hide": "隱藏",
  "fc.reveal": "揭曉",
  "fc.reviewAgain": "再複習一次",
  "fc.gotIt": "記住了",
  "fc.answer": "答案",
  "fc.correct": "答對了。",
  "fc.close": "很接近 — 把你的選擇和標示出來的答案比對一下。",
  "fc.wrong": "答錯了 — 標示出來的才是答案。",
  "fc.drillIt": "練它 — 賺取勝率與時間",
  "fc.defendIt": "守住它 — 跟時間賽跑",
  "fc.nextTechnique": "下一個技術 →",
  "fc.answerRevealed": "答案已顯示。",
  "fc.answerHidden": "答案已隱藏。",
  "fc.cards": "{n} 張卡",
  "fc.deck": "牌組",

  // ── settings ──
  "set.title": "設定",
  "set.flashcards": "閃卡",
  "set.rolling": "對練",
  "set.modifiers": "調整值",
  "set.shortcuts": "快速鍵",
  "set.dailyGoal": "每日目標",
  "set.dailyGoalDesc": "每天的卡數。先出現到期的，其餘的用來買新技術。",
  "set.answerMode": "作答方式",
  "set.answerModeDesc":
    "卡片在這裡怎麼作答。對練中的問題一律是選擇題 —— 這個側欄是研讀用的，所以除非你另外指定，否則以回想模式呈現。",
  "set.classicRecall": "經典回想",
  "set.auto": "自動",
  "set.multipleChoice": "選擇題",
  "set.recallInPlay": "回想模式（對練中）",
  "set.locked": "未解鎖",
  "set.recallInPlayDesc": "黑帶解鎖 —— 菁英格式：沒有選項，只有問題和你的記憶。",
  "set.focus": "重點",
  "set.focusDesc": "補強弱點，或磨利強項。",
  "set.antifragile": "反脆弱",
  "set.converge": "收斂",
  "set.antifragileDesc":
    "<b>反脆弱</b> —— 紮實、全面的打法。從你最弱的地方出卡，讓你沒有破綻可被利用。",
  "set.convergeDesc": "<b>收斂</b> —— 把你已經在用的東西磨得更利。",
  "set.rollingSim": "對練模擬",
  "set.rollingSimDesc":
    "當你選一個招，會依照該招的勝率（並受你的熟練度加成）擲骰決定成敗，對手由 AI 操作。",
  "set.off": "關閉",
  "set.normal": "一般",
  "set.on": "開啟",
  "set.difficultyNote": "更難的對手會隨階梯出現 —— Normal 是校準過的那一檔。",
  "set.questionsWhileRoll": "對練中的問題",
  "set.yourModifiers": "你的調整值",
  "set.yourModifiersDesc": "覆蓋基礎勝率的個人成功率",
  "set.activeCount": "{n} 個生效中",
  "set.winningVsNotLosing": "求勝 vs 不輸",
  "set.remove": "移除",
  "set.beta": "測試版",
  "set.betaNote": "BJJ Map 仍在積極開發中 —— 你看到的成功率與機率會持續校準、越來越準。",
  "set.quizOnPages": "頁面上的小測驗",

  // ── lists / sharing ──
  "list.new": "新清單",
  "list.delete": "刪除",
  "list.deleteConfirm": "確定刪除？",
  "list.deleteTitle": "刪除這個清單",
  "list.deleteArmed": "再按一次就會刪除這個清單",
  "list.share": "分享",
  "list.copyLink": "複製連結",
  "list.copied": "已複製",
  "list.addTo": "加入清單",
  "list.empty": "這個清單還是空的。",

  // ── legal ──
  "legal.terms": "服務條款",
  "legal.privacy": "隱私權政策",
  "legal.close": "關閉",
};

// Text-node sweep: EN phrase -> ZH. Only exact, whole-text-node matches are replaced, and only
// phrases this repo authored as chrome. See the header for why that cannot touch content.
const NG_I18N_SWEEP_ZH = {
  "Link incomplete ▸": "連結不完整 ▸",
  "Link unreadable ▸": "連結無法讀取 ▸",
  "Newer link ▸": "更新的連結 ▸",
  "Shared class · this link is incomplete": "分享的課程 · 這個連結不完整",
  "Shared class · this link can’t be read": "分享的課程 · 這個連結讀不出來",
  "This link is incomplete": "這個連結不完整",
  "It was cut short in transit — ask for it again": "它在傳送過程中被截斷了 — 請對方再傳一次",
  "This link didn’t work": "這個連結無法使用",
  "Check the whole link was copied": "確認整段連結都已複製",
  "It was cut short in transit — chat apps and mail clients re-wrap long links. Nothing is wrong with the class itself; ask for the link again.": "它在傳送過程中被截斷了 — 聊天軟體與郵件程式會對長連結換行。課程本身沒有問題，請對方再傳一次連結。",
  "This doesn’t look like one of our class links — a character may be missing or changed, or it may not be a class link at all. Check the whole link was copied, or ask for it again.": "這看起來不像是我們的課程連結 — 可能有字元遺漏或被更動，也可能根本不是課程連結。請確認整段連結都已複製，或請對方再傳一次。",
  "Study this system": "研讀這套系統",
  "Courses": "課程",
  "View course": "查看課程",
  "Members": "成員",
  "Core positions": "核心位置",
  "+10% now · +3% forever · +2.5s": "現在 +10% · 永久 +3% · +2.5 秒",
  "A submission from your current position, connecting toward": "從你目前位置出發的降伏技，銜接到",
  "Full breakdown — definition, key principles, decision tree, common mistakes — is authored on bjjmap.pages.dev. Drill its deck to raise your odds.": "完整解析（定義、關鍵原則、決策樹、常見錯誤）都寫在 bjjmap.pages.dev。練它的牌組可以提高你的勝率。",
  "Playing as guest - progress is saved on this device.": "以訪客身分遊玩 — 進度儲存在這台裝置上。",
  "BJJ Map is still being actively built — the success rates and probabilities you see are being continuously fine-tuned and will keep improving.": "BJJ Map 仍在積極開發中 —— 你看到的成功率與機率會持續校準、越來越準。",
  "— a solid, well-rounded game. Surfaces cards from the spots you’re weakest, so you have no holes to be exploited.": "—— 紮實、全面的打法。從你最弱的地方出卡，讓你沒有破綻可被利用。",
  "— competition. Getting caught costs exactly what finishing pays, so the ranking backs the move that ends the match.": "—— 競賽。被抓到的代價正好等於完成的收益，所以排序會支持能結束比賽的那一招。",
  "— the default. Getting caught counts about twice what finishing pays — roughly how most people actually feel. Careful, not passive.": "—— 預設值。被抓到約等於完成收益的兩倍代價，接近大多數人實際的感受。謹慎，但不消極。",
  "— the street. Getting caught counts four times what finishing pays, so the ranking prefers staying out of trouble over gambling for the tap.": "—— 街頭。被抓到等於完成收益的四倍代價，所以排序會偏好避開麻煩，而不是賭一個降伏。",
  "How much worse is getting caught than missing a finish? It depends on why you train. This changes only the": "被抓到比沒完成降伏糟多少？這取決於你為什麼練。這只會改變你的選項",
  "order": "排序方式",
  "your options are ranked in — same moves, same odds, same clock, and nothing you have earned. Expect a nudge, not a different game.": "—— 招式、勝率、時間和你已賺到的東西都不變。只是微調，不是換一個遊戲。",
  "How long a landing’s question stays open before its answer reveals itself — as a missed review. Your move is never on the clock.": "落地問題在自動揭曉答案（並計為一次錯過的複習）之前會開多久。你出招本身永遠不計時。",
  "Every state you land on asks one multiple-choice question (keys": "你落地的每個狀態都會出一題選擇題（按鍵",
  "). Right answers raise that exchange’s odds and refund clock; wrong ones cost odds for that exchange only. String rights together across states to build": "）。答對會提高該回合的勝率並補回時間；答錯只影響該回合。連續答對可以累積",
  "combos": "連段",
  "— momentum that heats your whole hand and makes counters fade. Wrong or ignored breaks it.": "—— 這股氣勢會加熱你整手牌並讓反制變弱。答錯或略過就會中斷。",
  "Unlocks at black belt — the elite format: no options, just the question and your memory.": "黑帶解鎖 —— 菁英格式：沒有選項，只有問題和你的記憶。",
  "Cards a day. What’s due comes first; the rest buys new techniques.": "每天的卡數。先出現到期的，其餘用來解鎖新技術。",
  "How cards read back HERE. Questions asked in-roll are always multiple choice — this sidebar is the study surface, so it reads back as recall unless you say otherwise.": "卡片在這裡的作答方式。對練中的問題一律是選擇題 —— 這個側欄是研讀用的，除非你另外指定，否則以回想模式呈現。",
  "When you pick a move, a dice-roll plays out against an AI opponent — success depends on the move’s win % (boosted by your mastery).": "當你選一個招，會擲骰對上 AI 對手 —— 成敗取決於該招的勝率（並受你的熟練度加成）。",
  "No modifiers yet. Add one to override a move’s base win %.": "還沒有調整值。新增一個來覆蓋招式的基礎勝率。",
  "Every lesson is open. Checkpoints and the optional capstones just ask for proof first.": "所有課程都已開放。檢查點與選修的總結關卡只是需要先證明你會。",
  "Earns a patch. It never opens or closes another track.": "可獲得一枚徽章。不會開啟或關閉其他路線。",
  "Available after every unit checkpoint": "完成每個單元的檢查點後開放",
  "Positions": "位置",
  "Transitions": "轉換",
  "Submissions": "降伏技",
  "Systems": "系統",
  "Principles": "原則",
  "Learning": "學習",
  "Position": "位置",
  "Transition": "轉換",
  "Submission": "降伏技",
  "POSITION": "位置",
  "TRANSITION": "轉換",
  "SUBMISSION": "降伏技",
  "Menu": "選單",
  "Explore": "探索",
  "Challenges": "挑戰",
  "Last rolls": "最近幾場",
  "Your last rolls": "你最近的對練",
  "Open panel": "開啟面板",
  "Roll the graph.": "在圖上開一場。",
  "A live roll plays out across the map. Every move is yours — only the questions are on the clock.": "一場即時對練會在這張圖上展開。每一手都由你決定 —— 只有問題有時間限制。",
  "Loading the graph…": "圖載入中…",
  "Terms": "條款",
  "Privacy": "隱私",
  "Settings": "設定",
  "Keyboard shortcuts": "鍵盤快速鍵",
  "Log out": "登出",
  "Win": "有利",
  "Lose": "不利",
  "see more": "看更多",
  "See more": "看更多",
  "Your lists": "你的清單",
  "No lists yet — tap + to start one.": "還沒有清單 — 按 + 建立一個。",
  "New list": "新清單",
  "Save the shared class above to keep it — or tap + to start your own.": "把上面分享的課程存起來，或按 + 建立你自己的。",
  "No techniques yet — tap the star on the card you land on, on a move’s detail sheet, or on any Explore row.": "還沒有技術 — 在你落地的卡片、招式詳情頁或任何探索列上按星號即可加入。",
  "Create": "建立",
  "Cancel": "取消",
  "Undo": "復原",
  "Add to list": "加入清單",
  "Add to a list": "加入清單",
  "In a list": "已在清單中",
  "Share": "分享",
  "Drill these": "練這些",
  "Save": "儲存",
  "Not for me": "不需要",
  "Show on graph": "在圖上顯示",
  "◉ On graph": "◉ 已在圖上",
  "Delete?": "確定刪除？",
  "Clear": "清除",
  "All": "全部",
  "Mastered": "已精熟",
  "due": "待複習",
  "new": "新的",
  "Not started": "尚未開始",
  "In progress": "進行中",
  "Complete": "已完成",
  "White belt": "白帶",
  "Blue belt": "藍帶",
  "Purple belt": "紫帶",
  "Brown belt": "棕帶",
  "Black belt": "黑帶",

  "Due Today": "今天到期",
  "Flashcards": "閃卡",
  "Rolling": "對練",
  "Modifiers": "調整值",
  "Shortcuts": "快速鍵",
  "Daily goal": "每日目標",
  "Answer mode": "作答方式",
  "Classic recall": "經典回想",
  "Auto": "自動",
  "Multiple choice": "選擇題",
  "Recall mode (in play)": "回想模式（對練中）",
  "The black-belt reward: proven cards stop being multiple choice mid-roll — question, reveal, self-grade.": "黑帶獎勵：已證明熟練的卡片在對練中不再是選擇題 —— 出題、揭曉、自評。",
  "Locked": "未解鎖",
  "LOCKED": "未解鎖",
  "Focus": "重點",
  "Shore up weaknesses, or sharpen strengths": "補強弱點，或磨利強項",
  "Antifragile": "反脆弱",
  "Converge": "收斂",
  "Show flashcards on pages": "在頁面上顯示閃卡",
  "Display a quiz pill on each technique": "在每個技術上顯示一顆測驗膠囊",
  "Rolling simulation": "對練模擬",
  "Off": "關閉",
  "On": "開啟",
  "Normal": "一般",
  "Harder opponents arrive with the ladder — Normal is the calibrated one.": "更強的對手會隨階梯出現 —— Normal 是校準過的那一檔。",
  "Uniform": "服裝",
  "Gi or no-gi. Filters which techniques, lessons and odds the whole app uses.": "Gi 或 No-gi。會篩選整個 app 使用的技術、課程與勝率。",
  "Winning vs not losing": "求勝 vs 不輸",
  "Sport": "競賽",
  "Slightly cautious": "略微保守",
  "Self-defence": "自衛",
  "Answer time": "作答時間",
  "Brisk": "快",
  "Default": "預設",
  "Relaxed": "寬鬆",
  "Questions while you roll": "對練中的問題",
  "Sound": "音效",
  "Synthesized feedback on every gameplay beat": "每個遊戲節拍的合成回饋音",
  "Sound volume": "音量",
  "How loud the beats land": "節拍音的大小聲",
  "Quiet": "小聲",
  "Loud": "大聲",
  "Your modifiers": "你的調整值",
  "Per-technique success rate that overrides the base win %": "覆蓋基礎勝率的個人成功率",
  "Add modifier": "新增調整值",
  "+ Add modifier": "＋ 新增調整值",
  "No modifiers match your search.": "沒有符合搜尋的調整值。",
  "Remove": "移除",
  "Active": "生效中",
  "Paused": "已暫停",
  "or": "或",
  "Answer a multiple-choice question": "回答選擇題",
  "Open card detail": "開啟卡片詳情",
  "Execute technique": "執行技術",
  "Flashcards: prev / next card": "閃卡：上一張 / 下一張",
  "Flashcards: prev / next technique": "閃卡：上一個 / 下一個技術",
  "Flashcards: flip / got it": "閃卡：翻面 / 記住了",
  "Flashcards: review again": "閃卡：再複習一次",
  "Landing card: prev / next question": "落地卡：上一題 / 下一題",
  "Open / search explorer": "開啟 / 搜尋探索器",
  "Close detail / explorer / flashcards": "關閉詳情 / 探索器 / 閃卡",
  "Pan the graph": "平移圖面",
  "Zoom the graph": "縮放圖面",
  "Drag": "拖曳",
  "Scroll": "捲動",
  "won": "獲勝",
  "tapped": "被拍",
  "reset": "重設",
  "ended": "結束",
  "You finished it": "你完成了",
  "Tapped out": "被拍了",
  "You got caught": "你被抓到了",
  "Scramble": "亂鬥",
  "Roll reset": "對練重設",
  "Won on points": "以分數獲勝",
  "Correct": "答對",
  "Not quite": "還差一點",
  "That one gets you hurt": "那一個會讓你受傷",
  "Odds up on this exchange": "這一回合勝率上升",
  "You go for": "你選擇",
  "Attacking": "進攻中",
  "Defending": "防守中",
  "Escaping": "脫逃中",
  "Escaped!": "脫逃成功！",
  "Transition lands": "轉換成功",
  "Failed": "失敗",
  "Countered": "被反制",
  "Caught": "被抓到",
  "Tapped": "被拍",
  "Opponent goes for": "對手選擇",
  "Too slow": "太慢了",
  "Answer": "答案",
  "Replay": "重播",
  "Previous rolls": "先前的對練",
  "This roll": "本場對練",
  "LATEST": "最新",
  "Today": "今天",
  "Yesterday": "昨天",
  "just now": "剛剛",
  "No rolls yet — press play and your roll shows up here, state by state.": "還沒有對練 — 按下播放，你的對練會一個狀態一個狀態出現在這裡。",
  "they aimed for": "他們想使出",
  "you aimed for": "你想使出",
  "mastered": "已精熟",
  "Flashcards in the works": "閃卡製作中",
  "Start a fresh roll": "開始新的一場",
  "Set the board here": "在這裡擺好局面",
  "Start roll": "開始對練",
  "Set it up": "擺好局面",
  "Your current roll will be archived to Previous rolls.": "你目前這場會被歸檔到「先前的對練」。",
  "Back": "返回",
  "Execute this move": "執行這一招",
  "Play from here": "從這裡開始",
  "Attacker": "進攻方",
  "Defend": "防守",
  "Finish it": "完成它",
  "Execute": "執行",
  "More": "更多",
  "Less": "收起",
  "Success rate": "成功率",
  "Odds": "勝率",
  "escape route": "脫逃路線",
  "Show answer": "看答案",
  "Hide": "隱藏",
  "Hide answer": "隱藏答案",
  "Reveal": "揭曉",
  "Reveal answer": "揭曉答案",
  "Review again": "再複習一次",
  "Got it": "記住了",
  "Correct.": "答對了。",
  "Answer revealed.": "答案已顯示。",
  "Answer hidden.": "答案已隱藏。",
  "Marked as recalled.": "已標記為記得。",
  "Marked for review.": "已標記為需複習。",
  "Close — compare your pick with the highlighted answer.": "很接近 — 把你的選擇和標示出來的答案比對一下。",
  "That one gets you in trouble — the correct answer is highlighted.": "那個選項會讓你陷入麻煩 — 正確答案已標示。",
  "Not this one — the correct answer is highlighted.": "不是這個 — 正確答案已標示。",
  "Recall to sharpen your odds": "用回想來提高你的勝率",
  "Question": "問題",
  "ⓘ More detail": "ⓘ 更多細節",
  "Hide detail": "隱藏細節",
  "Continue": "繼續",
  "‹ Previous": "‹ 上一個",
  "Next ›": "下一個 ›",
  "Next technique →": "下一個技術 →",
  "Next card →": "下一張卡 →",
  "Drill it — earn odds & time": "練它 — 賺取勝率與時間",
  "Defend it — beat the clock": "守住它 — 跟時間賽跑",
  "Got it → pump the odds": "記住了 → 提高勝率",
  "Got it → +escape%": "記住了 → +脫逃率",
  "Maintenance": "維持複習",
  "Learn next": "接下來學",
  "More, in order": "更多，依序",
  "ranked by what they'd fix": "依能補起多少弱點排序",
  "Nothing due right now. Answer cards anywhere — in a roll or here — and they come back on a spaced-repetition schedule.": "目前沒有到期的卡片。在任何地方作答 —— 對練中或這裡 —— 它們會依間隔複習排程回來。",
  "No gaps left in this tier. Roll into somewhere new and it will show up here.": "這一層沒有缺口了。去別的地方對練，新的就會出現在這裡。",
  "Nothing here yet — drill some cards to fill this list.": "這裡還是空的 — 練幾張卡就會有東西。",
  "States you land in during a roll show up here. Start rolling to populate it.": "對練中落地的狀態會出現在這裡。開始對練就會有內容。",
  "Done for today — great job!": "今天完成了 — 做得好！",
  "This week": "這週",
  "Close": "關閉",
  "Checkpoint": "檢查點",
  "✓ drilled": "✓ 已練過",
  "soon": "即將",
  "retry": "重試",
  "Search and pick a technique to see details.": "搜尋並選一個技術來看詳情。",
  "Continue reading": "繼續閱讀",
};

// Attribute sweep: aria-label / title / placeholder carry as much chrome as the text nodes
// do, and none of them is reachable by a TreeWalker.
const NG_I18N_ATTR_ZH = {
  "Search techniques…": "搜尋技術…",
  "Search modifiers…": "搜尋調整值…",
  "Search positions, transitions, submissions…": "搜尋 position、transition、submission…",
  "Technique name": "技術名稱",
  "New list name": "新清單名稱",
  "Menu": "選單",
  "Open panel": "開啟面板",
  "Close panel": "關閉面板",
  "Open learning panel": "開啟學習面板",
  "Learning views": "學習檢視",
  "Explore, Challenges, and Last rolls": "探索、挑戰與最近幾場",
  "Categories": "分類",
  "Settings": "設定",
  "New list": "新清單",
  "Add to list": "加入清單",
  "Delete this list": "刪除這個清單",
  "Click again to delete this list": "再按一次就會刪除這個清單",
  "Rename this list": "重新命名這個清單",
  "Hide these techniques": "隱藏這些技術",
  "Show these techniques": "顯示這些技術",
  "Hide this card": "隱藏這張卡",
  "Adjust your success rate": "調整你的成功率",
  "Lower": "調低",
  "Raise": "調高",
  "Remove": "移除",
  "Clear": "清除",
  "Active": "生效中",
  "Paused": "已暫停",
  "Start a fresh roll from this state": "從這個狀態開始新的一場",
  "Light these techniques on the graph again": "重新在圖上點亮這些技術",
  "Dismiss this shared list": "略過這份分享清單",
};


// Interpolated chrome. The exact-match table cannot see "Mastered 0%" or "3 new", because the
// number is baked into the same text node as the words. These are the shapes that carry a count,
// written as anchored regexes so a partial match inside a sentence can never fire. Ordered:
// first match wins.
const NG_I18N_PATTERNS = [
  [/^Mastered (\d+)%$/, "已精熟 $1%"],
  [/^Mastered (\d[\d,]*) \((\d+)%\)$/, "已精熟 $1（$2%）"],
  [/^(\d[\d,]*) due$/, "$1 待複習"],
  [/^(\d[\d,]*) new$/, "$1 新的"],
  [/^(\d[\d,]*) of (\d[\d,]*)$/, "$1 / $2"],
  [/^(\d[\d,]*) of (\d[\d,]*) lessons$/, "$2 課中的 $1 課"],
  [/^(\d[\d,]*) of (\d[\d,]*) units$/, "$2 個單元中的 $1 個"],
  [/^(\d[\d,]*) cards?$/, "$1 張卡"],
  [/^(\d[\d,]*) cards? due$/, "$1 張卡待複習"],
  [/^(\d[\d,]*) techniques?$/, "$1 個技術"],
  [/^(\d[\d,]*) states?$/, "$1 個狀態"],
  [/^(\d[\d,]*) results?$/, "$1 個結果"],
  [/^(\d[\d,]*) active$/, "$1 個生效中"],
  [/^(\d[\d,]*) cards? owed$/, "欠 $1 張卡"],
  [/^(\d[\d,]*) due today$/, "今天到期 $1 張"],
  [/^(\d+)m ago$/, "$1 分鐘前"],
  [/^(\d+)h ago$/, "$1 小時前"],
  [/^(\d+)d ago$/, "$1 天前"],
  // the announcer's per-exchange deltas. U+2212 MINUS SIGN, not a hyphen: that is what the
  // app writes, and an approximate pattern matches nothing.
  [/^([−-])(\d+)% on this exchange$/, "−$2% （這一回合）"],
  [/^Answer revealed · ([−-])(\d+)% on this exchange$/, "已揭曉答案 · −$2%（這一回合）"],
  [/^· ×(\d+) momentum gone$/, "· 失去 ×$1 氣勢"],
  [/^(\d+)s$/, "$1 秒"],
  [/^\+(\d+)%$/, "+$1%"],
  [/^Cautious ×(\d+)$/, "保守 ×$1"],
  [/^Getting caught counts (\d+)× what finishing pays\.$/, "被抓到的代價是完成收益的 $1 倍。"],
  // "Go for the <technique>" keeps the technique name verbatim: only the verb is translated.
  [/^Go for the (.+)$/, "使出 $1"],
  [/^Roll from (.+), attacking\?$/, "從 $1 開始，進攻？"],
  [/^Roll from (.+), defending\?$/, "從 $1 開始，防守？"],
  [/^Replay (.+)$/, "重播 $1"],
  [/^(\d+)% mastered$/, "$1% 已精熟"],
  [/^(\d+)% sharp$/, "$1% 熟練"],
  [/^(\d+)% film study$/, "$1% 影片研究"],
  [/^Added to “(.+)”$/, "已加入「$1」"],
  [/^Not started$/, "尚未開始"],
  [/^In progress$/, "進行中"],
  [/^Complete$/, "已完成"],
  [/^Checkpoint available after (\d+) lessons?$/, "完成 $1 課後開放檢查點"],
  [/^(White|Blue|Purple|Brown|Black) belt$/, function (m) {
    return { White: "白帶", Blue: "藍帶", Purple: "紫帶", Brown: "棕帶", Black: "黑帶" }[m[1]];
  }],
  [/^All (\d[\d,]*) cards reviewed$/, "$1 張卡全部複習完畢"],
  [/^You reviewed all (\d[\d,]*) techniques in this session\.$/, "你在這次練習中複習了全部 $1 個技術。"],
];

/** Apply the first matching pattern, or null when none does. */
function ngI18nPattern(text) {
  for (const [re, out] of NG_I18N_PATTERNS) {
    const m = re.exec(text);
    if (!m) continue;
    if (typeof out === "function") return out(m);
    return out.replace(/\$(\d)/g, (_, i) => m[Number(i)]);
  }
  return null;
}


// ─── the legal sheet, in both languages ──────────────────────────────────────
// Same SHAPE in both: {title, updated, notice?, sections: [[heading, body], …], full}. Keeping
// them as data rather than two blobs of markup is what stops one language quietly gaining or
// losing a section. The authoritative long-form versions are /terms and /privacy; this is the
// short sheet the app shows without navigating away.
//
// The copy states what is actually true of this build: no accounts, no server, no analytics.
const NG_I18N_LEGAL = {
  en: {
    terms: {
      title: "Terms of Use",
      updated: "Last updated September 2026",
      notice: [
        "Safety first.",
        "Brazilian Jiu-Jitsu is a contact sport with inherent risk of serious injury. bjjmap.pages.dev is a study companion for practitioners who already train at an academy under qualified instruction. It is not a substitute for in-person coaching, and it is not a self-teaching program.",
      ],
      sections: [
        ["What this service is", "An interactive knowledge base and study tool: positions, transitions, submissions, flashcards, and a simulated “roll” for reviewing decision-making. The simulation, including any success percentage, EDGE figure or modifier, is a gameplay estimate for study purposes only — it is a model, not a measurement, and it does not predict real outcomes."],
        ["Assumption of risk", "Only practice techniques under the supervision of a qualified instructor, with a willing, informed partner, and at an intensity appropriate to your level. You assume all risk arising from your training. Never practice chokes or joint locks outside supervised training."],
        ["No accounts, no server", "There is no sign-in and no cloud sync. Your progress lives only in this browser’s local storage. Clearing it erases everything permanently, and nothing follows you to another device."],
        ["No warranties", "Content is provided “as is”, without warranty of accuracy or completeness. Technique descriptions may contain errors, and what works varies by body type, skill, and context."],
        ["Limitation of liability", "To the maximum extent permitted by law, bjjmap.pages.dev and its contributors are not liable for any injury, loss, or damage arising from use of this service or from training decisions informed by it."],
        ["Affiliate links", "Some outbound links are affiliate links: if you buy through one we may earn a commission, at no extra cost to you. It never changes what the graph teaches."],
      ],
      full: "The full Terms of Service are at bjjmap.pages.dev/terms.",
    },
    privacy: {
      title: "Privacy Policy",
      updated: "Last updated September 2026",
      sections: [
        ["What we collect", "Nothing. This is a static site with no accounts, no database and no analytics of any kind. There is no server that could receive your data."],
        ["What stays on your device", "Your study progress — flashcards answered, techniques mastered, roll history, lists, settings — is written to this browser’s local storage and never leaves it."],
        ["Cookies", "We set none. Third parties may set their own when their content loads."],
        ["Third parties", "Cloudflare Pages hosts the site, Google Fonts serves the typefaces, YouTube serves an embedded clip when you play one, and GitHub answers one request for the repository’s star count. Each sees your IP address the way any web server does."],
        ["Your data, your control", "Clearing this site’s browser storage erases everything the app has ever stored. We hold nothing to delete on your behalf."],
      ],
      full: "The full Privacy Policy is at bjjmap.pages.dev/privacy.",
    },
  },
  zh: {
    terms: {
      title: "服務條款",
      updated: "最後更新：2026 年 9 月",
      notice: [
        "安全優先。",
        "巴西柔術是具有固有受傷風險的接觸性運動。bjjmap.pages.dev 是給已經在道館、並有合格教練指導下訓練的人使用的研讀工具。它不能取代實體教學，也不是自學課程。",
      ],
      sections: [
        ["這個服務是什麼", "一個互動式知識庫與研讀工具：position、transition、submission、閃卡，以及用來重新檢視決策的模擬「對練」。模擬中的任何成功率、EDGE 數值或調整值，都只是供研讀用的遊戲化估計 —— 它是一個模型，不是量測結果，也不能預測真實結果。"],
        ["風險自負", "只能在合格教練監督下、與自願且知情的練習對象一起，以符合你程度的強度練習。訓練所生的一切風險由你自行承擔。絕對不要在無人監督的情況下練絞技或關節技。"],
        ["沒有帳號，沒有伺服器", "沒有登入，也沒有雲端同步。你的進度只存在這個瀏覽器的 local storage 裡。清除它會永久刪除所有資料，而且不會跟著你到另一台裝置。"],
        ["不予保證", "內容以「現狀」提供，不保證正確性或完整性。技術描述可能含有錯誤，且什麼有效會因體型、程度與情境而異。"],
        ["責任限制", "在法律允許的最大範圍內，bjjmap.pages.dev 及其貢獻者對於因使用本服務、或因參考本服務而做出的訓練決定所導致的任何傷害、損失或損害，均不負責。"],
        ["聯盟行銷連結", "部分外部連結是聯盟行銷連結：若你透過這些連結購買，我們可能獲得佣金，而你不會因此支付額外費用。這永遠不會改變圖譜所教的內容。"],
      ],
      full: "完整的服務條款請見 bjjmap.pages.dev/terms。",
    },
    privacy: {
      title: "隱私權政策",
      updated: "最後更新：2026 年 9 月",
      sections: [
        ["我們蒐集什麼", "什麼都沒有。這是一個靜態網站，沒有帳號、沒有資料庫，也沒有任何分析工具。根本沒有任何伺服器可以接收你的資料。"],
        ["什麼留在你的裝置上", "你的研讀進度 —— 答過的閃卡、已精熟的技術、對練紀錄、清單與設定 —— 都寫入這個瀏覽器的 local storage，永遠不會離開。"],
        ["Cookie", "我們不設定任何 cookie。第三方內容載入時可能會設定它們自己的。"],
        ["第三方", "Cloudflare Pages 代管本站，Google Fonts 提供字型，YouTube 在你按下播放時提供嵌入影片，GitHub 則回應一次專案星星數的請求。它們都會像任何網頁伺服器一樣看到你的 IP 位址。"],
        ["你的資料，你掌控", "清除本站在瀏覽器中的儲存空間，就能抹除 app 曾經儲存過的一切。我們手上沒有任何資料可以替你刪除。"],
      ],
      full: "完整的隱私權政策請見 bjjmap.pages.dev/privacy。",
    },
  },
};

/** The legal sheet's copy for the current language, falling back to English. */
function ngLegal(kind) {
  const pack = NG_I18N_LEGAL[NG_I18N_LANG] || NG_I18N_LEGAL.en;
  return pack[kind] || NG_I18N_LEGAL.en[kind];
}

let NG_I18N_LANG = (function () {
  try {
    const saved = localStorage.getItem(NG_I18N_KEY);
    if (saved === "en" || saved === "zh") return saved;
  } catch (e) {
    /* blocked storage — fall through to the browser preference */
  }
  try {
    return /^zh\b/i.test(navigator.language || "") ? "zh" : "en";
  } catch (e) {
    return "en";
  }
})();

const NG_I18N_MISSING = Object.create(null);
// node -> the ENGLISH it was emitted with. Makes the sweep reversible: switching back to
// English restores what the render produced instead of guessing an inverse translation.
const NG_I18N_ORIGINAL = new WeakMap();
// set while the sweep is writing, so the MutationObserver ignores its own edits
let NG_I18N_WRITING = false;

function ngLang() {
  return NG_I18N_LANG;
}

/** Persist, retranslate the static page under the app, and hand the caller the new value so it
 * can re-render. Never throws: a blocked localStorage still flips the language for this tab. */
function ngSetLang(lang) {
  const next = lang === "zh" ? "zh" : "en";
  NG_I18N_LANG = next;
  try {
    localStorage.setItem(NG_I18N_KEY, next);
  } catch (e) {
    /* the choice still applies to this tab */
  }
  try {
    document.documentElement.lang = next === "zh" ? "zh-Hant" : "en";
    document.documentElement.setAttribute("data-lang", next);
    window.dispatchEvent(new CustomEvent("bjjmap:lang", { detail: { lang: next } }));
  } catch (e) {
    /* no DOM (unit tests) */
  }
  return next;
}

/**
 * ngT("set.dailyGoal")            -> "每日目標"
 * ngT("roll.goFor", { name: "…" })-> "使出 …"
 *
 * A missing key falls back to `def` when given, else to the key's own tail, and warns ONCE per
 * key so a typo is visible in development without spamming a render loop.
 */
function ngT(key, vars, def) {
  let s = null;
  if (NG_I18N_LANG === "zh") s = NG_I18N_ZH[key];
  if (s == null) {
    s = def != null ? def : null;
    if (s == null && NG_I18N_LANG === "zh" && !NG_I18N_MISSING[key]) {
      NG_I18N_MISSING[key] = 1;
      try {
        if (location.hostname === "localhost") console.warn("[i18n] missing zh key:", key);
      } catch (e) {
        /* ignore */
      }
    }
    if (s == null) s = key.indexOf(".") >= 0 ? key.slice(key.indexOf(".") + 1) : key;
  }
  if (vars) {
    for (const k in vars) s = s.split("{" + k + "}").join(String(vars[k]));
  }
  return s;
}

/** English default + zh override in one call, for sites where the English is the source of
 * truth and lives at the call site: ngTx("fc.gotIt", "Got it"). */
function ngTx(key, en, vars) {
  return ngT(key, vars, NG_I18N_LANG === "zh" ? undefined : en);
}

/**
 * The long tail. app.src.jsx builds most of its chrome as HTML strings; converting all ~1,000
 * sites by hand would be a very large diff with a real chance of breaking a template. So the
 * hand-converted surfaces call ngT directly, and everything else is caught here: after a render,
 * walk the app's own subtree and replace any text node whose ENTIRE trimmed content is a key in
 * NG_I18N_SWEEP_ZH. Whole-node exact match is what makes this safe — a node holding a technique
 * name, a dossier sentence or a number matches nothing.
 *
 * `data-i18n-skip` on an ancestor opts a subtree out (used for anything rendering content).
 */
function ngI18nSweep(root) {
  // RE-ENTRANCY. Writing a text node fires a characterData record, which is exactly what the
  // observer below listens for; without this flag the first translation loops forever and the
  // page never finishes painting. (It did. That is why the flag exists.)
  if (!root || NG_I18N_WRITING) return;
  let walker;
  try {
    walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
  } catch (e) {
    return;
  }
  const zh = NG_I18N_LANG === "zh";
  const hits = [];
  let n;
  while ((n = walker.nextNode())) {
    const raw = n.nodeValue;
    if (!raw) continue;
    const original = NG_I18N_ORIGINAL.get(n);
    if (original !== undefined) {
      // already swept once: restore or re-translate from the ENGLISH we captured, never from
      // the Chinese currently on screen (that would be a translation of a translation).
      const t = original.trim();
      const z = NG_I18N_SWEEP_ZH[t] !== undefined ? NG_I18N_SWEEP_ZH[t] : ngI18nPattern(t);
      hits.push([n, zh && z !== undefined && z !== null ? original.replace(t, z) : original]);
      continue;
    }
    if (!zh) continue;
    const trimmed = raw.trim();
    // The cap only exists to skip obviously-content-sized text; the real guard is that the
    // lookup is an EXACT whole-node match, so a paragraph of authored prose matches nothing
    // however long it is. 90 was too tight — it silently excluded the longest settings
    // descriptions, which are the most valuable strings in the table.
    if (!trimmed || trimmed.length > 400) continue;
    const z = NG_I18N_SWEEP_ZH[trimmed] !== undefined
      ? NG_I18N_SWEEP_ZH[trimmed]
      : ngI18nPattern(trimmed);
    if (z === undefined || z === null || z === trimmed) continue;
    if (n.parentElement && n.parentElement.closest("[data-i18n-skip]")) continue;
    NG_I18N_ORIGINAL.set(n, raw);
    hits.push([n, raw.replace(trimmed, z)]);
  }
  NG_I18N_WRITING = true;
  try {
    for (const [node, value] of hits) if (node.nodeValue !== value) node.nodeValue = value;
    ngI18nSweepAttrs(root, zh);
  } finally {
    NG_I18N_WRITING = false;
  }
}

/** aria-label / title / placeholder. Same reversibility rule: the English is stashed in a
 * `data-i18n-<attr>` attribute the first time a node is translated. */
function ngI18nSweepAttrs(root, zh) {
  const ATTRS = ["aria-label", "title", "placeholder"];
  let els;
  try {
    els = root.querySelectorAll("[aria-label],[title],[placeholder]");
  } catch (e) {
    return;
  }
  for (const el of els) {
    for (const a of ATTRS) {
      const stash = "data-i18n-o-" + a.replace("aria-", "");
      const saved = el.getAttribute(stash);
      if (saved !== null) {
        const z = NG_I18N_ATTR_ZH[saved];
        el.setAttribute(a, zh && z !== undefined ? z : saved);
        continue;
      }
      if (!zh) continue;
      const cur = el.getAttribute(a);
      if (cur === null) continue;
      const z = NG_I18N_ATTR_ZH[cur.trim()];
      if (z === undefined) continue;
      el.setAttribute(stash, cur);
      el.setAttribute(a, z);
    }
  }
}

/**
 * Keep a subtree translated as it is REBUILT.
 *
 * app.src.jsx paints imperatively from roughly a hundred places — `innerHTML = …`, `textContent =`,
 * appendChild — and hand-converting every one of them would be a very large diff across a 15,000
 * line file with a real chance of breaking a template. So the surfaces that need interpolation or
 * an attribute (the menu, the language switch itself) call ngT directly, and everything else is
 * caught here: one MutationObserver per mount, sweeping ONLY the nodes each mutation added.
 *
 * Sweeping the added records rather than the whole tree is what keeps this cheap — a re-render of
 * the option tray touches its own cards, not the 4,000-node graph beside them. Canvas drawing
 * mutates no DOM at all, so a roll in flight costs nothing.
 */
function ngI18nAutoTranslate(root) {
  if (!root || root.__ngI18nObserved) return;
  root.__ngI18nObserved = true;
  ngI18nSweep(root);
  let obs;
  try {
    obs = new MutationObserver((records) => {
      for (const r of records) {
        if (r.type === "characterData") {
          if (r.target && r.target.parentElement) ngI18nSweep(r.target.parentElement);
          continue;
        }
        for (const n of r.addedNodes) {
          if (n.nodeType === 1) ngI18nSweep(n);
          else if (n.nodeType === 3 && n.parentElement) ngI18nSweep(n.parentElement);
        }
      }
    });
    obs.observe(root, { childList: true, subtree: true, characterData: true });
  } catch (e) {
    return; // no MutationObserver: the explicit ngT sites still translate
  }
  // The switch itself re-sweeps the whole tree, because a language change has to reach nodes no
  // mutation touched (the static template's tab labels and legend).
  try {
    window.addEventListener("bjjmap:lang", () => ngI18nSweep(root));
  } catch (e) {
    /* ignore */
  }
}

// Published so the app, the console and a test can all reach the same instance.
;(globalThis).NGI18n = {
  key: NG_I18N_KEY,
  lang: ngLang,
  setLang: ngSetLang,
  t: ngT,
  tx: ngTx,
  sweep: ngI18nSweep,
  auto: ngI18nAutoTranslate,
  zh: NG_I18N_ZH,
  sweepTable: NG_I18N_SWEEP_ZH,
  attrTable: NG_I18N_ATTR_ZH,
  patterns: NG_I18N_PATTERNS,
  legal: ngLegal,
};
