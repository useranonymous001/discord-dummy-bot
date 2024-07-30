const apiKey = process.env.YOUTUBE_API_KEY;
const axios = require("axios");

async function searchVideoFromYoutube(query) {
  try {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          q: query,
          key: apiKey,
          maxResult: 1,
          type: "video",
        },
      }
    );

    const video = response.data.items[0];
    return video;
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  searchVideoFromYoutube,
};
