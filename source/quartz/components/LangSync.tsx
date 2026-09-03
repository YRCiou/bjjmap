import { QuartzComponent, QuartzComponentConstructor } from "./types"
// @ts-ignore
import script from "./scripts/i18n.inline"

// Renders nothing. Its afterDOMLoaded script is what translates the static chrome (nav, footer,
// 404) into the interface language the visitor picked in the app's menu, and what keeps
// <html lang> honest. Registered in sharedPageComponents.afterBody so it runs on every page —
// including the ones a crawler or a no-JS visitor sees, where it simply leaves the emitted
// English alone.
const LangSync: QuartzComponent = () => null

LangSync.afterDOMLoaded = script
export default (() => LangSync) satisfies QuartzComponentConstructor
