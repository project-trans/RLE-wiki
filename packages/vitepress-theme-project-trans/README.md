# VitePress Theme Project Trans

这是一个由 Project Trans 开发的 VitePress 主题。

## 使用方式

修改下述两个文件：

```typescript
// docs/.vitepress/config.ts
import genConfig from '@project-trans/vitepress-theme-project-trans/config'
import type { SidebarOptions } from '@project-trans/vitepress-theme-project-trans/theme'
import type { ThemeContext } from '@project-trans/vitepress-theme-project-trans/utils'
import { withThemeContext } from '@project-trans/vitepress-theme-project-trans/utils'

const themeConfig: ThemeContext = {
  siteTitle: 'RLE.wiki',
  siteDescription: '一份 RLE 指北',
  /** Repo */
  githubRepoLink: 'https://github.com/project-trans/RLE-wiki',
  /** vitepress 根目录 */
  rootDir: 'docs',
  /** 文档所在目录（目前似未使用此项） */
  include: ['campus', 'contributor-guide', 'fashion'],
  nav,
  sidebarOptions,
}

// https://vitepress.dev/reference/site-config
export default withThemeContext(themeConfig, genConfig)
```

```typescript
// docs/.vitepress/theme/index.ts
// https://vitepress.dev/guide/custom-theme
import PtjsTheme from '@project-trans/vitepress-theme-project-trans/theme'

import 'uno.css'
import './style.css'

export default {
  extends: PtjsTheme,
}
```
