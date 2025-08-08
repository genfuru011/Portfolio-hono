import { jsxRenderer } from "hono/jsx-renderer";

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Hiroto Furugen - Portfolio</title>
        <link href="/src/style.css" rel="stylesheet" />
      </head>
      <body class="min-h-screen py-8">{children}</body>
    </html>
  );
});
