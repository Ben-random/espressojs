const express = require("express")
const isNum = require("../middleware/isNum")
let track = require('../src/track')
const nextNum = require('../src/nextNum')
const generate_id = require("../src/generate_id")


const numRouter = express.Router()
numRouter.use(express.json())



numRouter.post("/", isNum, (req, res, next) => {
        if (req.body.token) {
            next()
        } else {
            const token = generate_id()
            track[token] = []
            req.body.token = token
            next()
        }
},(req, res) => {
    try {
        let stack = track[req.body.token]
        const result = nextNum(req.body.num)
        stack.push({"Next num": result})
        track[req.body.token] = stack
        if (req.body.end === false) {
            res.send({"token": req.body.token})
        } else {
            let response_body = {
                "token": req.body.token,
                "response": {
                    "result": stack
                }
            }
            res.send(response_body)
        }
    } catch (error) {
        res.status(400).send("Server failed to complete request")
    }
})

module.exports =  numRouter
