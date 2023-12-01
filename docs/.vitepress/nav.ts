// import { navbar } from "vuepress-theme-hope";
import { DefaultTheme } from 'vitepress'

export const configNav: DefaultTheme.Config['nav'] = [
  { text: "大学指南",
    link: "/campus/readme.md"
  },
  {
    text: "Fashion",
    link: "/fashion/readme.md"
  },
  {
    text: "贡献指南",
    items: [
      { text: "校园版块投稿指南", link: "/contributor-guide/campus.md" },
      { text: "其他投稿指南", link: "/contributor-guide/other.md" },
      { text: "校园版块贡献模板", link: "/contributor-guide/CampusTemplate.md" },
    ],
  },
];
