<script setup lang="ts">
import { useRoute } from "vitepress";
import { data } from "./articlesmenu.data";
const route = useRoute();
</script>

<template>
  <ul>
    <li v-for="article in data.menu[route.path].items" :key="article.link">
      <a :href="article.link">{{ article.text }}</a>
    </li>
  </ul>
</template>
