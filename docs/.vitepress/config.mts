import { defineConfig } from 'vitepress'
import { configNav } from './nav'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "RLE.wiki",
  description: "一份RLE指北",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: configNav,

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/project-trans/RLE-wiki' }
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
  }
})
