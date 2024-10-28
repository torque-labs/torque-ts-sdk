import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';

const config: Config = {
  title: 'Torque SDK Docs',
  tagline: 'Torque SDK Docs',
  // favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: 'https://docs.torque.so',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        blog: false,
        docs: {
          breadcrumbs: false,
          sidebarPath: './sidebars.ts',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      'docusaurus-plugin-typedoc',
      {
        entryPoints: ['../src/index.ts'],
        tsconfig: '../tsconfig.json',
        sidebar: {
          autoConfiguration: true,
          pretty: true,
        },
        parametersFormat: 'table',
        propertiesFormat: 'table',
        enumMembersFormat: 'table',
        typeDeclarationFormat: 'list',
        indexFormat: 'table',
        expandObjects: true,
        useCodeBlocks: true,
        watch: process.env.TYPEDOC_WATCH,
        out: './docs/sdk',
        mergeReadme: true,
      },
    ],
  ],

  themeConfig: {
    // TOOD: Add social metatags
    noSkipToContent: true,
    image: 'img/torque-logo.jpg',
    navbar: {
      logo: {
        alt: 'Torque',
        src: 'img/torque-full-logo-black.svg',
        srcDark: 'img/torque-full-logo-white.svg',
      },
      items: [
        {
          type: 'doc',
          position: 'left',
          docId: 'intro',
          label: 'Home',
        },
        {
          type: 'doc',
          position: 'left',
          docId: 'sdk/index',
          label: 'Reference',
        },
        {
          href: 'https://torque.so',
          label: 'Torque',
          position: 'right',
        },
        {
          href: 'https://github.com/torque-labs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Links',
          items: [
            {
              label: 'Home',
              href: 'https://torque.so',
            },
            {
              label: 'Torque App',
              href: 'https://app.torque.so',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/torqueprotocol',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/torque-labs',
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
