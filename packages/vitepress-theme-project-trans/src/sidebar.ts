import type {
  SidebarItem,
  SidebarMultiItem,
} from 'vitepress-sidebar'
import { generateSidebar as genSidebar } from 'vitepress-sidebar'
import { useThemeContext } from './utils/themeContext'

export function generateSidebar() {
  const { sidebarOptions } = useThemeContext()
  const sidebar = genSidebar(sidebarOptions)
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
