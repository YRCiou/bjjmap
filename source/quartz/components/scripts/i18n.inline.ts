// Interface language for the STATIC (Quartz) surface — the nav, the footer, the 404 page.
//
// The canvas app carries its own dictionary (neural/src/i18n.src.js); this file is the small
// half that has to work with no bundle at all: a crawler, a no-JS visitor and a failed neural
// fetch all still get the static article, and its chrome should follow the same preference.
//
// ONE storage key for both halves — `bjjmap-lang` — and one custom event, `bjjmap:lang`, so
// flipping the switch inside the app retranslates the page underneath it without a reload.
// Nothing here is content: every translated string is chrome that this repo authored. Technique,
// position and system names come from `content/` and are never looked up.

type Lang = "en" | "zh"

const LANG_KEY = "bjjmap-lang"

// key -> zh-TW. Absent key or lang "en" => the element keeps the English it was emitted with,
// which is also what a no-JS visitor sees.
const ZH: Record<string, string> = {
  "nav.Learning": "學習",
  "nav.Principles": "原則",
  "nav.Positions": "位置",
  "nav.Transitions": "轉換",
  "nav.Submissions": "降伏技",
  "nav.Systems": "系統",
  "nav.aria": "分類",

  "footer.beta": "測試版",
  "footer.building": "本專案仍在持續開發中",
  "footer.github": "GitHub",

  "404.title": "找不到頁面",
  "404.message": "這個頁面還不存在。",
  "404.didYouMean": "你是不是要找 ",
  "404.request": "許願這一頁",
  "404.search": "搜尋相似頁面",
  "404.home": "回到首頁",

  "search.placeholder": "搜尋技術…",
  "search.noResults": "沒有結果。",
}

function readLang(): Lang {
  try {
    const saved = localStorage.getItem(LANG_KEY)
    if (saved === "en" || saved === "zh") return saved
  } catch {
    /* private mode / blocked storage — fall through to the browser's own preference */
  }
  try {
    return /^zh\b/i.test(navigator.language || "") ? "zh" : "en"
  } catch {
    return "en"
  }
}

/** Every translated node keeps its English in `data-i18n-en`, written once on first pass, so
 * switching back to English restores the emitted text rather than a re-translation guess. */
function applyLang(lang: Lang): void {
  document.documentElement.lang = lang === "zh" ? "zh-Hant" : "en"
  document.documentElement.setAttribute("data-lang", lang)

  const nodes = document.querySelectorAll<HTMLElement>("[data-i18n]")
  nodes.forEach((el) => {
    const key = el.dataset.i18n!
    if (el.dataset.i18nEn === undefined) el.dataset.i18nEn = el.textContent ?? ""
    const zh = ZH[key]
    el.textContent = lang === "zh" && zh !== undefined ? zh : el.dataset.i18nEn!
  })

  document.querySelectorAll<HTMLElement>("[data-i18n-aria]").forEach((el) => {
    const key = el.dataset.i18nAria!
    if (el.dataset.i18nAriaEn === undefined)
      el.dataset.i18nAriaEn = el.getAttribute("aria-label") ?? ""
    const zh = ZH[key]
    el.setAttribute("aria-label", lang === "zh" && zh !== undefined ? zh : el.dataset.i18nAriaEn!)
  })
}

function currentLang(): Lang {
  const attr = document.documentElement.getAttribute("data-lang")
  return attr === "zh" || attr === "en" ? attr : readLang()
}

// The app dispatches this after the user flips the switch in its menu; it also fires on a
// storage event so a second tab follows along.
window.addEventListener("bjjmap:lang", (e) => {
  const next = (e as CustomEvent).detail?.lang
  applyLang(next === "zh" ? "zh" : "en")
})
window.addEventListener("storage", (e) => {
  if (e.key === LANG_KEY) applyLang(readLang())
})

// SPA navigation replaces the article, so re-apply on every soft nav as well as the first paint.
document.addEventListener("nav", () => applyLang(currentLang()))
applyLang(readLang())
