import { createResource } from 'solid-js';
import { useParams, A } from '@solidjs/router';

const fetchPost = async (slug) => {
  const r = await fetch(`/api/posts/${slug}`);
  if (!r.ok) throw new Error('not found');
  return r.json();
};

export default function PostDetailPage() {
  const params = useParams();
  const [post] = createResource(() => params.slug, fetchPost);
  return (
    <div class="max-w-3xl mx-auto p-8 prose prose-sm">
      <p class="mb-4 text-sm"><A href="/blog" class="text-blue-600 hover:underline">← Back</A></p>
      {post.loading && <p>Loading...</p>}
      {post.error && <p class="text-red-500">Error</p>}
      {post() && (
        <article>
          <h1 class="text-3xl font-light mb-2">{post().title}</h1>
          <div class="text-xs text-gray-500 mb-6">{post().date}</div>
          <div innerHTML={post().html} />
        </article>
      )}
    </div>
  );
}
