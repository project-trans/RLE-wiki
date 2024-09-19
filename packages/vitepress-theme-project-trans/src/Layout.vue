<script lang="ts" setup>
import DefaultTheme from 'vitepress/theme'
import {
  NolebaseHighlightTargetedHeading,
} from '@nolebase/vitepress-plugin-highlight-targeted-heading/client'
import {
  NolebaseEnhancedReadabilitiesMenu,
  NolebaseEnhancedReadabilitiesScreenMenu,
} from '@nolebase/vitepress-plugin-enhanced-readabilities/client'

import AppFooter from './components/AppFooter.vue'
import AppearanceToggle from './components/AppearanceToggle.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <AppearanceToggle>
    <Layout>
      <template #doc-top>
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
