const express = require('express')
const path = require('path')
const app = express()

app.use(express.static("../../withReact/public")) 

let port = 3001;
app.listen(port, console.log(`started listening to port ${port}!`))