# ポートフォリオサイト アーキテクチャ概要

このドキュメントは、HonoとCloudflare Workersを基盤としたポートフォリオサイトのアーキテクチャについて説明します。

## 1. アーキテクチャ図

```mermaid
graph TD
    subgraph "User Client"
        A[User's Browser]
    end

    subgraph "Cloudflare Network"
        B[Cloudflare Edge] --> C{Hono Application on Worker}
    end

    subgraph "Application Logic (on Worker)"
        C --> D[Renderer Middleware]
        C --> E[App Component (JSX)]
    end

    subgraph "External Services"
        F[Tailwind CSS CDN]
        G[GitHub Raw Content]
    end

    A -- "1. HTTPS Request" --> B
    D -- "2. Renders HTML Shell" --> C
    E -- "3. Renders Page Content" --> C
    C -- "4. Returns HTML Response" --> A
    A -- "5. Fetches CSS" --> F
    A -- "6. Fetches Image" --> G
```

## 2. 主要コンポーネント

このプロジェクトは、シンプルさ、パフォーマンス、保守性を重視したコンポーネントで構成されています。

### フレームワーク: Hono
- **役割**: リクエストのルーティングとレスポンスの生成を担当するWebフレームワーク。
- **採用理由**: 超高速かつ軽量で、Cloudflare Workersのようなエッジコンピューティング環境に最適化されています。Express.jsに似たAPIは学習コストが低く、開発効率を高めます。

### 実行環境: Cloudflare Workers
- **役割**: アプリケーションコードを実行するサーバーレスプラットフォーム。
- **採用理由**: 世界中のエッジロケーションでコードを実行するため、ユーザーに最も近い場所からコンテンツを配信でき、非常に低遅延です。コールドスタートがほぼゼロである点も大きな利点です。

### ビルドツール: Vite
- **役割**: TypeScriptとJSXで書かれたソースコードを、Cloudflare Workersで実行可能な単一のJavaScriptファイルにバンドルします。
- **採用理由**: `@cloudflare/vite-plugin` を利用することで、Cloudflare Workersへのデプロイプロセスを簡素化できます。高速なビルドとHMR（ホットリロード）により、快適な開発体験を提供します。

### スタイリング: Tailwind CSS (CDN) + インラインCSS
- **役割**: サイトの見た目を定義します。
- **採用理由**: Cloudflare Workersはファイルシステムへのアクセスに制約があるため、静的なCSSファイルをホスティングするのは複雑です。この問題を回避するため、Tailwind CSSをCDNから直接読み込み、アプリケーション固有のカスタムスタイルはHTMLにインラインで埋め込んでいます。これにより、追加の設定なしで確実なスタイリングを実現しています。

### アセット管理: GitHub Raw URL
- **役割**: プロフィール画像などの静的アセットを配信します。
- **採用理由**: スタイリングと同様の理由で、アセットをWorkerから直接配信する代わりに、GitHubリポジトリのrawコンテンツURLを利用しています。これにより、Cloudflare R2などのオブジェクトストレージを設定する手間を省き、アーキテクチャをシンプルに保っています。

## 3. リクエストのライフサイクル

ユーザーがサイトにアクセスしてからページが表示されるまでの流れは以下の通りです。

1.  **リクエスト**: ユーザーのブラウザがポートフォリオサイトのURLにHTTPSリクエストを送信します。
2.  **エッジでの実行**: リクエストは最も近いCloudflareのエッジサーバーに到達し、デプロイされたHonoアプリケーション（Worker）を起動します。
3.  **ミドルウェア処理**: Honoの`renderer`ミドルウェアが実行され、HTMLの基本構造（`<html>`, `<head>`, `<body>`タグ）、CDN版Tailwind CSSの`<script>`タグ、インラインCSSを含むHTMLの骨格を準備します。
4.  **コンテンツレンダリング**: ルートハンドラ（`/`）が`App`コンポーネント（JSX）をサーバーサイドでレンダリングし、具体的なページコンテンツ（プロフィール、経歴など）を生成します。
5.  **レスポンス**: レンダリングされたコンテンツがHTMLの骨格に埋め込まれ、完成したHTMLがレスポンスとしてブラウザに返されます。
6.  **ブラウザでの処理**: ブラウザは受け取ったHTMLを解釈し、CDNからTailwind CSSを、GitHubからプロフィール画像をそれぞれ非同期で取得してページを完全に表示します。
