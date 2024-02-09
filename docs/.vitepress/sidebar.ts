import { type DefaultTheme } from 'vitepress'
import { SidebarItem, generateSidebar } from 'vitepress-sidebar'

export const sidebar = generate()

function generate() {
  let sidebar = generateSidebar([
    // 大学指南
    {
      documentRootPath: '/docs',
      scanStartPath: 'campus',
      resolvePath: '/campus/',
      useTitleFromFrontmatter: true,
    },
    // 贡献指南
    {
      documentRootPath: '/docs',
      scanStartPath: 'contributor-guide',
      resolvePath: '/contributor-guide/',
      useTitleFromFrontmatter: true,
    },
    // Fashion
    {
      documentRootPath: '/docs',
      scanStartPath: 'fashion',
      resolvePath: '/fashion/',
      useTitleFromFrontmatter: true,
    },
    // 防护
    {
      documentRootPath: '/docs',
      scanStartPath: 'personal-safety',
      resolvePath: '/personal-safety/',
      useTitleFromFrontmatter: true,
    }

    // 这个 `as` 源于 vitepress-sidebar 的类型定义与实际情况的差异，目前不影响使用，后续 vitepress-sidebar 修复后可以移除。
  ]) as DefaultTheme.Config['sidebar']

  for (const key in sidebar) {
    sidebar[key].items.sort(sidebarTitleSorter)
  }
  return sidebar
}

function sidebarTitleSorter(
  infoA: SidebarItem,
  infoB: SidebarItem
): number {
  const textA = infoA.text
  const textB = infoB.text
  if (textA === undefined || textB === undefined) {
    return 0
  }
  const infoANfc = textA.normalize('NFC');
  const infoBNfc = textB.normalize('NFC');
  return infoANfc.localeCompare(infoBNfc, 'zh', {
      numeric: true,
  })
}
