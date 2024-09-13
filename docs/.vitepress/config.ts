import genConfig from '@project-trans/vitepress-theme-project-trans/config'
import type { SidebarOptions } from '@project-trans/vitepress-theme-project-trans/theme'
import type { ThemeContext } from '@project-trans/vitepress-theme-project-trans/utils'
import { withThemeContext } from '@project-trans/vitepress-theme-project-trans/utils'
import type { DefaultTheme } from 'vitepress'
import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'

// 移除 frontmatter 的函数
function removeFrontmatter(content: string): string {
  // 检查并移除从开头到第一个 "---" 区域的内容
  if (content.startsWith('---')) {
    const endOfFrontmatter = content.indexOf('---', 3);
    if (endOfFrontmatter !== -1) {
      return content.slice(endOfFrontmatter + 3).trim(); // 移除 frontmatter 部分
    }
  }
  return content;
}

// 字数统计函数，排除 frontmatter 区域并处理中文和英文字符
function countWords(content: string): number {
  // 首先移除 frontmatter 区域
  const noFrontmatterContent = removeFrontmatter(content);

  const cleanedContent = noFrontmatterContent
    .replace(/```[\s\S]*?```/g, '') // 移除代码块
    .replace(/!\[.*?\]\(.*?\)/g, '') // 移除图片链接
    .replace(/\[.*?\]\(.*?\)/g, '') // 移除普通链接
    .replace(/<\/?[^>]+(>|$)/g, '') // 移除 HTML 标签
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '') // 移除标点符号
    .replace(/\s+/g, ' ') // 将多余的空格归为一个空格
    .trim(); // 去除首尾空格

  // 针对中文字符处理：每个汉字算作一个字
  const chineseCharacters = cleanedContent.match(/[\u4e00-\u9fff\uff01-\uffe5]/g) || [];

  // 英文单词按照空格拆分，统计词数
  const words = cleanedContent.split(/\s+/).filter(Boolean);

  // 返回中文字符和英文单词的总和
  return chineseCharacters.length + words.length;
}

// 从文件系统读取 Markdown 文件内容
function readMarkdownFileContent(filePath: string): string {
  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return fileContent;
  }
  return '';
}

type NavConfig = DefaultTheme.Config['nav']

const nav: NavConfig = [
  {
    text: '大学指南',
    link: '/campus/',
  },
  {
    text: '时尚护理',
    link: '/fashion/',
  },
  {
    text: '安全防护',
    link: '/personal-safety/',
  },
  {
    text: '其它',
    link: '/others/',
  },
  {
    text: '贡献指南',
    items: [
      {
        text: '校园版块投稿指南',
        link: '/contributor-guide/campus.md',
      },
      {
        text: '其他投稿指南',
        link: '/contributor-guide/other.md',
      },
      {
        text: '校园版块贡献模板',
        link: '/contributor-guide/CampusTemplate.md',
      },
    ],
  },
]

const baseConfig = {
  useTitleFromFrontmatter: true,
  useFolderTitleFromIndexFile: true,
  useFolderLinkFromIndexFile: true,
  excludeFilesByFrontmatterFieldName: true,
  collapsed: true,
  documentRootPath: '/docs',
} satisfies Partial<SidebarOptions>

const sidebarOptions = [
  {
    ...baseConfig,
    scanStartPath: 'campus',
    resolvePath: '/campus/',
  },
  {
    ...baseConfig,
    scanStartPath: 'contributor-guide',
    resolvePath: '/contributor-guide/',
  },
  {
    ...baseConfig,
    scanStartPath: 'fashion',
    resolvePath: '/fashion/',
  },
  {
    ...baseConfig,
    scanStartPath: 'personal-safety',
    resolvePath: '/personal-safety/',
  },
  {
    ...baseConfig,
    scanStartPath: 'others',
    resolvePath: '/others/',
  },
]

const themeConfig: ThemeContext = {
  siteTitle: 'RLE.wiki',
  siteDescription: '一份 RLE 指北',
  githubRepoLink: 'https://github.com/project-trans/RLE-wiki',
  rootDir: 'docs',
  include: ['campus', 'contributor-guide', 'fashion'],
  nav,
  sidebarOptions,
}

// 包装主题配置
const wrappedConfig = withThemeContext(themeConfig, genConfig)

export default defineConfig({
  ...wrappedConfig,
  transformPageData(pageData) {
    // 构建 Markdown 文件路径
    const markdownFile = `${pageData.relativePath}`;

    const filePath = path.join(process.cwd(), 'docs', markdownFile);

    // 从文件系统读取文件内容
    const content = readMarkdownFileContent(filePath);

    // 统计字数并插入到 Frontmatter
    const wordCount = countWords(content);

    return {
      frontmatter: {
        ...pageData.frontmatter,
        wordCount // 将字数写入 Frontmatter
      }
    };
  }
});
