import Head            from 'next/head'
import Link            from 'next/link'
import Image           from 'next/image'
import { getAllPosts } from '../../lib/api'
import styles          from '../../styles/Home.module.css'
import blogStyles      from '../../styles/Blog.module.css'

// Image Optimization by next/image
// next.config.js にドメイン名を追加すること
const myLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`
  // return `http://dev.nagaishouten.com/${src}?w=${width}&q=${quality || 75}`
}

/**
 * static generation with external data-fetching
 */
export async function getStaticProps() {
  const allPosts = await getAllPosts()
  return {
    props: {
      allPosts
    }
  };
}

/**
 * Main Blog component
 */
const Blog = ({ allPosts: { edges } }) => (
  <div className={styles.container}>
    <Head>
      <title>Blog articles page</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>

    <main className={styles.main}>
      <h1 className={styles.title}>Latest blog articles</h1>
      <div className="grid grid-cols-3 gap-4">
        {edges.map(({ node }) => (
          <div className={blogStyles.listitem} key={node.id}>
            <div className={blogStyles.listitem__thumbnail}>
              {node.extraPostInfo.thumbImage && ( // ※ 画像の存在をチェック。無いとエラー
              <figure>
                {/* TODO: 画像の表示、うまくいかない*/}
                {/*{console.log(node.extraPostInfo.thumbImage.mediaItemUrl)}*/}
                <Image
                  loader={myLoader}
                  src={node.extraPostInfo.thumbImage.mediaItemUrl}
                  width={300}
                  height={200}
                  alt={node.title}
                />
              </figure>
              )}
            </div>
            <div className={blogStyles.listitem__content}>
              <h2>{node.title}</h2>
              <p>{node.extraPostInfo.authorExcerpt}</p>
              <Link href={`/blog/${node.slug}`}>
                <a>Read more »</a>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  </div>
)

export default Blog