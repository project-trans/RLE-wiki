import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// 统计 Markdown 文档字数的函数
function countWords(content) {
  // 移除代码块、HTML 标签、图片链接和普通链接
  const cleanedContent = content
    .replace(/```[\s\S]*?```/g, '') // 移除代码块
    .replace(/!\[.*?\]\(.*?\)/g, '') // 移除图片
    .replace(/\[.*?\]\(.*?\)/g, '') // 移除链接
    .replace(/<\/?[^>]+(>|$)/g, '') // 移除 HTML 标签
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '') // 移除标点符号
    .replace(/[ \t]{2,}/g, ' '); // 移除多余的空格

  // 针对中文字符处理：按照单个字符统计字数
  const chineseCharacters = cleanedContent.match(/[\u4e00-\u9fff]/g) || [];

  // 英文或其他语言，按照单词统计字数
  const words = cleanedContent.trim().split(/\s+/).filter(Boolean);

  // 返回中文字符和英文单词的总和
  return chineseCharacters.length + words.length;
}

// 更新 Frontmatter，插入字数信息
function updateFrontmatterWithWordCount(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  // 使用 gray-matter 解析 Markdown 文件
  const { data, content: mdContent } = matter(fileContent);

  // 统计字数
  const wordCount = countWords(mdContent);

  // 更新 Frontmatter，添加或更新字数信息
  data.wordCount = wordCount;

  // 使用 gray-matter 将更新后的数据写回文件
  const updatedContent = matter.stringify(mdContent, data);
  fs.writeFileSync(filePath, updatedContent, 'utf-8');
  // console.log(`Updated ${filePath} with word count: ${wordCount}`); // 输出更新信息到控制台
}

// 遍历所有 Markdown 文件，更新每个文件的 Frontmatter
function processMarkdownFiles(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const fullPath = path.join(dir, file);

    // 如果是文件夹，递归处理
    if (fs.statSync(fullPath).isDirectory()) {
      processMarkdownFiles(fullPath);
    } else if (file.endsWith('.md')) {
      // 如果是 Markdown 文件，插入字数到 Frontmatter
      updateFrontmatterWithWordCount(fullPath);
    }
  });
}

// 执行脚本
const docsDir = path.resolve(process.cwd(), 'docs');  // 指定需要处理的目录
processMarkdownFiles(docsDir);
