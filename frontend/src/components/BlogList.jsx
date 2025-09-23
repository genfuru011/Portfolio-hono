import { createResource } from 'solid-js';

const fetchPosts = async () => {
  const res = await fetch('/api/posts');
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
};

export default function BlogList() {
  const [posts] = createResource(fetchPosts);
  return (
    <ul class="list-disc pl-6 space-y-2">
      {posts.loading && <li>Loading...</li>}
      {posts.error && <li class="text-red-500">Error: {posts.error.message}</li>}
      {posts()?.map(p => (
        <li>{p.title}</li>
      ))}
    </ul>
  );
}
