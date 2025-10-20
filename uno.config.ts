import { defineConfig, presetUno, presetTypography, transformerVariantGroup, transformerDirectives } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetTypography(),
  ],
  transformers: [
    transformerVariantGroup(),
    transformerDirectives(),
  ],
  // 現状のクラスはTailwindに近い命名のため、presetUnoで概ね再現できます。
});
