import { relative, resolve } from 'node:path'
import type { Plugin } from 'vite'

import {
  pathEndsWith,
  pathEquals,
  pathStartsWith,
} from '../path'

interface Context {
  helpers: {
    /**
     * A helper function to help to determine whether the passed string parameter equals the
     * current transforming module ID with normalization of paths capabilities and
     * cross platform / OS compatibilities.
     * @param equalsWith - String to equal with
     * @returns boolean
     */
    idEquals: (equalsWith: string) => boolean
    /**
     * A helper function to help to determine whether the passed string parameter startsWith the
     * current transforming module ID with normalization of paths capabilities and
     * cross platform / OS compatibilities.
     * @param startsWith - String to start with
     * @returns boolean
     */
    idStartsWith: (startsWith: string) => boolean
    /**
     * A helper function to help to determine whether the passed string parameter endsWith the
     * current transforming module ID with normalization of paths capabilities and
     * cross platform / OS compatibilities.
     * @param endsWith - String to end with
     * @returns boolean
     */
    idEndsWith: (endsWith: string) => boolean
    /**
     * A helper function to help to determine whether the passed first path parameter
     * equals the second passed string with normalization of paths capabilities and
     * cross platform / OS compatibilities.
     * @param path - Path to be compared with
     * @param equalsWith - String to equal with
     * @returns boolean
     */
    pathEquals: (path: string, equalsWith: string) => boolean
    /**
     * A helper function to help to determine whether the passed first path parameter
     * startsWith the second passed string with normalization of paths capabilities and
     * cross platform / OS compatibilities.
     * @param path - Path to be compared with
     * @param startsWith - String to start with
     * @returns boolean
     */
    pathStartsWith: (path: string, startsWith: string) => boolean
    /**
     * A helper function to help to determine whether the passed first path parameter
     * endsWith the second passed string with normalization of paths capabilities and
     * cross platform / OS compatibilities.
     * @param path - Path to be compared with
     * @param endsWith - String to end with
     * @returns boolean
     */
    pathEndsWith: (path: string, endsWith: string) => boolean
  }
}

export interface MarkdownSectionWrapperOptions {
  /**
   * The list of file names to exclude from the transformation
   * @default ['index.md']
   */
  excludes?: string[]
  /**
   * The function to exclude the file from the transformation
   * @param id - the current transforming module ID (comes from vite when transform hook is called)
   * @param context - the context object, contains several helper functions
   * @returns boolean
   * @default () => false
   */
  exclude?: (id: string, context: Context) => boolean
}

export function MarkdownSectionWrapper(headerTransformers: ((frontmatter: string | null, text: string, id: string) => string)[], footerTransformers: ((frontmatter: string | null, text: string, id: string) => string)[], options?: MarkdownSectionWrapperOptions): Plugin {
  const {
    excludes = ['index.md'],
    exclude = () => false,
  } = options ?? {}

  let root = ''

  return {
    name: '@pjts/markdown-section-wrapper',
    // May set to 'pre' since end user may use vitepress wrapped vite plugin to
    // specify the plugins, which may cause this plugin to be executed after
    // vitepress or the other markdown processing plugins.
    enforce: 'pre',
    configResolved(config) {
      root = config.root ?? ''
    },
    transform(code, id) {
      function idEndsWith(endsWith: string) {
        return pathEndsWith(relative(root, id), endsWith)
      }

      function idEquals(equals: string) {
        return pathEquals(relative(root, id), equals)
      }

      function idStartsWith(startsWith: string) {
        return pathStartsWith(relative(root, id), startsWith)
      }

      if (!id.endsWith('.md'))
        return null
      if (excludes.includes(id))
        return null
      if (exclude(id, { helpers: { idEndsWith, idEquals, idStartsWith, pathEndsWith, pathEquals, pathStartsWith } }))
        return null

      const frontmatter = (code.match(/(^---$(\s|\S)+?^---$)/m)?.[0] ?? null)
      const text = code.replace(/(^---$(\s|\S)+?^---$)/m, '')

      const headers: string[] = headerTransformers.map(f => f(frontmatter, text, id))
      const footers: string[] = footerTransformers.map(f => f(frontmatter, text, id))

      return [frontmatter, ...headers, text, ...footers].join('')
    },
  }
}

export function TemplateAppSBox(_frontmatter: string | null, _text: string, _id: string): string {
  return `

## 意见反馈

<AppSBox />

`
}

export function TemplateCopyrightInfo(_frontmatter: string | null, _text: string, _id: string): string {
  return `

<CopyrightInfo />

`
}

const ROOT = resolve(__dirname, '../../')

export function PageHeaderTemplate(_frontmatter: string | null, _text: string, id: string): string {
  if (!id.endsWith('.md'))
    return ''

  id = relative(ROOT, id)

  if (id === 'index.md')
    return ''

  return `

# {{ $frontmatter.title }}

<PageInfo />

`
}
