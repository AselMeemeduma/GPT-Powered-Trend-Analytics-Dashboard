require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

if (process.env.ENVIRONMENT !== 'PRODUCTION') {
  // Non-production environment, return existing response.json
  //let data =  require('./food_response.json'); // assuming response.json is in the same directory
  app.post('/api/search', async (req, res) => {
    const searchTerm = req.body.searchInput;
    let data;    
    try {
      data = require(`./${searchTerm}_response.json`);
    } catch (error) {
      console.error(`File not found: ./${searchTerm}_response.json`);
      res.status(404).send('File not found');
      return;
    }
    res.json(data);
  });
} else {
  // Production environment, make API call
  app.post('/api/search', async (req, res) => {
    try {
      const searchTerm = req.body.searchInput;
      const response = await axios.post('https://api.openai.com/v1/completions', {
        model: "gpt-3.5-turbo-instruct",
        prompt: `Provide a data analysis report on the top 5 trends and keywords in the ${searchTerm} industry over the past 2 years.
      The report should be presented in JSON format and include timeline data as well as the trending countries.
      Each trend and keyword should be accompanied by its respective percentages, aligned with the top 5 countries in descending order.
       The sum of the trending percentages should be 100%.
      The JSON format should follow this structure:
      { "trendings": [{"year": "", "keywords": [], "trends": [], "countries":[], "country-percentage":[], "keyword-wise-country-percentage": [{ "keyword": "", "country": "", "percentage": "" }] }]}
      The report should be focused on providing a clear and concise analysis of the top trends and keywords, along with their associated percentages and trending countries in the ${searchTerm} industry over the specified time period.only the data. no texts.`,
        max_tokens: 2000,
        temperature: 0
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.CHATGPT_API_KEY}`
        }
      });

      // Check if the response from the API is valid
      if (response.data) {
        res.json(response.data);
      } else {
        // Handle empty or invalid response
        res.status(500).send('Invalid response from the ChatGPT API');
      }
    } catch (error) {
      console.error('Error calling ChatGPT API:', error);
      res.status(500).send('Server Error');
    }
  });
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));