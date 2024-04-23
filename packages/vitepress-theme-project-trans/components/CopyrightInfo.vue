<script setup lang="ts">
import { useData } from 'vitepress'
import type { Node, Trie } from '../plugins/CopyrightLoader.data'
import { data } from '../plugins/CopyrightLoader.data'

function searchClosestInTrie(
  that: Trie<Record<string, any>>,
  path: string[],
  node: Node<Record<string, any>> = that.root,
): Record<string, any> | null {
  if (path.length === 0)
    return node.value

  if (path[0] in node.children) {
    let value = searchClosestInTrie(
      that,
      path.slice(1),
      node.children[path[0]],
    )
    if (value === null)
      value = node.value

    return value
  }
  return node.value
}

const paths = useData()
  .page.value.relativePath.replace('.md', '').split('/')
  .filter((item: string) => item !== '')
const attrs = searchClosestInTrie(data, paths)
const frontmatter = useData().frontmatter.value

const originUrlExists = (attrs?.copyright?.url ?? null) != null
const originUrl = attrs?.copyright?.url ?? 'javascript:void(0)'

const license = attrs?.copyright?.license ?? null
const licenseExists = license != null
const licenseUrlExists = (attrs?.copyright?.licenseUrl ?? null) != null
const licenseUrl = attrs?.copyright?.licenseUrl ?? 'javascript:void(0)'
</script>

<template>
  <div v-if="attrs?.copyright?.enable ?? false">
    <div class="tip custom-block">
      <p class="custom-block-title">
        Copyright
      </p>
      <p>
        <span>这篇文章 </span>
        <a v-if="originUrlExists" :href="originUrl">{{ frontmatter.title }}</a>
        <span v-else>{{ frontmatter.title }}</span>
        <span> 由 </span>
        <span v-for="author in attrs?.author" :key="author">{{ author }}</span>
        <span> 创作</span>
        <span v-if="licenseExists">
          <span>，Project Trans 在 </span>
          <a v-if="licenseUrlExists" :href="licenseUrl">{{ license }}</a>
          <span v-else>{{ license }}</span>
          <span> 许可下使用</span>
        </span>
        <span>。</span>
      </p>
    </div>
    <hr>
  </div>
</template>
