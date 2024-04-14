import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  unocss: true,
  typescript: true,
  vue: true,
  ignores: [
    '**/*/md',
    '**/*.yaml',
    '**/*.yml',
  ],
})
