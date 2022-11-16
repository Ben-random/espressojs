const express = require('express')
const app = express()
const generate_id = require("./generate_id")
const numRouter = require("../routes/nextNumRt")
let track = require('./track')

app.use(express.json())
app.use("/nextNum", (req, res, next) => {
    if (req.body.token) {
        next()
    } else {
        const token = generate_id()
        track[token] = []
        req.body.token = token
        next()
    }
}, numRouter)

app.listen(3002)
