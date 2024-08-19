import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import prism from 'remark-prism'

const postsDirectory = join(process.cwd(), 'articles')

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
}

export function getPostBySlug(slug, fields = []) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const items = {}

  fields.forEach(field => {
    if (field === 'slug') {
      items[field] = realSlug
    }

    if (field === 'content') {
      items[field] = content
    }

    if (data[field]) {
      items[field] = data[field]
    }
  })

  return items
}

export function getAllPosts(fields = [], categories = []) {
  const slugs = getPostSlugs()
  const posts = slugs
    .map(slug => getPostBySlug(slug, fields))

  // Helper function to check if any element in the array `arr` exists in `target`
  function arrayIntersection(arr, target) {
    return arr.some(item => target.includes(item));
  }

  // Filter posts by categories if provided
  const filteredPosts = categories.length > 0
    ? posts.filter(post => {
      // Check if post.category is an array or a single value
      const postCategories = Array.isArray(post.category) ? post.category : [post.category];
      return arrayIntersection(postCategories, categories);
    })
    : posts

  // Sort posts by date in descending order
  return filteredPosts.sort((post1, post2) => post1.date > post2.date ? -1 : 1)

}

export async function convertMarkdownToHtml(markdown) {
  const result = await remark()
    .use(html, { sanitize: false })
    .use(prism)
    .process(markdown)
  return result.toString()
}
