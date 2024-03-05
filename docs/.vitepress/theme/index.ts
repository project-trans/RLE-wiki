// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import AppearanceToggle from './components/AppearanceToggle.vue'

import {
  NolebaseEnhancedReadabilitiesPlugin,
  NolebaseEnhancedReadabilitiesMenu,
  NolebaseEnhancedReadabilitiesScreenMenu,
} from '@nolebase/vitepress-plugin-enhanced-readabilities'

import {
  NolebaseHighlightTargetedHeading,
} from '@nolebase/vitepress-plugin-highlight-targeted-heading'

import {
  NolebaseGitChangelogPlugin
} from '@nolebase/vitepress-plugin-git-changelog/client'

import '@nolebase/vitepress-plugin-enhanced-readabilities/dist/style.css'
import '@nolebase/vitepress-plugin-highlight-targeted-heading/dist/style.css'
import '@nolebase/vitepress-plugin-git-changelog/client/style.css'

import './style.css'
import 'uno.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(AppearanceToggle, null, {
      'default': () => h(DefaultTheme.Layout, null, {
        // https://vitepress.dev/guide/extending-default-theme#layout-slots
        'doc-top': () => [
          h(NolebaseHighlightTargetedHeading),
        ],
        'nav-bar-content-after': () => [
          h(NolebaseEnhancedReadabilitiesMenu),
        ],
        'nav-screen-content-after': () => [
          h(NolebaseEnhancedReadabilitiesScreenMenu),
        ],
      }),
    })
  },
  enhanceApp({ app }) {
    app.use(NolebaseEnhancedReadabilitiesPlugin, {
      spotlight: {
        defaultToggle: true,
      }
    })

    app.use(NolebaseGitChangelogPlugin, {
      locales: {
        'zh-CN': {
          lastEditedDateFnsLocaleName: 'zhCN',
        }
      }
    })
  }
} satisfies Theme
