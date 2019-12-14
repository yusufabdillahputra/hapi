require('dotenv/config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const xssFilter = require('x-xss-protection')
const PORT = process.env.SERVER_PORT
const API_VERSION = process.env.API_VERSION
const routes = require(`../app/v${API_VERSION}/routes`)
const cors = require('cors')
const morgan = require('morgan')

const whitelist = [
  'http://54.144.101.230:80'
]
const corsOptionsDelegate = function (req, callback) {
  let corsOptions
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))
// app.use(xssFilter({
//   setOnOldIE: true,
//   reportUri: '/report-xss-violation'
// }))
app.use(cors({
  origin: false
}))
app.use(express.static('storage/image'))
app.use(routes)

module.exports = app
