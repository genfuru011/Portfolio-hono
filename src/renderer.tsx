import { jsxRenderer } from "hono/jsx-renderer";
import { Link, ViteClient } from "vite-ssr-components/hono";

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html>
      <head>
        <ViteClient />
        <link rel="stylesheet" href="src/style.css" />
      </head>
      <body class="min-h-screen py-8">{children}</body>
    </html>
  );
});
