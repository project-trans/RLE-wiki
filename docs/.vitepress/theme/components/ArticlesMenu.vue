<script setup lang="ts">
import { useRoute } from 'vitepress'
import { computed } from 'vue'
import { data } from './articlesmenu.data'

const route = useRoute()
const articles = computed(() =>
  data.menu[route.path].items.map(item => ({
    ...item,
    link: item.link.replace('.md', ''),
  })),
)
</script>

<template>
  <ul>
    <li v-for="article in articles" :key="article.link">
      <a :href="article.link">{{ article.text }}</a>
    </li>
  </ul>
</template>
