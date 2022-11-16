const express = require("express")
const isNum = require("../middleware/isNum")
let track = require('../src/track')
const nextNum = require('../src/nextNum')

const numRouter = express.Router()
numRouter.use(express.json())

numRouter.post("/", isNum, (req, res) => {
    try {
        let stack = track[req.body.token]
        const result = nextNum(req.body.num)
        stack.push({"Next num": result})
        track[req.body.token] = stack
        if (!req.body.end) {
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
        res.sendStatus(400)
    }
})

module.exports =  numRouter
