<script setup lang="ts">
import { useData } from 'vitepress'
import { computed, onMounted, ref, watchEffect } from 'vue';

const data = useData()
const { frontmatter, page, theme, lang  } = data
console.log('page data:', data)


const date = computed(
  () => new Date(frontmatter.value.lastUpdated ?? page.value.lastUpdated)
)

const datetime = ref('')
// Avoid hydration errors
onMounted(() => {
  watchEffect(() => {
    datetime.value = new Intl.DateTimeFormat(
      theme.value.lastUpdated?.formatOptions?.forceLocale ? lang.value : undefined,
      theme.value.lastUpdated?.formatOptions ?? {
        dateStyle: 'short',
        timeStyle: 'short'
      }
    ).format(date.value)
  })
})

const authors = computed(() => {
  let author = (frontmatter.value?.author ?? []) as string[]
  if (!Array.isArray(author))
    author = [author]

  if (!author.length)
    author = ['匿名']

  return author
})

</script>

<template>
  <div>
    <span>
      作者:
      <span v-for="(author, index) of authors">
        {{ index > 0 ? ' /' : '' }}
        {{ author }}
      </span>
    </span>

    <span>
      最后更新: {{ datetime }}
    </span>

    <span>
      字数: {{ 'TODO' }}
    </span>

    <span>
      阅读时间: {{ 'TODO' }}
    </span>
  </div>
</template>
