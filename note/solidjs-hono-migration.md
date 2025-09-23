---
title: "SolidJS + Hono (JS) で SPA ブログ付きポートフォリオに移行する"
date: "2025-09-24"
tags: ["SolidJS","Hono","JavaScript","ブログ","ポートフォリオ"]
---

# SolidJS + Hono (JS) で SPA ブログ付きポートフォリオに移行する

軽量で高速な SPA とシンプルなバックエンドを両立するために、現在の Hono/JSX 🚀 から SolidJS+Hono(JS) への移行プランをまとめました。

---

## 1. プロジェクト構成

```
/frontend       # SolidJS アプリ
  ├─ public/
  └─ src/
      ├─ App.jsx
      ├─ components/
      └─ pages/

/backend        # Hono(JavaScript) API サーバー
  └─ index.js
```

フロントとバックエンドを分離し、それぞれの開発・デプロイを独立して行います。

## 2. フロントエンド：SolidJS

1. テンプレート生成
   ```bash
   pnpm create solid@latest frontend --template vite
   ```
2. `src/App.jsx` とページコンポーネントを `.jsx` で実装
3. API 連携コンポーネント例
   ```js
   // src/components/BlogList.jsx
   import { createResource } from 'solid-js';

   const fetchPosts = () => fetch('/api/posts').then(r => r.json());
   export default function BlogList() {
     const [posts] = createResource(fetchPosts);
     return (
       <ul>
         {posts()?.map(p => <li>{p.title}</li>)}
       </ul>
     );
   }
   ```

## 3. バックエンド：Hono (JS)

1. プロジェクト初期化
   ```bash
   mkdir backend && cd backend
   npm init -y
   npm install hono
   ```
2. `index.js` に API ルートを定義
   ```js
   import { Hono } from 'hono';
   import { getAllPosts } from '../_lib/posts.js'; // content/blog から読み込み

   const app = new Hono();
   app.get('/api/posts', c => c.json(getAllPosts()));
   export default app;
   ```

## 4. TypeScript → JavaScript 移行

- ファイル拡張子を `.tsx` → `.jsx` / `.js` にリネーム
- `tsconfig.json`、`typescript`、`@types/*` を devDependencies から削除
- Vite の esbuild トランスパイルに任せる

## 5. 開発／プロキシ設定

- monorepo 化してルート直下で管理
- `frontend/vite.config.js` で API プロキシ設定:
  ```js
  export default defineConfig({
    server: {
      proxy: { '/api': 'http://localhost:8787' }
    }
  });
  ```

## 6. デプロイオプション

- **Cloudflare Pages + Functions**
  - `frontend` → 静的ホスティング
  - `backend/index.js` → Workers 関数
- **Vercel**
  - 1 リポジトリで両者同時デプロイ


---

最初は「記事一覧だけ取得して表示する」最小限のフローを SolidJS で実装し、動作確認しながら機能追加していきましょう！