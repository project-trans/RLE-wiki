import type {
  SidebarItem,
  SidebarMultiItem,
} from 'vitepress-sidebar'
import { generateSidebar } from 'vitepress-sidebar'
import type Options from 'vitepress-sidebar'

export const sidebar = generate()

function generate() {
  const baseConfig = {
    useTitleFromFrontmatter: true,
    useFolderTitleFromIndexFile: true,
    useFolderLinkFromIndexFile: true,
    excludeFilesByFrontmatter: true,
    collapsed: true,
  } satisfies Partial<Options>

  const sidebar = generateSidebar([
    // 大学指南
    {
      ...baseConfig,
      documentRootPath: '/docs',
      scanStartPath: 'campus',
      resolvePath: '/campus/',
    },
    // 贡献指南
    {
      ...baseConfig,
      documentRootPath: '/docs',
      scanStartPath: 'contributor-guide',
      resolvePath: '/contributor-guide/',
    },
    // 时尚护理
    {
      ...baseConfig,
      documentRootPath: '/docs',
      scanStartPath: 'fashion',
      resolvePath: '/fashion/',
    },
    // 安全防护
    {
      ...baseConfig,
      documentRootPath: '/docs',
      scanStartPath: 'personal-safety',
      resolvePath: '/personal-safety/',
    },
    // 其它
    {
      ...baseConfig,
      documentRootPath: '/docs',
      scanStartPath: 'others',
      resolvePath: '/others/',
    },
  ])

  for (const key in sidebar) {
    const sidebarMultiItem: SidebarMultiItem = (sidebar as any)[key]
    sidebarMultiItem.items.sort(sidebarTitleSorter)
  }
  return sidebar
}

function sidebarTitleSorter(infoA: SidebarItem, infoB: SidebarItem): number {
  const textA = infoA.text
  const textB = infoB.text
  if (textA === undefined || textB === undefined)
    return 0

  const infoANfc = textA.normalize('NFC')
  const infoBNfc = textB.normalize('NFC')
  return infoANfc.localeCompare(infoBNfc, 'zh', {
    numeric: true,
  })
}
