import { Hono } from 'hono';

const app = new Hono();

// Temporary posts data (to be replaced with markdown loader)
const posts = [
  { id: 1, slug: 'first-post', title: 'First Post', body: 'Hello Solid + Hono Backend' },
  { id: 2, slug: 'migration-note', title: 'Migration Note', body: 'Tracking the migration progress' }
];

app.get('/api/health', (c) => c.json({ status: 'ok', ts: Date.now() }));
app.get('/api/posts', (c) => c.json(posts.map(({ body, ...rest }) => rest)));
app.get('/api/posts/:slug', (c) => {
  const slug = c.req.param('slug');
  const post = posts.find(p => p.slug === slug);
  if (!post) return c.json({ message: 'Not Found' }, 404);
  return c.json(post);
});

export default app;
