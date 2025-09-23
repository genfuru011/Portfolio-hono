import { readFile, readdir, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({ html: false, linkify: true, typographer: true });
const root = path.resolve(process.cwd(), 'content/posts');
const outDir = path.resolve(process.cwd(), 'generated');

async function build() {
  const files = await readdir(root);
  const posts = [];
  for (const file of files) {
    if (!file.endsWith('.md')) continue;
    const full = path.join(root, file);
    const raw = await readFile(full, 'utf-8');
    const { data, content } = matter(raw);
    if (!data.slug) {
      data.slug = file.replace(/\.md$/, '');
    }
    const html = md.render(content);
    posts.push({
      slug: data.slug,
      title: data.title || data.slug,
      date: data.date || new Date().toISOString(),
      tags: data.tags || [],
      html,
      excerpt: content.split(/\n\n/)[0].slice(0, 160),
    });
  }
  // sort by date desc
  posts.sort((a,b) => new Date(b.date) - new Date(a.date));
  await mkdir(outDir, { recursive: true });
  await writeFile(path.join(outDir, 'posts.json'), JSON.stringify(posts, null, 2));
  console.log(`Built ${posts.length} posts.`);
}

build().catch(e => {
  console.error(e);
  process.exit(1);
});
