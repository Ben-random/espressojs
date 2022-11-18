const fetch = require('isomorphic-fetch')
const { Espresso } = require("./espresso.js")

async function sendReqs() {
    let body = {
        "end": false,
        "num": 0
    }
    const url = "http://localhost:3005/nextNum/"
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
    })
    const data = await response.json()
    const token = data.token
    body["token"] = token
    let promises = []
    for (let i = 0; i < 5; i++) {
        body["num"] += 1
        promises.push(fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
        }))
    }
    Promise.all(promises).then((p) => {})
    body["num"] = 5
    body["end"] = true
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
    })
    const d = await res.json()
    console.log("response: ", d.response["result"])
}

const api = new Espresso()
body = {"num": 5}
const url = "https://localhost:3005/"
api.request(url, body, false)
console.log(api.request(url, body, true))

//sendReqs()
