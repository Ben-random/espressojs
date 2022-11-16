const express = require('express')
const app = express()
const numRouter = require("../routes/nextNumRt")
let port = 3005

app.use(express.json())
app.use("/nextNum", numRouter)

app.listen(port)
