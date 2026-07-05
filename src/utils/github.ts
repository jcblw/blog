const token = import.meta.env.GITHUB_TOKEN

let readmePromise: Promise<string> | undefined
let profilePromise: Promise<GithubProfile | null> | undefined

interface GithubProfile {
  login: string
  url: string
  pinnedItems: { nodes: unknown[] }
  followers: { totalCount: number }
  following: { totalCount: number }
}

export const getReadme = async (): Promise<string> => {
  readmePromise ??= (async () => {
    try {
      const result = await fetch(
        `https://api.github.com/repos/jcblw/jcblw/contents/README.md`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (!result.ok) {
        console.warn(`getReadme: GitHub responded ${result.status}`)
        return ''
      }
      const json = await result.json()
      if (!json.content) {
        console.warn('getReadme: response has no content field')
        return ''
      }
      return Buffer.from(json.content, 'base64').toString('utf-8')
    } catch (error) {
      console.warn('getReadme failed:', error)
      return ''
    }
  })()
  return readmePromise
}

export const getProfileInfo = async (): Promise<GithubProfile | null> => {
  profilePromise ??= (async () => {
    try {
      const result = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
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
      if (!result.ok) {
        console.warn(`getProfileInfo: GitHub responded ${result.status}`)
        return null
      }
      return (await result.json())?.data?.user ?? null
    } catch (error) {
      console.warn('getProfileInfo failed:', error)
      return null
    }
  })()
  return profilePromise
}
