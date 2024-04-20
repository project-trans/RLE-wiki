<script setup lang="ts">
import { NolebaseGitChangelog } from '@nolebase/vitepress-plugin-git-changelog/client'
</script>

<template>
  <div class="vp-doc">
    <h2 id="意见反馈">
      意见反馈
    </h2>
    <AppSBox />
    <h2 id="文件历史">
      文件历史
    </h2>
    <NolebaseGitChangelog />
  </div>
</template>
