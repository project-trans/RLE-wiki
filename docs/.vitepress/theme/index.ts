// https://vitepress.dev/guide/custom-theme
import PtjsTheme from '@project-trans/vitepress-theme-project-trans/theme'
import { onMounted } from 'vue'
import { addFontSwitchListener } from './fontSwitcher'

import 'uno.css'
import './style.css'

export default {
  extends: PtjsTheme,
  setup() {
    onMounted(() => {
      addFontSwitchListener(); // 添加字体切换的事件监听器
    });
  },
}
