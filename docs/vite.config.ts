import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import { MarkdownTransform } from './.vitepress/plugins/markdownTransform'
import Components from 'unplugin-vue-components/vite'
import UnoCSS from 'unocss/vite'
import { ChangeLog } from './.vitepress/plugins/changelog'

export default defineConfig({
  plugins: [
    MarkdownTransform(),
    ChangeLog(),
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
