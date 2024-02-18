// uou won't need other imports
import fs from 'fs'
import path from 'path'

// gets path to `articles` dir in current working dir
const root = path.join(process.cwd(), 'articles')

export async function getSlugs(): Promise<string[]> {
  // DONE: return discovered slugs in filesystem from `root`
  const slugs = fs.readdirSync(root)

  return slugs.map((slug) => slug.split('.')[0])
}

export async function getArticle(slug: string):Promise<string> {
  // DONE: get the text from a markdown file with the given `slug`
  // `slug` can be, e.g., `hello-world`, `the-success`, etc.
  // const text = 'Not implemented.'
  try {
    return fs.readFileSync(root + '/' + slug + '.md').toString()

  } catch (error) {
    console.error(error)
    return "Article not found"
  }
}

export async function postArticle(slug: string, content: string): boolean {
  // DONE: create markdown file in filesystem with slug and content
  // return `true` on success
  // must handle any errors and exceptions -> should then return `false`
  try {
    fs.writeFileSync(root + '/' + slug + '.md', content)
    return true
  } catch (error) {
    console.error(error)
    return false
  }
  
}
