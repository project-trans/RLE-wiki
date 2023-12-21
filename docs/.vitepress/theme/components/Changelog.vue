<script setup lang="ts">
// @ts-expect-error virtual
import changelog from '/virtual-changelog'
import { CommitInfo } from '../../types'
import { renderCommitMessage } from '../../utils'
import { githubRepoLink } from "../../meta"
import { useRawPath } from '../composables/route'
import { useCommits } from '../composables/changelog'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
import { computed } from 'vue'
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)


const rawPath = useRawPath()

const allCommits = changelog as CommitInfo[]
const commits = useCommits(allCommits, rawPath)

const lastChangeDate = computed(() => {
  const date: string = commits.value[0]?.date || ''
  if (!date) return null
  return dayjs(date)
})

const isFreshChange = computed(() => {
  if (!lastChangeDate.value) return false
  return lastChangeDate.value.isAfter(dayjs().subtract(1, 'day'))
})
</script>

<template>
  <em v-if="!commits.length" opacity="70">暂无最近变更历史</em>

  <details v-else class="details custom-block [&_svg]:open:-rotate-180" :class="isFreshChange && '!bg-green/16'">
    <summary style="list-style: none" class="flex justify-between items-center">
      <span class="inline-flex items-center gap-3">
        <span class="i-octicon:history-16" />
        <span v-if="commits[0]">
          此文档最后编辑于 {{ lastChangeDate?.fromNow() }}
        </span>
      </span>
      <span class="inline-flex items-center gap-3 !font-400">
        <span>
          查看全部
        </span>
        <svg class="i-octicon:chevron-down-16" />
      </span>
    </summary>

    <div class="my-2 grid grid-cols-[30px_auto] -ml-1.5 gap-1.5 children:my-auto">
      <template v-for="(commit, idx) of commits" :key="commit.hash">
        <!-- <template v-if="idx === 0 && !commit.version">
          <div m="t-1" />
          <div m="t-1" />
          <div class="m-auto inline-flex bg-gray-400/10 w-7 h-7 rounded-full text-sm opacity-90">
            <div class="i-octicon:git-pull-request-draft-16" m="auto" />
          </div>
          <div>
            <code>Pending for release...</code>
          </div>
        </template> -->
        <template v-if="commit.version">
          <div m="t-1" />
          <div m="t-1" />
          <div class="m-auto inline-flex bg-gray-400/10 w-7 h-7 rounded-full text-sm opacity-90">
            <div class="i-octicon:rocket-16" m="auto" />
          </div>
          <div>
            <a :href="`${githubRepoLink}/releases/tag/${commit.version}`" target="_blank">
              <code class="!text-primary font-bold">{{ commit.version }}</code>
            </a>
            <span class="opacity-50 text-xs"> on {{ new Date(commit.date).toLocaleDateString() }}</span>
          </div>
        </template>
        <template v-else>
          <div class="i-octicon:git-commit-16 m-auto transform rotate-90 opacity-30" />
          <div>
            <a :href="`${githubRepoLink}/commit/${commit.hash}`" target="_blank">
              <code class="!text-xs !text-$vt-c-text-2 !hover:text-primary">{{ commit.hash.slice(0, 5) }}</code>
            </a>
            <span text="sm">
              -
              <span v-html="renderCommitMessage(commit.message)" />
            </span>

            <span class="opacity-50 text-xs"> on {{ new Date(commit.date).toLocaleDateString() }}</span>
          </div>
        </template>
      </template>
    </div>
  </details>
</template>
