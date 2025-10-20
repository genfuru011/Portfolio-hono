# Changelog

このリポジトリの主要な変更履歴をまとめます。日付はJST基準。

## 2025-10-20

- 追加
  - 静的配信を有効化（Wrangler `assets`）: `wrangler.toml` に `[assets] directory="./public" binding="ASSETS"` を追加。
  - HonoでASSETS委譲ルートを追加: `/images/*`, `/favicon.ico` を `env.ASSETS.fetch(...)` へ委譲（`src/index.tsx`）。
  - `/tailwind.css` を ASSETS へ委譲するルートを追加（`src/index.tsx`）。
  - Tailwind（ローカルビルド）導入:
    - `src/style.css` を新規作成（`@import "tailwindcss";`）。
    - `public/tailwind.css` をビルド生成し配信。
  - 開発ノートを追加/更新: `note/dev-notes.md`。

- 変更
  - Wrangler設定を整理: `wrangler.toml` を単一ソースに統一し、`compatibility_date = "2025-08-03"` に更新、`main = "src/index.tsx"` に設定。
  - デプロイ時ビルド対応: `wrangler.toml` に `[build] command = "npm run build:css"` を追加（`wrangler deploy` 実行時にCSSを自動生成）。
  - 未使用の環境セクション（`[env.production]`, `[env.development]`）を削除。
  - CSSの読み込みをCDN（Tailwind CDN）→ ローカルファイル `/tailwind.css` に変更（`src/renderer.tsx`）。
  - レンダラーのインライン`<style>`を削除し、Tailwindユーティリティへ一本化（`src/renderer.tsx`）。
  - プロフィール画像の参照先を外部URL → `/images/profile.jpg` に変更（`src/index.tsx`）。
  - `package.json` スクリプトを更新:
    - `build:css`: `tailwindcss -i ./src/style.css -o ./public/tailwind.css --minify`
    - `build`: CSS生成後に `wrangler deploy --dry-run`
    - `deploy`: `wrangler deploy`

- 修正（アクセシビリティ/SEO）
  - `<html lang="ja">` を付与（`src/renderer.tsx`）。
  - `<meta charSet="UTF-8">` に修正（`src/renderer.tsx`）。
  - SVGアイコンに `<title>` を追加（`src/index.tsx`）。

- 削除
  - `wrangler.jsonc`（設定の二重管理解消）。
  - UnoCSS関連ファイル（移行に伴い撤去）: `uno.config.ts`, `public/uno.css`。
  - `note/dev-notes.md`（内容は本 `changelog.md` に統合）。

- デプロイ
  - Cloudflare Workers へデプロイ済み。
  - 公開URL: https://portfolio-hono.h-furugen-24-7-1533.workers.dev

備考
- Biomeのa11y警告（`noSvgWithoutTitle` / `useHtmlLang`）は解消済み。
- 追加のSEO（OG/Twitter/JSON-LD、sitemap/robots）は今後の拡張候補です。
