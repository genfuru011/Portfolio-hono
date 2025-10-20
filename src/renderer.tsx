import { jsxRenderer } from "hono/jsx-renderer";

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html lang="ja">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Hiroto Furugen - Portfolio</title>
        <link rel="stylesheet" href="/tailwind.css" />
        <style>{`
          body {
            background: #ffffff;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif;
            min-height: 100vh;
            color: #1f2937;
            line-height: 1.6;
          }

          * {
            transition: all 0.2s ease;
          }

          h1 {
            font-weight: 300;
            letter-spacing: -0.02em;
            line-height: 1.2;
          }

          h2 {
            font-weight: 400;
            letter-spacing: -0.01em;
            line-height: 1.3;
          }

          h3 {
            font-weight: 500;
            letter-spacing: 0;
            line-height: 1.4;
          }

          img[alt*="profile" i] {
            border: 3px solid #ffffff;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
          }

          a:hover svg {
            transform: translateY(-1px);
          }

          section {
            scroll-margin-top: 2rem;
          }

          .text-gray-900 {
            color: #111827;
          }

          .text-gray-600 {
            color: #4b5563;
          }

          .text-gray-500 {
            color: #6b7280;
          }
        `}</style>
      </head>
      <body class="min-h-screen py-8">{children}</body>
    </html>
  );
});
