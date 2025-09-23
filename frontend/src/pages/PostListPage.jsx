import { createResource } from 'solid-js';
import { A } from '@solidjs/router';

const fetchPosts = async () => {
  const r = await fetch('/api/posts');
  if (!r.ok) throw new Error('failed');
  return r.json();
};

export default function PostListPage() {
  const [posts] = createResource(fetchPosts);
  return (
    <div class="max-w-3xl mx-auto p-8">
      <h1 class="text-3xl font-light mb-6">Blog</h1>
      <ul class="space-y-4">
        {posts.loading && <li>Loading...</li>}
        {posts.error && <li class="text-red-500">Error</li>}
        {posts()?.map(p => (
          <li>
            <A href={`/blog/${p.slug}`} class="block group">
              <span class="text-xl font-medium group-hover:underline">{p.title}</span>
              <div class="text-xs text-gray-500">{p.date}</div>
              <p class="text-sm text-gray-600 mt-1">{p.excerpt}</p>
            </A>
          </li>
        ))}
      </ul>
    </div>
  );
}
