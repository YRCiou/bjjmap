import "dotenv/config"
import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4.0 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "BJJ Map",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    // Analytics and cloud sync removed in this fork: no PostHog, no Supabase.
    analytics: null,
    locale: "en-US",
    baseUrl: "bjjmap.pages.dev",
    ignorePatterns: [
      "private",
      ".obsidian",
      "CONTRIBUTING-*.md",
      "**/CONTRIBUTING*.md",
      "*.old",
      "*.bak.*",
      "TEMPLATE.*",
      "**/TEMPLATE.*",
      "**/!(bjj-graph).json",
    ],
    defaultDateType: "created",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Montserrat",
        body: "Montserrat",
        code: "Geist Mono",
      },
      colors: {
        lightMode: {
          // Neutral greyscale ground, pink primary. The neutrals carry NO hue on purpose:
          // the only colour in the chrome is the primary and the graph node types.
          light: "#ffffff",
          lightgray: "#e6e6e6",
          gray: "#808080",
          darkgray: "#444444",
          dark: "#1f1f1f",
          secondary: "#c92f82", // --primary
          tertiary: "#d6398f", // --ring
          highlight: "rgba(201, 47, 130, 0.12)", // primary @ 12%
          textHighlight: "#f472b688",
          // Content-type colors (Tol Bright palette - colorblind-safe)
          graphPosition: "#228833",
          graphTransition: "#aa58d0ff",
          graphSubmission: "#ba2637ff",
          graphPrinciple: "#66CCEE",
          graphSystem: "#4477AA",
          graphTag: "#CCBB44",
          // Per-role strength ramp (graph fill: red = bad for viewer → blue = dominant).
          // Zero is a warm neutral just off the page bg so neutral nodes recede.
          strengthMinus1: "#c2331c",
          strengthMinusHalf: "#e57878",
          strengthZero: "#efe7dd",
          strengthPlusHalf: "#6da3e8",
          strengthPlus1: "#1f5fb8",
        },
        darkMode: {
          // Pure black ground; every neutral above it is a plain grey (no blue, no pink).
          light: "#000000",
          lightgray: "#2a2a2a",
          gray: "#9a9a9a",
          darkgray: "#d4d4d4",
          dark: "#fafafa",
          secondary: "#f472b6", // --primary
          tertiary: "#f9a8d4", // --ring (dark)
          highlight: "rgba(244, 114, 182, 0.12)", // primary @ 12%
          textHighlight: "#c92f8288",
          // Content-type colors (Tol Bright palette - colorblind-safe)
          graphPosition: "#228833",
          graphTransition: "#aa58d0ff",
          graphSubmission: "#ba2637ff",
          graphPrinciple: "#66CCEE",
          graphSystem: "#4477AA",
          graphTag: "#CCBB44",
          // Per-role strength ramp (brightened for the dark canvas; zero recedes
          // just above the dark page bg).
          strengthMinus1: "#ff6f57",
          strengthMinusHalf: "#d4574a",
          strengthZero: "#2a2a2f",
          strengthPlusHalf: "#5e9be0",
          strengthPlus1: "#8fb6ff",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        // "git" = last-commit date per file (real, per-page). Without it, generated
        // .md share one filesystem birth time → identical "Last updated" everywhere
        // (the bug that got ContentMeta removed in v1.36.1). Needs git history at
        // build time (fetch-depth: 0); falls back to filesystem if unavailable.
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.SchemaExtractor(),
      Plugin.Description(),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
