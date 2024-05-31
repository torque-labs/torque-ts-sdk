import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Torque SDK Docs",
  tagline: "Torque SDK Docs",
  // favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://docs.torque.so",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  onBrokenLinks: "ignore",
  onBrokenMarkdownLinks: "ignore",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        blog: false,
        docs: {
          breadcrumbs: false,
          sidebarPath: "./sidebars.ts",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/torque-logo.jpg",
    navbar: {
      title: "Torque Labs",
      logo: {
        alt: "Torque",
        src: "img/torque-logo.jpg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Tutorial",
        },
        {
          href: "https://torque.so",
          label: "Torque",
          position: "right",
        },
        {
          href: "https://github.com/torque-labs",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Links",
          items: [
            {
              label: "Home",
              href: "https://torque.so",
            },
            {
              label: "Torque App",
              href: "https://app.torque.so",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/torquelabs",
            },
            {
              label: "GitHub",
              href: "https://github.com/torque-labs",
            },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Torque Labs. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
