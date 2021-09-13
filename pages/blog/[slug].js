import { useRouter }                    from 'next/router'
import Head                             from 'next/head'
import Link                             from 'next/link'
import { getAllPostsWithSlug, getPost } from '../../lib/api'
import styles                           from '../../styles/Home.module.css'
import blogStyles                       from '../../styles/Blog.module.css'


export default function Post({ postData }) {
  const router = useRouter()

  if (!router.isFallback && !postData?.slug) {
    return <p>hmm...looks like an error</p>
  }

  /**
   * 日付をフォーマットする関数
   */
  const formatDate = date => {
    const newDate = new Date(date)

    return `${newDate.getDate()}/${
      newDate.getMonth() + 1
    }/${newDate.getFullYear()}`
  }

  /**
   * 内容を出力
   */
  return (
    <div className={styles.container}>
      <Head>
        <title>{postData.title}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        {router.isFallback ? (
          <h2>Loading...</h2>
        ) : (
          <article className={blogStyles.article}>
            <div className={blogStyles.postmeta}>
              <h1 className={styles.title}>{postData.title}</h1>
              <p>{formatDate(postData.date)}</p>
            </div>
            <div
              className='post-content content'
              dangerouslySetInnerHTML={{ __html: postData.content }}
            />
          </article>
        )}
        <p>
          <Link href='/blog'>
            <a>back to articles</a>
          </Link>
          <br/>
          <Link href={`/contact/`}>
              <a>» 問い合わせフォーム</a>
          </Link>
        </p>
      </main>
    </div>
  )
}

/**
 * 静的HTMLページの生成
 */
export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug()

  return {
    paths: allPosts.edges.map(({ node }) => `/blog/${node.slug}`) || [],
    fallback: true
  }
}

/**
 * 個別ページの投稿データを取得 (スラッグベース、idベースに変えることも可能)
 */
export async function getStaticProps({ params }) {
  const data = await getPost(params.slug)

  return {
    props: {
      postData: data.post
    }
  }
}
