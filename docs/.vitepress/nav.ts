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

export default nav
