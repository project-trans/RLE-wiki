<script lang="ts" setup>
import DefaultTheme from 'vitepress/theme'
import {
  NolebaseHighlightTargetedHeading,
} from '@nolebase/vitepress-plugin-highlight-targeted-heading/client'
import {
  NolebaseEnhancedReadabilitiesMenu,
  NolebaseEnhancedReadabilitiesScreenMenu,
} from '@nolebase/vitepress-plugin-enhanced-readabilities/client'

import { useData } from 'vitepress'
import CopyrightInfo from './components/CopyrightInfo.vue'
import AppFooter from './components/AppFooter.vue'
import AppearanceToggle from './components/AppearanceToggle.vue'
import PageInfo from './components/PageInfo.vue'

const { Layout } = DefaultTheme
const { frontmatter } = useData()
</script>

<template>
  <AppearanceToggle>
    <Layout>
      <template #doc-before>
        <div class="vp-doc">
          <h1>{{ frontmatter.title }}</h1>
          <PageInfo />
          <CopyrightInfo />
        </div>
        <NolebaseHighlightTargetedHeading />
      </template>
      <template #doc-after>
        <AppFooter />
      </template>
      <template #nav-bar-content-after>
        <NolebaseEnhancedReadabilitiesMenu />
      </template>
      <template #nav-screen-content-after>
        <NolebaseEnhancedReadabilitiesScreenMenu />
      </template>
    </Layout>
  </AppearanceToggle>
</template>
