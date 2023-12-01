import footnote from 'markdown-it-footnote'
import katex from 'markdown-it-katex'
import mdPangu from 'markdown-it-pangu'
import { defineConfig } from 'vitepress'
import { getSidebar } from 'vitepress-plugin-auto-sidebar'
import nav from './nav'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'RLE.wiki',
  description: '一份RLE指北',
  markdown: {
    config(md) {
      md.use(mdPangu)
      md.use(footnote)
      md.use(katex)
    },
  },
  dir: 'docs',
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    siteTitle: 'RLE.wiki',
    nav,
    sidebar: getSidebar({
      contentRoot: '/docs',
      contentDirs: ['campus', 'contributor-guide', 'fashion'],
      collapsible: true,
      collapsed: true,
    }),

    socialLinks: [
      { icon: 'github', link: 'https://github.com/project-trans/RLE-wiki' },
    ],

    editLink: {
      pattern: 'https://github.com/project-trans/RLE-wiki/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页面', // label localization
    },

    // label localization
    outline: { label: '本页大纲' },
    lastUpdated: { text: '最后更新' },
    darkModeSwitchLabel: '深色模式',
    sidebarMenuLabel: '目录',
    returnToTopLabel: '返回顶部',
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
  },
})
