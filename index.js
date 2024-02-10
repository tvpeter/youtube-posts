import dotenv from "dotenv"

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
    const uploadsData = await getPosts.json()

    uploadsData.items.forEach((item) => {
      postsTitles.push(item.snippet.title)
    })
    return postsTitles
  } catch (error) {
    console.error("Error fetching YouTube posts:", error)
  }
}

let results = await fetchYouTubePosts()
console.log(results)
