// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme-without-fonts'
import { h } from 'vue'
import './custom-font.css'

import {
  NolebaseEnhancedReadabilitiesPlugin,
} from '@nolebase/vitepress-plugin-enhanced-readabilities/client'

import {
  NolebaseGitChangelogPlugin,
} from '@nolebase/vitepress-plugin-git-changelog/client'
import type Options from 'vitepress-sidebar'

import '@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css'
import '@nolebase/vitepress-plugin-git-changelog/client/style.css'
import '@nolebase/vitepress-plugin-highlight-targeted-heading/client/style.css'

import Layout from './Layout.vue'

export type SidebarOptions = Options

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.use(NolebaseEnhancedReadabilitiesPlugin, {
      spotlight: {
        defaultToggle: true,
      },
    })

    app.use(NolebaseGitChangelogPlugin, {
      locales: {
        'zh-CN': {
          lastEditedDateFnsLocaleName: 'zhCN',
        },
      },
    })
  },
} satisfies Theme
