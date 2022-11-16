function isNum (req, res, next) {
    if (typeof req.body.num === 'number') {
        next()
    } else {
        res.sendStatus(400)
    }
}

module.exports = isNum
