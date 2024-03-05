import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss';
import presetSBox from '@project-trans/suggestion-box/dist/preset';

export default defineConfig({
  shortcuts: [
    ['btn', 'px-4 py-1 rounded inline-flex justify-center gap-2 text-white leading-30px children:mya !no-underline cursor-pointer disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
  ],
  content: {
    pipeline: {
      include: [
        // Default match pattern of UnoCSS
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        // Match suggestion-box
        /.*pjts-suggestion-box.*\.js/,
      ],
    },
  },
  presets: [
    presetUno({
      dark: 'class',
    }),
    presetAttributify(),
    presetIcons({
      prefix: 'i-',
      scale: 1,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
        'min-width': '1.2rem',
      },
      warn: true,
    }),
    presetSBox(),
  ],
})
