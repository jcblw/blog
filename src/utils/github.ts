export const getReadme = async () => {
  const result = await fetch(
    `https://api.github.com/repos/jcblw/jcblw/contents/README.md`,
    {
      headers: {
        // @ts-ignore
        Authorization: `Bearer ${import.meta.env.GITHUB_TOKEN}`,
      },
    }
  )
  const json = await result.json()
  return Buffer.from(json.content, 'base64').toString('utf-8')
}

export const getProfileInfo = async () => {
  const result = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // @ts-ignore
      Authorization: `Bearer ${import.meta.env.GITHUB_TOKEN}`,
    },
    body: JSON.stringify({
      query: `
      query getProfileInfo($username: String!) {
        user(login: $username) {
          login
          url
          pinnedItems(first: 6) {
            nodes {
              ... on Repository {
                id
                name
                nameWithOwner
                isFork
                url
                description
                stargazerCount
                collaborators(last: 5) {
                  nodes {
                    avatarUrl
                    login
                  }
                }
              }
            }
          }
          followers {
            totalCount
          }
          following {
            totalCount
          }
        }
      }
      `,
      variables: {
        username: 'jcblw',
      },
    }),
  })
  return (await result.json())?.data?.user
}
