<script setup lang="ts">
import { ref, watch } from 'vue';
import { NolebaseGitChangelog } from '@nolebase/vitepress-plugin-git-changelog/client';
import { useRoute } from 'vitepress';

const route = useRoute();

// 定义一个 ref 来存储动态 key
const componentKey = ref(0);
const frontmatter = ref({});

// 监听路由变化，更新 key 和 frontmatter
watch(() => route.path, () => {
  componentKey.value += 1;
  // 获取 Frontmatter
  frontmatter.value = route.data?.frontmatter || {};
});
</script>

<template>
  <div :key="componentKey" class="vp-doc">
    <h2 id="意见反馈">
      意见反馈
    </h2>
    <AppSBox />
    <!-- 仅在 Frontmatter 中未设置 hideChangelog 时渲染 GitChangelog -->
    <NolebaseGitChangelog v-if="!frontmatter.hideChangelog" />
  </div>
</template>
