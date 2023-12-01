import { type DefaultTheme } from 'vitepress'

const nav = [
  {
    text: "大学指南",
    link: "/campus/",
  },
  {
    text: "Fashion",
    link: "/fashion/",
  },
  {
    text: "贡献指南",
    items: [{
      text: "校园版块投稿指南",
      link: "/contributor-guide/campus.md",
    }, {
      text: "其他投稿指南",
      link: "/contributor-guide/other.md",
    }, {
      text: "校园版块贡献模板",
      link: "/contributor-guide/CampusTemplate.md",
    }],
  },
] satisfies DefaultTheme.Config['nav'];
export default nav;
