import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import { MarkdownTransform } from './.vitepress/plugins/markdownTransform'
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  plugins: [
    MarkdownTransform(),
    Components({
      dirs: resolve(__dirname, '.vitepress/theme/components'),
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: './.vitepress/components.d.ts',
      transformer: 'vue3',
    }),
  ],
})
