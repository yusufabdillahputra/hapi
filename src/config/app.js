require('dotenv/config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const xssFilter = require('x-xss-protection')
const PORT = process.env.SERVER_PORT
const API_VERSION = process.env.API_VERSION
const routes = require(`../app/v${API_VERSION}/routes`)
const cors = require('cors')

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})
app.use(
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true }),
  xssFilter({
    setOnOldIE: true,
    reportUri: '/report-xss-violation'
  }),
  express.static('storage/image'),
  cors(),
  routes
)

module.exports = app
