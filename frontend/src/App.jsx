import BlogList from './components/BlogList.jsx';
import SocialIcons from './components/SocialIcons.jsx';
import { A } from '@solidjs/router';

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
      <p class="text-sm text-gray-600 mb-4">最新記事はブログ一覧で確認できます。</p>
      <A href="/blog" class="text-blue-600 hover:underline">Go to Blog →</A>
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
