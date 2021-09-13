const API_URL = process.env.WP_API_URL // .env.local から

/**
 * general fetching function
 */
async function fetchAPI(query, { variables } = {}) {
  // Set up some headers to tell the fetch call
  // that this is an application/json type
  const headers = { 'Content-Type': 'application/json' }

  // build out the fetch() call using the API_URL
  // environment variable pulled in at the start
  // Note the merging of the query and variables
  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables })
  });

  // error handling work
  const json = await res.json()
  if (json.errors) {
    console.log(json.errors)
    console.log('error details', query, variables)
    throw new Error('Failed to fetch API')
  }
  return json.data
}


/**
 * 投稿をクエリで取得(最新20件、ソート)
 */
// Notice the 'export' keyword here. We'll be calling this function
// directly in our blog/index.js page, so it needs to be exported
export async function getAllPosts(preview) {
  const data = await fetchAPI(
    `
    query AllPosts {
      posts(first: 20, where: { orderby: { field: DATE, order: DESC}}) {
        edges {
          node {
            id
            date
            title
            slug
            extraPostInfo {
              authorExcerpt
              thumbImage {
                mediaItemUrl
              }
            }
          }
        }
      }
    }
    `
  );

  return data?.posts
}


/**
 * 最新の投稿(10000件)をスラッグ付きで取得
 */
export async function getAllPostsWithSlug() {
  const data = await fetchAPI(
    `
    {
      posts(first: 10000) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);
  return data?.posts
}


/**
 * get an individual blog post's data
 */
export async function getPost(slug) {
  const data = await fetchAPI(
    `
    fragment PostFields on Post {
      title
      excerpt
      slug
      date
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
    query PostBySlug($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        ...PostFields
        content
      }
    }
  `,
    {
      variables: {
        id: slug,
        idType: 'SLUG'
      }
    }
  )

  return data
}