import { defineUserConfig } from "vuepress";
import mdPangu from "markdown-it-pangu";
import theme from "./theme";

export default defineUserConfig({
  lang: "zh-CN",
  title: "RLE.wiki",
  description: "一份RLE指北",

  base: "/",

  extendsMarkdown: (md) => {
    md.use(mdPangu);
  },

  theme,
});
