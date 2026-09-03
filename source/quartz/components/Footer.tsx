import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"

interface Options {
  links: Record<string, string>
}

export default ((opts?: Options) => {
  const Footer: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    const year = new Date().getFullYear()
    const links = opts?.links ?? {}
    return (
      <footer class={`${displayClass ?? ""}`}>
        <div class="footer-beta">
          <span class="beta-badge" data-i18n="footer.beta">BETA</span>
          <span data-i18n="footer.building">This project is under active development</span>
        </div>
        <div class="footer-cta">
          <a href="https://github.com/YRCiou/bjjmap" class="footer-link">
            GitHub
          </a>
        </div>
        {Object.keys(links).length > 0 && (
          <ul>
            {Object.entries(links).map(([text, link]) => (
              <li>
                <a href={link}>{text}</a>
              </li>
            ))}
          </ul>
        )}
        <p class="footer-copyright">BJJ Map © {year}</p>
      </footer>
    )
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor
