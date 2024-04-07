<script setup lang="ts">
import { useData } from "vitepress";
import { Node, Trie, data } from "../../plugins/CopyrightLoader.data";

function searchClosestInTrie(
  that: Trie<Record<string, any>>,
  path: string[],
  node: Node<Record<string, any>> = that.root
): Record<string, any> | null {
  if (path.length == 0) {
    return    node.value;
  } else {
    if (path[0] in node.childs) {
      let value = searchClosestInTrie(
        that,
        path.slice(1),
        node.childs[path[0]]
      );
      if (value == null) {
        value = node.value;
      }
      return value;
    } else {
      return node.value;
    }
  }
}

const pathes = useData()
  .page.value.relativePath.split("/")
  .filter((item: string) => item !== "");
const attrs = searchClosestInTrie(data, pathes);
const frontmatter = useData().frontmatter.value;

const attrsTitle = attrs?.title ?? "";
const frontmatterTitle = frontmatter?.title ?? "";

const originUrlExists = (attrs?.copyright?.url ?? null) != null;
const originUrl = attrs?.copyright?.url ?? "javascript:void(0)";

const license = attrs?.copyright?.license ?? null;
const licenseExists = license != null;
const licenseUrlExists = (attrs?.copyright?.licenseUrl ?? null) != null;
const licenseUrl = attrs?.copyright?.licenseUrl ?? "javascript:void(0)";
</script>

<template>
  <div v-if="attrs?.copyright?.enable ?? false">
    <br />
    <hr />
    <div class="tip custom-block">
      <p class="custom-block-title">Copyright</p>
      <p>
        <span>这篇文章 </span>
        <a v-if="originUrlExists" :href="originUrl">{{ frontmatter.title }}</a>
        <span v-else>{{ frontmatter.title }}</span>
        <span> 由 </span>
        <span v-for="author in attrs?.author">{{ author }}</span>
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
  </div>
</template>
