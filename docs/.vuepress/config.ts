import { defineUserConfig } from "vuepress";
import theme from "./theme";

export default defineUserConfig({
  lang: "zh-CN",
  title: "RLE.wiki",
  description: "一份RLE指北",

  base: "/",

  theme,
});