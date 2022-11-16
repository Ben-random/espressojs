function isNum (req, res, next) {
    if (typeof req.body.num === 'number') {
        next()
    } else {
        res.status(400).send("Not number")
    }
}

module.exports = isNum
