const express = require('express')
const cheerio = require('cheerio')
const axios = require('axios')
const app = express()
const URL = 'https://www.theguardian.com/uk'
const PORT = 3000 

app.get('/', function(req, res){
  axios(URL)
  .then((response) => {
    const html = response.data
    const $ = cheerio.load(html)
    const data = []
    
    $('.fc-item__title', html).each(function(){
      const title = $(this).text()
      const url = $(this).find('a').attr('href')
      data.push({title, url})
    })
    
    res.json(data)
  })
  .catch((err) => {
    console.log(err)
  })
})

app.listen(PORT, () => {
  console.log(`On ${PORT}`)
})