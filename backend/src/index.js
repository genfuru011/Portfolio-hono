import { Hono } from 'hono';
import { listPosts, getPost } from './lib/posts.js';

const app = new Hono();

app.get('/api/health', (c) => c.json({ status: 'ok', ts: Date.now() }));
app.get('/api/posts', (c) => c.json(listPosts()));
app.get('/api/posts/:slug', (c) => {
  const slug = c.req.param('slug');
  const post = getPost(slug);
  if (!post) return c.json({ message: 'Not Found' }, 404);
  return c.json(post);
});

export default app;
