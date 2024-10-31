const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    userName: {
        required: true,
        type: String,
    },
    email: {
        required: true,
        type: String,
        unique: true,
    },
    password: {
        required: true,
        type: String,
    }
})

userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ email })

    if (!user) {
        throw Error('Invalid Email')
    }

    const match = await bcryptjs.compare(password, user.password, )

    if (!match) {
        throw Error('Invalid password')
    }

    return user
}

userSchema.statics.signup = async function(userName, email, password) {
    if (!email || !password || !userName) {
        throw Error('All fields must be filled')
    }

    if (!validator.isEmail(email)) {
        throw Error('Invalid email.')
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough.')
    }

    const exists = await this.findOne({ email })

    if (exists) {
            throw Error('Email already exists')
        }

    const salt = await bcryptjs.genSalt(10)
    const hash = await bcryptjs.hash(password, salt)

    const user = await this.create({userName, email, password: hash})

    return user
}

module.exports = mongoose.model('User', userSchema)