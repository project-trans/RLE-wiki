<script setup lang="ts">
import { useRoute } from 'vitepress'
import { nextTick, ref, watch } from 'vue'

// 获取路由信息
const route = useRoute()

// 定义响应式变量
const wordCount = ref(0)
const readingTime = ref(0)
const componentKey = ref(0) // 控制组件重新渲染的 key
const isLoaded = ref(false) // 控制是否加载完成

// 计算字数和预计阅读时间的函数
function calculateReadingTime(content: string) {
  const wordsPerMinute = 500 // 假设中文阅读速度为每分钟500字

  // 定义一个误差值，因为实际字数比读取出的字数约少77个字
  const wordCountOffset = 77

  const chineseText = content.replace(/<[^>]*>|[^\u4E00-\u9FA5]/g, '') // 去除 HTML 标签和非中文字符
  const wordCount = chineseText.length - wordCountOffset // 计算中文字符数
  const readingTime = Math.ceil(wordCount / wordsPerMinute) // 计算预计阅读时间
  return { wordCount, readingTime }
}

// 更新字数和阅读时间的函数
function updateReadingTime() {
  const contentElement = document.querySelector('.VPContent') // 获取文档内容的 DOM 元素
  if (contentElement) {
    const content = contentElement.textContent || '' // 获取纯文本内容
    const { wordCount: wc, readingTime: rt } = calculateReadingTime(content)
    wordCount.value = wc
    readingTime.value = rt
  }
}

// 初始化函数，在页面挂载和路由变化时调用
function initialize() {
  isLoaded.value = false // 重置加载状态
  componentKey.value += 1
  nextTick().then(() => {
    updateReadingTime()
    isLoaded.value = true // 设置加载完成
  })
}

// 监听路由变化，执行初始化
watch(
  route,
  () => {
    initialize()
  },
  { immediate: true },
)
</script>

<template>
  <div v-if="isLoaded" :key="componentKey">
    <p>字数: {{ wordCount }} &nbsp; 预计阅读时间: {{ readingTime }} 分钟</p>
  </div>
</template>

<style scoped>
/* 这里可以添加样式 */
</style>
