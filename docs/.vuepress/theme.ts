import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar";
import sidebar from "./sidebar";
import { mySidebarTitleSorter } from "./sidebarSorter";

export default hopeTheme({
  hostname: "https://rle.wiki/",

  author: {
    name: "Project Trans",
    url: "https://github.com/project-trans",
  },

  iconAssets: "iconfont",

  repo: "project-trans/RLE-wiki",

  docsDir: "docs",

  navbar: navbar,

  sidebar: sidebar,

  sidebarSorter: mySidebarTitleSorter,

  breadcrumb: false,

  displayFooter: true,

  contributors: false,

  pageInfo: ["Author", "Date", "Word", "ReadingTime", "PageView"],

  plugins: {
    feed: {
      rss: true,
    },
    comment: false,
    mdEnhance: {
      container: true,
      tabs: true,
      sub: true,
      sup: true,
      align: true,
      attrs: true,
      footnote: true,
      mark: true,
      tasklist: true,
      imgMark: true,
      imgSize: true,
      katex: true,
    },
  },
});
