// https://vitepress.dev/guide/custom-theme
import PtjsTheme from '@project-trans/vitepress-theme-project-trans/theme'
import { defineConfigWithTheme } from 'vitepress'

import 'uno.css'
import './style.css'

export default {
  extends: PtjsTheme,
}
