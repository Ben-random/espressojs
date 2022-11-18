const fetch = require('isomorphic-fetch')

class Espresso {
    static calls = 0
    constructor() {
        this.body = {
            "end": false
        }
        this.token = ""
        this.calls += 1
    }
    async request(url, body, end) {
        for (const key in body) {
            this.body[key] = body[key]
        }
        try {

        } catch (error) {
            console.log(error)
        }
        if (this.calls > 1) {
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body),
                })
                const data = await response.json()
                if (data.status === 200) {
                    this.token = data.token
                } else {
                    throw new Error(data.status, data.statusText)
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                this.body['token'] = this.token
            if (end) {
                this.body["end"] = true
                const res = await fetch(url, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body),
                })
                const d = await res.json()
                if (d.status === 200) {
                    return d.response
                } else {
                    throw new Error(d.status, d.statusText)
                }
            }
            } catch (error) {
                console.log(error)
            }
        }
    }
}

module.exports = { Espresso }
