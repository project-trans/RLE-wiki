import { ContentData, createContentLoader, defineLoader } from "vitepress";

let contentLoader = createContentLoader('/**/*.md')

export interface Node<T> {
    value: T | null;
    children: { [key: string]: Node<T> };
}

export interface Trie<T> {
    root: Node<T>;
    insert(path: string[], value: T, node: Node<T>): void;
    insert(path: string[], value: T): void;
}

declare const data: Trie<Record<string, any>>
export { data };

// noinspection JSUnusedGlobalSymbols
export default defineLoader({
    watch: contentLoader.watch,
    async load(): Promise<Trie<Record<string, any>>> {
        let raw: ContentData[] = await contentLoader.load()
        let trie: Trie<Record<string, any>> = {
            root: { value: null, children: {} },

            insert(this: Trie<Record<string, any>>, path, value, node: Node<Record<string, any>> = this.root) {
                if (path.length === 0) {
                    node.value = value
                } else if (path.length === 1) {
                    if (!(path[0] in node.children)) {
                        node.children[path[0]] = { value: value, children: {} }
                    } else {
                        node.children[path[0]].value = value
                    }
                } else {
                    if (!(path[0] in node.children)) {
                        let new_node = { value: null, children: {} }
                        this.insert(path.slice(1), value, new_node)
                        node.children[path[0]] = new_node
                    } else {
                        this.insert(path.slice(1), value, node.children[path[0]])
                    }
                }
            }
        }
        for (let v of raw) {
            let frontmatter = v.frontmatter ?? null
            let copyright = frontmatter?.copyright ?? null
            if (copyright !== null) {
                trie.insert(v.url.split('/').filter((item, _index, _array) => item !== ''), {
                    author: frontmatter.author ?? null,
                    title: frontmatter.title ?? null,
                    copyright: copyright
                })
            }
        }
        return trie;
    }
})
