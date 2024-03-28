const express = require('express');
const app = express();
require('dotenv').config();

const cors = require('cors'); // Import the cors middleware
const PORT = process.env.PORT || 5000;

// Configure CORS to allow requests from localhost:3000
app.use(cors());

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.NewsAPI);
// To query /v2/top-headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them

app.get('/api/top-headlines', async (req, res) => {
  const category = req.query.category || 'general';
  const page = req.query.page || '1';
  const sortBy = req.query.sortBy || 'publishedAt'
  
    newsapi.v2.topHeadlines({
        category: category,
        language: 'en',
        page: page,
        sortBy: sortBy
      }).then(response => {
        console.log(response);
        res.json(response);
        /*
          {
            status: "ok",
            articles: [...]
          }
        */
      });
})

app.get('/api/everything', async (req, res) => {
  const category = req.query.category || 'general';
  const page = req.query.page || '1';
  const sortBy = req.query.sortBy || 'publishedAt'

  console.log(req.body);
    newsapi.v2.everything({
        q: category,
        language: 'en',
        sortBy: sortBy,
        page: page
      }).then(response => {
        console.log(response);
        res.json(response);
        /*
          {
            status: "ok",
            articles: [...]
          }
        */
      });
})

app.get('/', (req, res)=> {res.send("News Application server is running")})


app.listen(PORT, () => {
  console.log(`Server is running on port 5000`);
});
