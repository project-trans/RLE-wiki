import { readFileSync, statSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { GitChangelog } from '@nolebase/vitepress-plugin-git-changelog/vite'
import { transformHeadMeta } from '@nolebase/vitepress-plugin-meta'
import {
  MarkdownSectionWrapper,
  PageHeaderTemplate,
  TemplateCopyrightInfo,
} from '@project-trans/vitepress-theme-project-trans/plugins/MarkdownSectionWrapper'
import footnote from 'markdown-it-footnote'
import katex from 'markdown-it-katex'
import mdPangu from 'markdown-it-pangu'
import UnoCSS from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vitepress'
import { generateSidebar } from './sidebar'
import { useThemeContext } from './utils/themeContext'

// https://vitepress.dev/reference/site-config
function genConfig() {
  const themeConfig = useThemeContext()
  const { siteTitle, githubRepoLink, nav }
    = themeConfig
  return defineConfig({
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
    head: [
      [
        'link',
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
      ],
      [
        'link',
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        },
      ],
      [
        'link',
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png',
        },
      ],
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
      sidebar: generateSidebar(),
      socialLinks: [{ icon: 'github', link: githubRepoLink }],
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
                  displayDetails: '显示详细列表',
                  footer: {
                    selectText: '选择',
                    navigateText: '切换',
                    closeText: '关闭',
                    // 无障碍（ARIA）标签，用于描述键盘导航操作
                    navigateUpKeyAriaLabel: '上箭头',
                    navigateDownKeyAriaLabel: '下箭头',
                    selectKeyAriaLabel: '回车',
                    closeKeyAriaLabel: '退出'
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
    transformHead: async (context) => {
      let head = [...context.head]

      const returnedHead = await transformHeadMeta()(head, context)
      if (typeof returnedHead !== 'undefined')
        head = returnedHead

      return head
    },
    vite: {
      plugins: [
        MarkdownSectionWrapper(
          [PageHeaderTemplate, TemplateCopyrightInfo],
          [],
          {
            excludes: [],
            exclude: (_, { helpers }): boolean => {
              if (helpers.idEquals('index.md'))
                return true

              return false
            },
          },
        ),
        GitChangelog({
          repoURL: githubRepoLink,
        }),
        // GitChangelogMarkdownSection({
        //   sections: {
        //     disableChangelog: false,
        //     disableContributors: true,
        //   },
        //   getChangelogTitle: (): string => {
        //     return '文件历史'
        //   },
        //   excludes: [],
        //   exclude: (_, { helpers }): boolean => {
        //     if (helpers.idEquals('index.md'))
        //       return true

        //     return false
        //   },
        // }),
        Components({
          dirs: [
            'docs/.vitepress/theme/components',
            resolve(
              typeof dirname(fileURLToPath(import.meta.url)) === 'string'
                ? dirname(fileURLToPath(import.meta.url))
                : __dirname,
              './components',
            ),
          ],
          include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
          dts: './.vitepress/components.d.ts',
          transformer: 'vue3',
        }),
        UnoCSS(),
      ],
      ssr: {
        noExternal: [
          '@nolebase/vitepress-plugin-enhanced-readabilities',
          '@nolebase/vitepress-plugin-highlight-targeted-heading',
        ],
      },
    },
  })
}

export default genConfig
