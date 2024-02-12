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
  const postDetails = {}
  try {
    const todaysDate = new Date().toISOString()
    const lastWeekDate = new Date(
      new Date().setDate(new Date().getDate() - 7)
    ).toISOString()

    const getPosts = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet,id&channelId=${env_vars.CHANNELID}&type=video&publishedAfter=${lastWeekDate}&publishedBefore=${todaysDate}&key=${env_vars.API_KEY}`
    )
    const youtubePosts = await getPosts.json()

    youtubePosts.items.forEach((item) => {
      postDetails[item.id.videoId] = item.snippet.title
    })
    return postDetails
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

  let postDetails = await fetchYouTubePosts()

  const searchTermInLowerCase = searchTerm.toLocaleLowerCase()

  console.log(
    "--------------------------------- \nLAST WEEKS' YOUTUBE POSTS: \n"
  )
  Object.entries(postDetails).forEach(([videoId, title]) => {
    console.log(
      `Title: ${title} => videoUrl: https://www.youtube.com/watch?v=${videoId}`
    )
  })

  const searchResults = Object.entries(postDetails).filter(([videoId, title]) =>
    title.toLowerCase().includes(searchTermInLowerCase)
  )

  console.log("---------------------------------- \nMatched results: \n")
  searchResults.forEach(([videoId, title]) =>
    console.log(
      `Title: ${title} => videoUrl: https://www.youtube.com/watch?v=${videoId}`
    )
  )
  return searchResults
})
