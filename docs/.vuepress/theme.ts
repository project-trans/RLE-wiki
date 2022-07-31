import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar";
import sidebar from "./sidebar";

export default hopeTheme({
  hostname: "https://rle.wiki/",

  author: {
    name: "MtF.wiki Team",
    url: "https://github.com/mtf-wiki",
  },

  iconAssets: "iconfont",

  repo: "mtf-wiki/RLE-wiki",

  docsDir: "docs",

  navbar: navbar,

  sidebar: sidebar,

  breadcrumb: false,

  displayFooter: true,

  pageInfo: ["Author", "Date", "Word", "ReadingTime", "PageView"],

  plugins: {
    feed: {
      rss: true,
    },
    comment: {
      provider: "Waline",
      serverURL: "https://waline.rle.wiki",
      dark: "auto",
      requiredMeta: ['nick', 'mail'],
      locale: {
        admin: "编辑组"
      }
    },
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
      imageMark: true,
      imageSize: true,
      tex: true,
    },
  },
});
