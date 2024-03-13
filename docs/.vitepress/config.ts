import { defineConfig } from 'vitepress'
import nav from './nav'
import mdPangu from 'markdown-it-pangu'
import katex from 'markdown-it-katex'
import footnote from 'markdown-it-footnote'
import { sidebar } from './sidebar'
import { rootDir, githubRepoLink } from './meta'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: 'RLE.wiki',
  description: '一份 RLE 指北',
  cleanUrls: true,
  markdown: {
    config(md) {
      md.use(mdPangu);
      md.use(footnote);
      md.use(katex);
    },
  },
  dir: rootDir,
  head: [
    ['link', { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" }],
    ['link', { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" }],
    ['link', { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" }],
    ['link', { rel: "manifest", href: "/site.webmanifest" }],
    ['meta', { name: "msapplication-TileColor", content: "#4c4c4c" }],
    ['meta', { name: "theme-color", content: "#ffffff" }],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    siteTitle: false,
    logo: {
      src: '/logo-horizontal.svg',
      alt: 'Logo: RLE.wiki',
    },
    nav,
    sidebar,
    socialLinks: [
      { icon: 'github', link: githubRepoLink }
    ],
    editLink: {
      pattern: `${githubRepoLink}/edit/main/docs/:path`,
      text: '在 GitHub 上编辑此页面', // label localization
    },
    // label localization
    outline: { label: '本页大纲', level: 'deep' },
    lastUpdated: { text: '最后更新' },
    darkModeSwitchLabel: '深色模式',
    sidebarMenuLabel: '目录',
    returnToTopLabel: '返回顶部',
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档',
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                },
              },
            },
          },
        },
      },
    },
  },
});
