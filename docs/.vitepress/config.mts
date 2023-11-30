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
    ]
  }
})
