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
        for (key in body) {
            this.body[key] = body[key]
        }
        if (this.calls > 1) {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body),
            })
            const data = await response.json()
            this.token = data.token
        } else {
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
                return d.response
            }
        }
    }
}

export { Espresso }
