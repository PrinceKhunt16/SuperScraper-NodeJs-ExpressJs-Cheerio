const express = require('express')
const cheerio = require('cheerio')
const axios = require('axios')
const app = express()
const URL = 'https://www.geeksforgeeks.org/data-structures/'
const PORT = 3000 

app.get('/', function(req, res){
  axios(URL)
  .then((response) => {
    const html = response.data
    const $ = cheerio.load(html)
    const dsaTopicsLinks = []
     
    $('#post-125686', html).each(function(){
      const topicLinks = []
 
      $(this).find('ol').each(function() {
        $(this).children(function() {
          const title = $(this).text()
          const url = $(this).find('a').attr('href')
          topicLinks.push({title, url})
        })

        dsaTopicsLinks.push(topicLinks)
      })
    })
    
    res.json(dsaTopicsLinks)
  })
  .catch((err) => {
    console.log(err)
  })
})

app.listen(PORT, () => {
  console.log(`On ${PORT}`)
})