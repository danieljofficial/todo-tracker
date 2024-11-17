const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')

const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({error: 'Authorization token required'})
    }
    const token = authorization.split(' ')[1]
    try {
        const {_id} = jwt.verify(token, process.env.SECRET)
        req.user = await User.findOne({ _id }).select(_id)
        next()
    } catch (error) {
        if(error.name === "TokenExpiredError") {
            return res.status(401).json({ error: "Token expired"})
        }
        res.status(400).json({error: 'Request is not authorized'})
    }

    
}

module.exports = requireAuth