import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import { themes as prismThemes } from "prism-react-renderer";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
    title: "Credit Pay",
    tagline: "便捷化Crypto与法币之间的支付转换",
    favicon: "img/favicon.ico",

    // Set the production url of your site here
    url: "https://pcp-doc.vercel.com",
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: "/",

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: "credit pay", // Usually your GitHub org/user name.
    projectName: "credit pay", // Usually your repo name.

    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: "zh-Hans",
        locales: ["zh-Hans"],
    },

    presets: [
        [
            "classic",
            {
                docs: {
                    sidebarPath: "./sidebars.ts",
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                        "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
                },
                theme: {
                    customCss: "./src/css/custom.css",
                },
            } satisfies Preset.Options,
        ],
    ],

    themeConfig: {
        // Replace with your project's social card
        image: "img/docusaurus-social-card.jpg",
        navbar: {
            title: "Credit Pay",
            logo: {
                alt: "My Site Logo",
                src: "img/logo.svg",
            },
            items: [
                {
                    type: "docSidebar",
                    sidebarId: "creditPaySidebar",
                    position: "left",
                    label: "文档",
                },
            ],
        },
        footer: {
            style: "dark",
            links: [
                // {
                //     title: "Docs",
                //     items: [
                //         // {
                //         //     type: "docSidebar",
                //         //     sidebarId: "creditPaySidebar",
                //         //     position: "left",
                //         //     label: "文档",
                //         // },
                //         // {
                //         //   type: 'docSidebar',
                //         //   sidebarId: 'tutorialSidebar',
                //         //   position: 'left',
                //         //   label: 'Tutorial',
                //         // },
                //         // {
                //         //   href: 'https://github.com/facebook/docusaurus',
                //         //   label: 'GitHub',
                //         //   position: 'right',
                //         // },
                //     ],
                // },
            ],
            // copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
        },
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
        },
    } satisfies Preset.ThemeConfig,
};

export default config;
