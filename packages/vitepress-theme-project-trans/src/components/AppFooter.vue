<script setup lang="ts">
import { ref, watch, } from 'vue';
import { NolebaseGitChangelog } from '@nolebase/vitepress-plugin-git-changelog/client';
import { useRoute } from 'vitepress';

const route = useRoute();

// 定义一个 ref 来存储动态 key
const componentKey = ref(0);
const frontmatter = ref({});
const isFrontmatterLoaded = ref(false);

// 更新 key 和 frontmatter 的函数
const updateKeyAndFrontmatter = () => {
  componentKey.value += 1;
  frontmatter.value = route.data?.frontmatter || {};
  isFrontmatterLoaded.value = true;
};

// 监听路由变化，更新 key 和 frontmatter
watch(() => route.path, () => {
  isFrontmatterLoaded.value = false;
  updateKeyAndFrontmatter();
}, { immediate: true }); // 在组件挂载时立即执行一次，确保第一次渲染时 key 和 frontmatter 是正确的

// 在组件挂载时更新 key 和 frontmatter
// onMounted(updateKeyAndFrontmatter);
</script>

<template>
  <div :key="componentKey" class="vp-doc">
    <h2 id="意见反馈">
      意见反馈
    </h2>
    <AppSBox />
    <!-- 仅在 Frontmatter 加载完成且未设置 hideChangelog 时渲染 GitChangelog -->
    <NolebaseGitChangelog v-if="isFrontmatterLoaded && !frontmatter.hideChangelog" />
  </div>
</template>
