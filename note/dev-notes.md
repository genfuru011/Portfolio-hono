# 開発ノート（Biome/Lint 対応）

最終更新: 2025-10-20

## 現状整理
- このリポジトリでは ESLint/Prettier/Biome 等の設定ファイルは未検出。
- TypeScript は `tsconfig.json` の `jsxImportSource: "hono/jsx"` を使用。
- ユーザー報告: Biome による構文の警告が発生。
- Wrangler 設定: `wrangler.toml` と `wrangler.jsonc` が併存していた。

## 仮説（警告の主因）
- JSX 属性名の相違: `<meta charset>` は JSX では通常 `charSet`。
- Hono JSX は `class` 属性を利用するため、React 想定のルールだと `className` を要求して誤検知する可能性。

## 暫定対応
1. `renderer.tsx` の `<meta charset>` を `<meta charSet>` に修正（JSX 慣例に合わせる）。
2. `src/index.tsx` の各ソーシャルアイコン SVG に `<title>` を追加（`biome lint/a11y/noSvgWithoutTitle` 回避）。
3. ルート要素 `<html>` に `lang` を付与（`biome lint/a11y/useHtmlLang` 回避）。現状は英語表記が多いため `lang="en"` を設定。日本語中心にする場合は `ja` に変更推奨。
4. Wrangler 設定を「提案B」に統一：
   - `wrangler.toml` の `main = "dist/_worker.js"`、`compatibility_date = "2025-08-03"`、`[build] command = "vite build"`
   - `wrangler.jsonc` を削除
   - `package.json` の `build` を `vite build` に変更
5. 利用していない `env.*` セクションを `wrangler.toml` から削除（デプロイ時の環境警告解消）。
6. Biome の実行ログ（該当ファイル/行/ルールID）を共有いただき、他の警告があれば順次対応。

## 恒久対応（提案）
- Biome 設定を追加し、Hono の JSX 事情（`jsxImportSource: "hono/jsx"`）に合わせる。
- React 前提のプロパティ検証で誤検知する場合は、該当ルールのみをスコープ最小で無効化、または `/* biome-ignore ... */` をピンポイント付与。

## 次アクション
- Biome の警告出力（コマンド、全文ログ）を共有いただく。
- 共有ログに基づき設定ファイル（`biome.json` など）追加の提案と最小修正の確定。
- アイコンが装飾目的のみの場合は `<svg aria-hidden="true">` 化 + 親要素（リンク等）に `aria-label` 付与へ見直し（重複読み上げ防止）。
