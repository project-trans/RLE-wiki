<script setup lang="ts">
import { useData } from 'vitepress'
import { nextTick, provide } from 'vue'

const { isDark } = useData()

const isSSR = typeof window === 'undefined'

function enableTransitions() {
  return isSSR
    ? false
    : 'startViewTransition' in document
    && window.matchMedia('(prefers-reduced-motion: no-preference)').matches
}

provide('toggle-appearance', async ({ clientX: x, clientY: y }: MouseEvent) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value
    return
  }

  if (!document.documentElement.classList.contains('VPSwitchAppearance-ViewTransition'))
    document.documentElement.classList.add('VPSwitchAppearance-ViewTransition')

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    )}px at ${x}px ${y}px)`,
  ]

  await (document as any).startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  }).ready

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 500,
      easing: 'ease-in',
      pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`,
    },
  )
})
</script>

<template>
  <slot />
</template>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 9999;
}

.VPSwitchAppearance-ViewTransition .VPSwitchAppearance .check {
  transition: transform 350ms 0ms !important;
}
.VPSwitchAppearance-ViewTransition.dark .VPSwitchAppearance .check {
  transition: transform 350ms 500ms !important;
}
</style>
