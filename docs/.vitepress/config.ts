import { readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { defineConfig } from 'vitepress'
import mdPangu from 'markdown-it-pangu'
import katex from 'markdown-it-katex'
import footnote from 'markdown-it-footnote'
import nav from './nav'
import { sidebar } from './sidebar'
import { githubRepoLink, rootDir } from './meta'

const siteTitle = 'RLE.wiki'
const siteDescription = '一份 RLE 指北'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: siteTitle,
  cleanUrls: true,
  markdown: {
    config(md) {
      md.use(mdPangu)
      md.use(footnote)
      md.use(katex)
    },
  },
  dir: rootDir,
  head: [
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
    ['meta', { name: 'msapplication-TileColor', content: '#4c4c4c' }],
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['meta', { property: 'og:site_name', content: siteTitle }],
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
      { icon: 'github', link: githubRepoLink },
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
        // Add title field in frontmatter to search
        // You can exclude a page from search by adding search: false to the page's frontmatter.
        _render(src, env, md) {
          if (env.frontmatter?.search === false)
            return ''
          let html = md.render(src, env)
          if (env.frontmatter?.title)
            html = md.render(`# ${env.frontmatter.title}\n`) + html
          return html
        },
      },
    },
  },
  transformHead: (context) => {
    const head = [...context.head] || []

    const pageSourceFilePath = join(rootDir, context.pageData.filePath)
    const pageSourceFileStat = statSync(join(rootDir, context.pageData.filePath))

    if (pageSourceFileStat.isDirectory()) {
      head.push([
        'meta',
        {
          property: 'og:title',
          content: siteTitle,
        },
      ])

      head.push([
        'meta',
        {
          name: 'description',
          content: siteDescription,
        },
      ])

      return head
    }

    let pageSourceFileContent = readFileSync(pageSourceFilePath, { encoding: 'utf-8' })

    // remove all frontmatter
    pageSourceFileContent = pageSourceFileContent.replace(/---[\s\S]*?---/, '')

    // remove markdown heading markup but keep the text content
    pageSourceFileContent = pageSourceFileContent.replace(/^(#+)\s+(.*)/gm, ' $2 ')
    // remove markdown link markup but keep the text content
    pageSourceFileContent = pageSourceFileContent.replace(/\[([^\]]+)\]\([^)]+\)/gm, ' $1 ')
    // remove markdown image markup but keep the text content
    pageSourceFileContent = pageSourceFileContent.replace(/\!\[([^\]]+)\]\([^)]+\)/gm, ' $1 ')
    // remove markdown reference link markup but keep the text content
    pageSourceFileContent = pageSourceFileContent.replace(/\[.*]/gm, '')
    // remove markdown bold markup but keep the text content
    pageSourceFileContent = pageSourceFileContent.replace(/\*\*([^*]+)\*\*/gm, ' $1 ')
    pageSourceFileContent = pageSourceFileContent.replace(/__([^*]+)__/gm, ' $1 ')
    // remove markdown italic markup but keep the text content
    pageSourceFileContent = pageSourceFileContent.replace(/\*([^*]+)\*/gm, ' $1 ')
    pageSourceFileContent = pageSourceFileContent.replace(/_([^*]+)_/gm, ' $1 ')
    // remove markdown code markup but keep the text content
    pageSourceFileContent = pageSourceFileContent.replace(/`([^`]+)`/gm, ' $1 ')
    // remove markdown code block markup but keep the text content
    pageSourceFileContent = pageSourceFileContent.replace(/```([^`]+)```/gm, ' $1 ')
    // remove markdown table header markup but keep the text content
    pageSourceFileContent = pageSourceFileContent.replace(/\|:?-+:?\|/gm, '')
    // remove markdown table cell markup but keep the text content
    pageSourceFileContent = pageSourceFileContent.replace(/\|([^|]+)\|/gm, ' $1 ')

    // remove specific html tags completely
    const tags = ['']
    tags.forEach((tag) => {
      pageSourceFileContent = pageSourceFileContent.replace(new RegExp(`<${tag}[^>]*>[\\s\\S]*?<\\/${tag}>`, 'g'), '')
    })

    // remove specific html tags but keep the text content
    const tagsToKeepContent = ['u', 'Containers', 'img', 'a']
    tagsToKeepContent.forEach((tag) => {
      pageSourceFileContent = pageSourceFileContent.replace(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'g'), ' $1 ')
    })

    // remove all new lines (either \r, \n)
    pageSourceFileContent = pageSourceFileContent.replace(/[\r|\n]/gm, '')

    // calculate the first 200 characters of the page content
    let pageContent = pageSourceFileContent.slice(0, 200)
    // trim space
    pageContent = pageContent.trim()
    // if pageSourceFileContent is longer than 200 characters, add ellipsis
    if (pageSourceFileContent.length > 100)
      pageContent += '...'

    if (context.pageData.frontmatter?.layout === 'home')
      pageContent = context.pageData.frontmatter?.hero?.tagline ?? siteDescription

    head.push([
      'meta',
      { name: 'description', content: pageContent },
    ])

    head.push([
      'meta',
      { property: 'og:title', content: context.title },
    ])

    head.push([
      'meta',
      { property: 'og:description', content: pageContent },
    ])

    head.push([
      'meta',
      { property: 'og:title', content: context.title },
    ])

    head.push([
      'meta',
      { property: 'twitter:description', content: pageContent },
    ])

    return head
  },
})
