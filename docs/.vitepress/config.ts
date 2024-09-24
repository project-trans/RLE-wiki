import genConfig from '@project-trans/vitepress-theme-project-trans/config'
import type { SidebarOptions } from '@project-trans/vitepress-theme-project-trans/theme'
import type { ThemeContext } from '@project-trans/vitepress-theme-project-trans/utils'
import { withThemeContext } from '@project-trans/vitepress-theme-project-trans/utils'
import type { DefaultTheme } from 'vitepress'

type NavConfig = DefaultTheme.Config['nav']

const nav: NavConfig = [
  {
    text: '大学指南',
    link: '/campus/',
  },
  {
    text: '时尚护理',
    link: '/fashion/',
  },
  {
    text: '安全防护',
    link: '/personal-safety/',
  },
  {
    text: '其它',
    link: '/others/',
  },
  {
    text: '贡献指南',
    items: [
      {
        text: '校园版块投稿指南',
        link: '/contributor-guide/campus.md',
      },
      {
        text: '其他投稿指南',
        link: '/contributor-guide/other.md',
      },
      {
        text: '校园版块贡献模板',
        link: '/contributor-guide/CampusTemplate.md',
      },
    ],
  },
]

const baseConfig = {
  useTitleFromFrontmatter: true,
  useFolderTitleFromIndexFile: true,
  useFolderLinkFromIndexFile: true,
  excludeFilesByFrontmatterFieldName: true,
  collapsed: true,
  documentRootPath: '/docs',
} satisfies Partial<SidebarOptions>

const sidebarOptions = [
  // 大学指南
  {
    ...baseConfig,
    scanStartPath: 'campus',
    resolvePath: '/campus/',
  },
  // 贡献指南
  {
    ...baseConfig,
    scanStartPath: 'contributor-guide',
    resolvePath: '/contributor-guide/',
  },
  // 时尚护理
  {
    ...baseConfig,
    scanStartPath: 'fashion',
    resolvePath: '/fashion/',
  },
  // 安全防护
  {
    ...baseConfig,
    scanStartPath: 'personal-safety',
    resolvePath: '/personal-safety/',
  },
  // 其它
  {
    ...baseConfig,
    scanStartPath: 'others',
    resolvePath: '/others/',
  },
]

const themeConfig: ThemeContext = {
  siteTitle: 'RLE.wiki',
  siteDescription: '一份 RLE 指北',
  logo: {
    src: '/logo-horizontal.svg',
    alt: 'Logo: RLE.wiki',
  },
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
