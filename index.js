import dotenv from "dotenv"
import readline from "readline"

dotenv.config()

const env_vars = {
  API_KEY: process.env.API_KEY,
  CHANNELID: process.env.CHANNELID,
}

Object.entries(env_vars).forEach(([key, value]) => {
  if (!value) {
    throw new Error(`Required environment variable '${key}' is missing!`)
  }
})

async function fetchYouTubePosts() {
  const postsTitles = []
  try {
    const todaysDate = new Date().toISOString()
    const lastWeekDate = new Date(
      new Date().setDate(new Date().getDate() - 7)
    ).toISOString()

    const getPosts = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${env_vars.CHANNELID}&type=video&publishedAfter=${lastWeekDate}&publishedBefore=${todaysDate}&key=${env_vars.API_KEY}`
    )
    const youtubePosts = await getPosts.json()

    youtubePosts.items.forEach((item) => {
      postsTitles.push(item.snippet.title)
    })
    return postsTitles
  } catch (error) {
    console.error("Error fetching YouTube posts:", error)
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.question("Please enter search term: \n ", async (searchTerm) => {
  rl.close()

  let postTitles = await fetchYouTubePosts()

  const searchTermInLowerCase = searchTerm.toLocaleLowerCase()

  console.log("--------------------------------- \nLAST WEEKS' YOUTUBE POSTS: \n")
  postTitles.forEach((post) => console.log(post))

  const searchResults = postTitles.filter((item) =>
    item.toLowerCase().includes(searchTermInLowerCase)
  )

  console.log("---------------------------------- \nMatched results: \n")
  searchResults.forEach((result) => console.log(result))
  return searchResults
})
