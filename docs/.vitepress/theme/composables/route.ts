import { useRoute } from 'vitepress'
import { computed } from 'vue'
import { rootDir } from '../../meta'

export function useRawPath() {
  const route = useRoute()
  return computed(() => {
    let path = decodeURIComponent(route.path).toLowerCase()
    if (path.endsWith('/')) {
      path += 'index.md'
    } else {
      path = path.replace(/^\/(.+?)(\.html)?$/s, '$1.md')
    }
    return pathJoin(rootDir, path).toLowerCase()
    })
}

export function pathJoin(...args: string[]) {
  return args.map((part, i) => {
    if (i === 0) {
      return part.trim().replace(/[\/]*$/g, '')
    } else {
      return part.trim().replace(/(^[\/]*|[\/]*$)/g, '')
    }
  }).filter(x=>x.length).join('/')
}
