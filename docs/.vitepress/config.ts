import genConfig from '@project-trans/vitepress-theme-project-trans/config'
import type { SidebarOptions } from '@project-trans/vitepress-theme-project-trans/theme'
import type { ThemeContext } from '@project-trans/vitepress-theme-project-trans/utils'
import { withThemeContext } from '@project-trans/vitepress-theme-project-trans/utils'
import type { DefaultTheme } from 'vitepress'

type NavConfig = DefaultTheme.Config['nav']

const nav: NavConfig = [
  {
    text: "大学指南",
    link: "/campus/",
  },
  {
    text: "时尚护理",
    link: "/fashion/",
  },
  {
    text: "安全防护",
    link: "/personal-safety/",
  },
  {
    text: "志愿填报",
    link: "/admission/",
  },
  {
    text: "海外生活",
    link: "/overseas/",
  },
  {
    text: "其它",
    link: "/others/",
  },
  {
    text: "贡献指南",
    items: [
      {
        text: "校园版块投稿指南",
        link: "/contributor-guide/campus.md",
      },
      {
        text: "其他投稿指南",
        link: "/contributor-guide/other.md",
      },
      {
        text: "校园版块贡献模板",
        link: "/contributor-guide/CampusTemplate.md",
      },
    ],
  },
  {
    text: "切换字体",
    items: [
      {
        text: "使用系统字体",
        link: "#",
      },
      {
        text: "霞鹜文楷",
        link: "#",
      },
      {
        text: "霞鹜文楷-等宽",
        link: "#",
      },
      {
        text: "霞鹜新晰黑",
        link: "#",
      },
      {
        text: "霞鹜新晰黑-等宽",
        link: "#",
      },
    ],
  },
];

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
    scanStartPath: "campus",
    resolvePath: "/campus/",
  },
  // 贡献指南
  {
    ...baseConfig,
    scanStartPath: "contributor-guide",
    resolvePath: "/contributor-guide/",
  },
  // 时尚护理
  {
    ...baseConfig,
    scanStartPath: "fashion",
    resolvePath: "/fashion/",
  },
  // 安全防护
  {
    ...baseConfig,
    scanStartPath: "personal-safety",
    resolvePath: "/personal-safety/",
  },
  // 志愿填报
  {
    ...baseConfig,
    scanStartPath: "admission",
    resolvePath: "/admission/",
  },
  // 海外生活
  {
    ...baseConfig,
    scanStartPath: 'overseas',
    resolvePath: '/overseas/',
  },
  // 其它
  {
    ...baseConfig,
    scanStartPath: "others",
    resolvePath: "/others/",
  },
];

const themeConfig: ThemeContext = {
  siteTitle: 'RLE.wiki',
  siteDescription: '一份 RLE 指北',
  siteLogo: '/logo-horizontal.svg',
  // SiteTitle值为false时，logo位置不显示标题。未定义SiteTitle时，显示标题。SiteTitle值为abcd时，显示abcd。
  SiteTitle: false,
  /** Repo */
  githubRepoLink: 'https://github.com/project-trans/RLE-wiki',
  /** vitepress 根目录 */
  rootDir: 'docs',
  /** 文档所在目录（目前似未使用此项） */
  include: ['campus', 'contributor-guide', 'fashion'],
  nav,
  sidebarOptions,
  /** 文档所在目录（用于GitHub编辑链接） */
  sitePattern: `docs`,
}

// https://vitepress.dev/reference/site-config
export default withThemeContext(themeConfig, genConfig)
