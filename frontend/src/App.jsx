import BlogList from './components/BlogList.jsx'; // (legacy/debug - kept temporarily)
import SocialIcons from './components/SocialIcons.jsx';
import { A } from '@solidjs/router';
import { createResource } from 'solid-js';

function BlogPreview() {
  const fetchPosts = async () => {
    const r = await fetch('/api/posts');
    if (!r.ok) throw new Error('Failed');
    return r.json();
  };
  const [posts] = createResource(fetchPosts);
  return (
    <div class="mt-4 border border-gray-200 rounded-lg p-4 bg-white/60 shadow-sm">
      {posts.loading && <p class="text-sm text-gray-500">Loading...</p>}
      {posts.error && <p class="text-sm text-red-500">Failed to load.</p>}
      <ul class="divide-y divide-gray-100">
        {posts()?.slice(0,3).map(p => (
          <li class="py-3 first:pt-0 last:pb-0">
            <A href={`/blog/${p.slug}`} class="group block">
              <div class="flex items-start justify-between">
                <span class="font-medium text-gray-900 group-hover:underline">{p.title}</span>
                <span class="ml-4 shrink-0 text-[11px] text-gray-400 tabular-nums">{p.date}</span>
              </div>
              {p.excerpt && <p class="mt-1 text-xs text-gray-600 line-clamp-2">{p.excerpt}</p>}
            </A>
          </li>
        ))}
        {posts()?.length === 0 && !posts.loading && !posts.error && (
          <li class="py-2 text-xs text-gray-500">No posts yet.</li>
        )}
      </ul>
      <div class="mt-4 text-right">
        <A href="/blog" class="text-xs text-blue-600 hover:underline">More →</A>
      </div>
    </div>
  );
}

function Education() {
  return (
    <section class="mb-16">
      <h2 class="text-2xl font-normal text-gray-900 mb-8 flex items-center">
        <span>Educations</span>
      </h2>
      <div class="border-l-2 border-gray-200 pl-8 ml-2">
        <div class="mb-8">
          <div class="flex items-start">
            <div class="flex-shrink-0 w-4 h-4 bg-blue-500 rounded-full -ml-10 mt-1 border-4 border-white shadow" />
            <div class="ml-6">
              <h3 class="text-xl font-medium text-gray-900 mb-1">Hosei University</h3>
              <p class="text-gray-600 mb-2">Bachelor of Arts, BA</p>
              <p class="text-gray-500 text-sm">April 2024 - Present</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section class="mb-16">
      <h2 class="text-2xl font-normal text-gray-900 mb-8">Experience</h2>
      <div class="border-l-2 border-gray-200 pl-8 ml-2">
        <div class="mb-8">
          <div class="flex items-start">
            <div class="flex-shrink-0 w-4 h-4 bg-blue-500 rounded-full -ml-10 mt-1 border-4 border-white shadow" />
            <div class="ml-6">
              <h3 class="text-xl font-medium text-gray-900 mb-1">LayerX Inc.</h3>
              <p class="text-gray-600 mb-2">PMM Intern</p>
              <p class="text-gray-500 text-sm">August 2025 - Present</p>
            </div>
          </div>
        </div>
        <div class="mb-8">
          <div class="flex items-start">
            <div class="flex-shrink-0 w-4 h-4 bg-gray-300 rounded-full -ml-10 mt-1 border-4 border-white shadow" />
            <div class="ml-6">
              <h3 class="text-xl font-medium text-gray-900 mb-1">GMO Internet Inc.</h3>
              <p class="text-gray-600 mb-2">Marketing Strategy Intern</p>
              <p class="text-gray-500 text-sm">December 2024 - July 2025</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BlogSection() {
  return (
    <section class="mb-16">
      <h2 class="text-2xl font-normal text-gray-900 mb-4">Blog</h2>
      <p class="text-sm text-gray-600 mb-4">最新 3 件のプレビューです。</p>
      <BlogPreview />
    </section>
  );
}

export default function App() {
  return (
    <div class="min-h-screen bg-white">
      <div class="max-w-4xl mx-auto px-6 py-16">
        <header class="text-center mb-16">
          <div class="mb-8">
            <img
              src="https://raw.githubusercontent.com/genfuru011/Portfolio-hono/main/public/images/profile.jpg"
              alt="Hiroto Furugen"
              class="w-40 h-40 rounded-full mx-auto mb-8 object-cover shadow-lg border-[3px] border-white"
            />
          </div>
          <h1 class="text-5xl font-normal text-gray-900 mb-8">Hiroto Furugen</h1>
          <SocialIcons />
        </header>
        <main class="max-w-3xl mx-auto">
          <Education />
          <Experience />
          <BlogSection />
        </main>
      </div>
    </div>
  );
}
