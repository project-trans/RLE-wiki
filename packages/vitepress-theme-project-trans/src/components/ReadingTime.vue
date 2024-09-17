<script setup lang="ts">
import { useData } from 'vitepress'

// 获取页面数据
const { frontmatter } = useData()

// 计算阅读时间的函数
function calculateReadingTime(wordCount: number) {
  const wordsPerMinute = 500 // 假设中文阅读速度为每分钟500字
  return Math.ceil(wordCount / wordsPerMinute) // 计算预计阅读时间
}

// 从 frontmatter 获取字数和计算阅读时间
const wordCount = frontmatter.value.wordCount || 0
const readingTime = calculateReadingTime(wordCount)
</script>

<template>
  <div>
    <p>字数: {{ wordCount }} &nbsp; 预计阅读时间: {{ readingTime }} 分钟</p>
  </div>
</template>

<style scoped>
/* 这里可以添加样式 */
</style>
