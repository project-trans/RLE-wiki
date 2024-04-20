import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import Components from 'unplugin-vue-components/vite'
import UnoCSS from 'unocss/vite'
import { GitChangelog, GitChangelogMarkdownSection } from '@nolebase/vitepress-plugin-git-changelog/vite'
import {
  MarkdownSectionWrapper,
  PageHeaderTemplate,
  TemplateAppSBox,
  TemplateCopyrightInfo,
} from './.vitepress/plugins/MarkdownSectionWrapper'

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://rle.wiki',
        // uncomment the following line to use local server
        // target: 'http://localhost:8787',
        changeOrigin: true,
        autoRewrite: true,
      },
    },
  },
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
      repoURL: 'https://github.com/project-trans/RLE-wiki',
      maxGitLogCount: 1000,
      rewritePaths: {
        'docs/': '',
      },
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
      dirs: resolve(__dirname, '.vitepress/theme/components'),
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
})
