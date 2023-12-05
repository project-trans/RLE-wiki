<script setup lang="ts">
import { useData } from 'vitepress'
import { computed, onMounted, ref, watchEffect } from 'vue';

const { frontmatter, page, theme, lang  } = useData()

const date = computed(
  () => new Date(frontmatter.value.lastUpdated ?? page.value.lastUpdated)
)
const isoDatetime = computed(() => date.value.toISOString())

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
  <div class="flex flex-wrap gap-4 mt-4 mb-10">
    <div class="inline-flex items-center gap-1">
      <span class="i-octicon:person" />
      <span>作者:</span>
      <span class="space-x-2">
        <span v-for="author of authors">
          {{ author }}
        </span>
      </span>
    </div>

    <div class="inline-flex items-center gap-1">
      <span class="i-octicon:calendar-16" />
      <span>{{ theme.lastUpdated?.text || 'Last updated' }}:</span>
      <time :datetime="isoDatetime">{{ datetime }}</time>
    </div>
  </div>
</template>
