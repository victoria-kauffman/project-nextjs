import Link from 'next/link'
import styles from './page.module.css'
import { getSlugs, postArticle } from '@/lib/api'
import { revalidatePath } from 'next/cache'

async function getLinks(): Promise<
  {
    name: string
    href: string
  }[]
> {
  // DONE: make this dynamically query
  // hint: `getSlugs`
  const slugs = getSlugs();

  return getSlugs().then( function (slugs) {
    // Build the map of links
    let links:
      {
        name: string
        href: string
      }[] = [];

    slugs.forEach(slug => {
      // Format the name :(
      let words = slug.split('-');
      for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substring(1);
      }
      let name = decodeURIComponent(words.join(" "));
      
      links.push(
        {
          name: name,
          href: '/articles/' + slug,
        })
    });

    return links
  });
}

export default async function Home() {
  const links = await getLinks()

  const saveArticle = async (formData: FormData) => {
    "use server"
    let title = formData.get('title')
    let content = formData.get('content')

    // Prepare data
    title = (title !== null) ? 
      encodeURIComponent(title.toString()
        .replaceAll(' ', '-').toLowerCase()) 
      : ''
    content = (content !== null) ? content.toString() : ''

    postArticle(title, content)

    revalidatePath('/')
  }

  return (
    <>
      <main>
        <ul>
          {
            // DONE: use `map` to render links with `Link` component
            // wrapped in ? elements
            links.map(({name, href}) => (
              <li>
                <Link href={href}>{name}</Link>
              </li>
            ))
          }
        </ul>
      </main>

      {
        // DONE: use Next.js server actions to
        // ultimately `postArticle` in `api.ts`
        // there are also HTML attribute problems
        
      }
      <form className={styles.articleForm} action={saveArticle}>
        <input type='text' name='title' className={styles.articleEditor} required/>
        <textarea name='content' className={styles.articleEditor} />
        <button>Post Article</button>
      </form>
    </>
  )
}
