import { getArticle } from '@/lib/api'
import Link from 'next/link'

export default function ArticlePage({params}: {
  params: { slug: string }
}) {
  // DONE: get `slug` and use to get article
  // please do not use hacky URL mutations
  // check Next.js docs :)

  return getArticle(params.slug).then(function (a) {
      let html = a.split('\n').map(str => <p>{str}</p>)
    return (
      <main>
          <div>{html}</div>
          <Link href='/'>Back</Link>
      </main>
    )
  })
}
