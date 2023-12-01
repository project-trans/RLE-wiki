// https://vitepress.dev/guide/custom-theme
import './style.css'

import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'

export default {
  extends: DefaultTheme,
  Layout: () => h(DefaultTheme.Layout, null, {
    // https://vitepress.dev/guide/extending-default-theme#layout-slots
  }),
  enhanceApp({ app, router, siteData }) {
    // ...
  },
} satisfies Theme
