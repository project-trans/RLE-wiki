import config from '@project-trans/vitepress-theme-project-trans/config'
import genHead from '@project-trans/vitepress-theme-project-trans/utils/genHead'
import { defineConfig } from 'vitepress'

const siteTitle = 'RLE.wiki'
const siteDescription = '一份 RLE 指北'

// https://vitepress.dev/reference/site-config
export default defineConfig({ ...config, title: siteTitle, head: genHead({ siteTitle }) })
