import { defineConfig } from "vitepress";
import mdPangu from "markdown-it-pangu";
import katex from 'markdown-it-katex';
import footnote from 'markdown-it-footnote';
import { getSidebar } from 'vitepress-plugin-auto-sidebar'

export default defineConfig({
  lang: "zh-CN",
  title: "RLE.wiki",
  description: "一份RLE指北",

  base: "/",

  markdown: {
    config(md) {
      md.use(mdPangu);
      md.use(footnote);
      md.use(katex);
    },
  },

  lastUpdated: true,
  themeConfig: {
    siteTitle: "RLE.wiki",
    nav: [
      {
        text: "大学指南",
        // icon: "creative",
        link: "/campus/"
      },
      {
        text: "Fashion",
        // icon: "creative",
        link: "/fashion/"
      },
      {
        text: "贡献指南",
        // icon: "info",
        items: [{
          text: "Campus",
          link: "/contributor-guide/campus.md"
        }, {
          text: "Other",
          link: "/contributor-guide/other.md"
        }, {
          text: "CampusTemplate",
          link: "/contributor-guide/CampusTemplate.md"
        }],
      },
    ],
    sidebar: getSidebar({
      contentRoot: '/docs',
      contentDirs: ['campus', 'contributor-guide', 'fashion'],
      collapsible: true,
      collapsed: true,
    }),
    editLink: {
      pattern: 'https://github.com/project-trans/RLE-wiki/edit/main/docs/:path',
    },
  },
  dir: 'docs',
});
