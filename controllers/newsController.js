const NewsAPI = require("newsapi");
const newsapi = new NewsAPI("3523eb4587c445b58d3da8e4be22b069");

const getSources = async (req, res) => {
  try {
    const sources = await newsapi.v2.sources({
      // category: 'technology',
      language: "en",
      country: "us",
    });
    res.json(sources);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const getTrendingNews = async (req, res) => {
  try {
    const requests = [
      newsapi.v2.topHeadlines({
        sortBy: "popularity",
        category: "entertainment",
        source: "entertainment-weekly",
        language: "en",
      }),
      newsapi.v2.topHeadlines({
        sortBy: "popularity",
        q: "Madrid",
        category: "sports",
        language: "en",
      }),
      newsapi.v2.topHeadlines({
        sortBy: "popularity",
        category: "health",
        source: "Medical News Today",
        language: "en",
      }),
      newsapi.v2.topHeadlines({
        sortBy: "popularity",
        category: "science",
        language: "en",
      }),
    ];

    const [firstHeadline, secondHeadline, thirdHeadline, fourthHeadline] =
      await Promise.all(requests);


    let isGood = false;
    console.log(firstHeadline.articles);
    for (let i = 0; isGood === false; i++) {
      if (
        firstHeadline?.articles[i]?.source.name === "Hindustan Times"
      ) {
      
      } else {
        res.json({
          headlines: [
            firstHeadline.articles[i],
            secondHeadline.articles[0],
            thirdHeadline.articles[0],
            fourthHeadline.articles[0],
          ],
        });
        isGood = true;
      }
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

const getPageNews = async (req, res) => {
  try {
    const { pageName } = req.body;
    const news = await newsapi.v2.topHeadlines({
      language: "en",
      category: pageName, //Science, Health, soprts, entertainment
      pageSize: 50,
    });
    res.json(news);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const getAllNews = async (req, res) => {
  try {
    const sourceIds = "bbc-news,bloomberg,al-jazeera-english,buzzfeed,cnn";
    const sourceArray = sourceIds.split(",");

    const newsPromises = sourceArray.map(async (source) => {
      return newsapi.v2.everything({
        sources: source,
        language: "en",
        sortBy: "publishedAt", // Order by publishedAt
        pageSize: 20, // Adjust as needed
      });
    });

    const newsResults = await Promise.all(newsPromises);

    const combinedNews = newsResults.reduce(
      (combined, currentNews) => {
        combined.articles.push(...currentNews.articles);
        return combined;
      },
      { articles: [] }
    );

    // Sort the combined articles by publishedAt in descending order
    combinedNews.articles.sort(
      (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
    );

    res.json(combinedNews);
  } catch (error) {
    res.json({ error: error.message });
  }
};

// const getSingleNews = async (req, res)=>{
//   try {
//     const {title} = req.params;
//     const news = await newsapi.v2.everything({
//       language: "en",
//       q:title,
//       sortBy: "publishedAt", // Order by publishedAt
//       pageSize: 100, // Adjust as needed
//     });
//     console.log(news);
//     res.json(news)
//   } catch (error) {
//     res.json({ error: error.message });
//   }
// }

module.exports = {
  getTrendingNews,
  getPageNews,
  getAllNews,
  getSources,
  // getSingleNews
};
