import { navbar } from "vuepress-theme-hope";

export default navbar([
  { text: "大学指南", icon: "creative", link: "/campus/" },
  {
    text: "贡献指南",
    icon: "info",
    children: ["/contributor-guide/campus.md","/contributor-guide/other.md", "/contributor-guide/CampusTemplate.md"],
  },
]);
