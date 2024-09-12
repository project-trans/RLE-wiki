<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

// 使用 VitePress 的 useData 获取当前页面的 Frontmatter
const { frontmatter } = useData()

// 获取 Frontmatter 中的字数 (wordCount)
const wordCount = computed(() => frontmatter.value.wordCount || 0)

// 每分钟阅读速度，假设 500 字每分钟
const wordsPerMinute = 500

// 根据字数计算预计阅读时间，最少为 1 分钟
const readingTime = computed(() => Math.max(Math.ceil(wordCount.value / wordsPerMinute), 1))
</script>

<template>
  <div v-if="wordCount > 0">
    字数: {{ wordCount }} &nbsp; 预计阅读时间: {{ readingTime }} 分钟
  </div>
</template>
