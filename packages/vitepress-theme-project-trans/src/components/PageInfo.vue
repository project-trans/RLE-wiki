<script setup lang="ts">
import { useData } from 'vitepress'
import { computed, onMounted, ref, watchEffect } from 'vue'
import ReadingTime from './ReadingTime.vue' // 导入 ReadingTime 组件

// 从 VitePress 获取页面数据
const { frontmatter, page, theme, lang } = useData()

// 计算页面的最后更新时间
const date = computed(
  () => new Date(frontmatter.value.lastUpdated ?? page.value.lastUpdated),
)

// 计算 ISO 格式的日期时间字符串
const isoDatetime = computed(() => date.value.toISOString())

// 定义一个响应式变量来存储格式化后的日期时间字符串
const datetime = ref('')

// 避免 hydration 错误，在组件挂载后执行
onMounted(() => {
  watchEffect(() => {
    // 使用国际化 API 格式化日期时间
    datetime.value = new Intl.DateTimeFormat(
      theme.value.lastUpdated?.formatOptions?.forceLocale ? lang.value : undefined,
      theme.value.lastUpdated?.formatOptions ?? {
        dateStyle: 'short',
        timeStyle: 'short',
      },
    ).format(date.value)
  })
})

// 计算页面的作者信息
const authors = computed(() => {
  let author = (frontmatter.value?.author ?? []) as string[]
  if (!Array.isArray(author))
    author = [author]
  return author
})

// 计算显示的作者信息
const displayAuthors = computed(() => {
  if (authors.value.length === 0) {
    return '匿名'
  }
  else {
    return `${authors.value.join(', ')} 等`
  }
})
</script>

<template>
  <div class="mb-10 mt-4 flex flex-wrap gap-4">
    <div class="inline-flex items-center gap-1">
      <span class="i-octicon:person" />
      <span>作者:</span>
      <span>{{ displayAuthors }}</span>
    </div>

    <div class="inline-flex items-center gap-1">
      <span class="i-octicon:calendar-16" />
      <span>{{ theme.lastUpdated?.text || 'Last updated' }}:</span>
      <time :datetime="isoDatetime">{{ datetime }}</time>
    </div>
    <ClientOnly>
      <ReadingTime /> <!-- 添加 ReadingTime 组件 -->
    </ClientOnly>
  </div>
</template>
