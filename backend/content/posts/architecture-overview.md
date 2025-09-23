---
slug: architecture-overview
title: ポートフォリオサイト アーキテクチャ概要
date: 2025-09-24
tags: [architecture,cloudflare,hono]
---

<!-- source: note/architecture.md -->

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

(元ノート本文を転載)
