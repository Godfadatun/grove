const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const tokenHeader = req.headers.authorization.split(" ")[1]
        req.user  = jwt.verify(tokenHeader, "key")
        next()
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized request",
            status: false
        })
    }
}
