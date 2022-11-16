const fetch = require('isomorphic-fetch')

let body = {
    'end': false,
    "num": 0
}

async function sendReqs(body) {
    const url = "http://localhost:3002/nextNum"
    const response = await fetch(url, {
        method: 'POST',
        body: body.json(),
    })
    const data = await response.json()
    const token = data.token
    body.token = token
    for (let i = 0; i < 5; i++) {
        body.num = i
        await fetch(url, {
            method: 'POST',
            body: body.json(),
        })
    }
    body.num = 5
    body.end = true
    const res = await fetch(url, {
        method: 'POST',
        body: body.json(),
    })
    const d = await res.json()
    console.log("responses: ", d, d.response)
}

sendReqs(body)
