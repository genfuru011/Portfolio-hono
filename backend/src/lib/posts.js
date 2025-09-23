// Runtime access to prebuilt JSON (generated at dev/deploy)
import postsData from '../../generated/posts.json' assert { type: 'json' };

export function listPosts() {
  // return meta only
  return postsData.map(({ slug, title, date, tags, excerpt }) => ({ slug, title, date, tags, excerpt }));
}

export function getPost(slug) {
  return postsData.find(p => p.slug === slug) || null;
}
