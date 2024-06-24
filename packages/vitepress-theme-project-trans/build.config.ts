import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    {
      builder: 'mkdist',
      input: './src',
      outDir: './dist',
      pattern: ['**/*.ts'],
      format: 'esm',
      loaders: ['js'],
    },
    {
      builder: 'mkdist',
      input: './src',
      outDir: './dist',
      pattern: ['**/*.ts'],
      format: 'cjs',
      loaders: ['js'],
    },
    {
      builder: 'mkdist',
      input: './src',
      outDir: './dist',
      pattern: ['**/*.vue'],
      loaders: ['vue'],
    },
  ],
  declaration: true,
  clean: true,
  sourcemap: true,
  rollup: { emitCJS: true },
})
