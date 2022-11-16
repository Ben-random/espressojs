const fetch = require('isomorphic-fetch')

class Espresso {
    constructor() {
        this.body = {
            "end": false
        }
        this.token = ""
    }
    async request(url, body, start, end) {
        const url = url
        for (key in body) {
            this.body[key] = body[key]
        }
        if (!start) {
            this.body['token'] = this.token
        }
        if (start) {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body),
            })
            const data = await response.json()
            this.token = data.token
        } else if (end) {
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

export default Espresso
