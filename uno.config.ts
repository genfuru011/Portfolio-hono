import {
  defineConfig,
  presetWind,
  presetTypography,
  transformerVariantGroup,
  transformerDirectives,
} from "unocss";

export default defineConfig({
  presets: [
    // Tailwind互換のスケール/ユーティリティを優先して見た目のズレを最小化
    presetWind(),
    presetTypography(),
  ],
  transformers: [transformerVariantGroup(), transformerDirectives()],
  // 現状のクラスはTailwindに近い命名のため、presetUnoで概ね再現できます。
});
