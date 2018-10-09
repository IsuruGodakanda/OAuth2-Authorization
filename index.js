const express = require('express')
const axios = require('axios')

const clientID = "bb78f04d858a91f636fb";
const clientSecret = "c95286147b8ba8b622e0dd9b47b0736bc1d36715";

const app = express()
app.use(express.static(__dirname + '/public'))

app.get('/oauth/redirect', (req, res) => {
  const requestToken = req.query.code
  axios({
    method: 'post',
    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
    headers: {
      accept: 'application/json'
    }
  }).then((response) => {
    // Once we get the response, extract the access token
    const accessToken = response.data.access_token
    // redirect the user to the welcome page, along with the access token
    res.redirect(`/welcome.html?access_token=${accessToken}`)
  })
})

app.listen(8080);
console.log("Server run on : http://localhost:8080/");
