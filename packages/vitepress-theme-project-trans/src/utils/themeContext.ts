import { AsyncLocalStorage } from 'node:async_hooks'
import type { DefaultTheme } from 'vitepress'
import type { generateSidebar } from 'vitepress-sidebar'
import type Options from 'vitepress-sidebar'

type NavConfig = DefaultTheme.Config['nav']

export interface ThemeContext {
  siteTitle: string
  siteDescription: string
  githubRepoLink: string
  rootDir: string
  include: string[]
  nav: NavConfig
  sidebarOptions: Options | Options[]
}

const themeContext = new AsyncLocalStorage<ThemeContext>()

export function withThemeContext<T>(context: ThemeContext, fn: () => T): T {
  return themeContext.run(context, fn)
}

export function useThemeContext(): ThemeContext {
  return themeContext.getStore()!
}
