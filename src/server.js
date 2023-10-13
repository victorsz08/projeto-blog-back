const express = require('express')
const routes = require('./routes')
const port = 8000
const cors = require('cors')


const app = express()


app.use(cors('*'))

routes(app)

app.listen(port, () => console.log("HTTP SERVER RUNNING"))