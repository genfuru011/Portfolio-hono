import { jsxRenderer } from "hono/jsx-renderer";

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html lang="ja">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Hiroto Furugen - Portfolio</title>
        <link rel="stylesheet" href="/tailwind.css" />
      </head>
      <body class="min-h-screen py-8">{children}</body>
    </html>
  );
});
