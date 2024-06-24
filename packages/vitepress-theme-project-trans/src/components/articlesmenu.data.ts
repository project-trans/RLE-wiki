import { createContentLoader } from 'vitepress'

declare const data: { url: string, title: string }[]

export { data }

export default createContentLoader('**/*.md', {
  transform: list =>
    list.map(item => ({ url: item.url, title: item.frontmatter.title })),
})
