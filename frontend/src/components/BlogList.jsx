import { createResource } from 'solid-js';

const fetchPosts = async () => {
  try {
    const res = await fetch('/api/posts');
    if (!res.ok) {
      console.error('Fetch /api/posts failed', res.status);
      throw new Error('Failed to fetch posts');
    }
    const data = await res.json();
    console.debug('Posts fetched:', data);
    return data;
  } catch (e) {
    console.error('Error fetching posts:', e);
    throw e;
  }
};

export default function BlogList() {
  const [posts] = createResource(fetchPosts);
  return (
    <div>
      <ul class="list-disc pl-6 space-y-2">
        {posts.loading && <li>Loading...</li>}
        {posts.error && (
          <li class="text-red-500">Error: {posts.error.message}</li>
        )}
        {posts()?.length === 0 && !posts.loading && !posts.error && (
          <li class="text-gray-500">No posts.</li>
        )}
        {posts()?.map((p) => (
          <li>{p.title}</li>
        ))}
      </ul>
      <pre class="mt-4 text-xs bg-gray-100 p-2 rounded overflow-auto">
        {JSON.stringify({ loading: posts.loading, error: posts.error?.message, count: posts()?.length }, null, 2)}
      </pre>
    </div>
  );
}
