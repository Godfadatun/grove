import User from '../entities/user';
import logger from '../utils/logger';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import otpGenerator from 'otp-generator'

/**
 * Given a json request
 * {"username": "<...>", "password": "<...>"}
 * Verify the user is valid and return some authentication token
 * which can be used to verify protected resources
 * {"user": <{...}>, "token": "<...>""}
 */
export const login = async (req, res) => {
    const body = req.body
    const user = await User.findOne({username: body.username}).exec()
    if (user && bcrypt.compareSync(body.password, user.password)) {
        const token = jwt.sign({id: user._id}, 'key', {expiresIn: '1hr'})
        res.status(200).json({
            status: true, message: 'login successful', data: {
                token,
                user: {
                    _id: user._id,
                    username: user.username,
                    name: user.name,
                    email: user.email,
                    updatedAt: user.updatedAt,
                    createdAt: user.createdAt
                }
            }
        })
    } else {
        res.status(400).json({status: false, message: 'invalid credentials'})
    }
};
/**
 * Given a json request
 * {"username": "<...>", "password": "<...>"}
 * Create a new user and return some authentication token
 * which can be used to verify protected resources
 * {"user": <{...}>, "token": "<...>""}
 */
export const signup = async (req, res) => {
    const body = req.body
    const existing = await User.findOne({username: body.username, email: body.email}).exec()
    if (!existing) {
        const doc = new User({
            username: body.username,
            name: body.name,
            email: body.email,
            password: body.password
        })
        const user = await doc.save();
        const token = jwt.sign({id: user._id}, 'key', {expiresIn: '1hr'})
        res.status(200).json({
            status: true, message: 'registration successful', data: {
                token,
                user: {
                    _id: user._id,
                    username: user.username,
                    name: user.name,
                    email: user.email,
                    updatedAt: user.updatedAt,
                    createdAt: user.createdAt
                }
            }
        })
    } else {
        res.status(400).json({
            status: false,
            message: 'user already exist'
        })
    }
};
/**
 * Implement a way to recover user accounts
 */
export const forgotPassword = async (req, res) => {
    const user = await User.findOneAndUpdate({username: req.body.username}, {
        token: otpGenerator.generate(4, {digits: true, specialChars: false})
    })
    //send email containing the token
    if (user) {
        res.status(200).json({
            status: true,
            message: 'Verify with the token sent to you'
        })
    } else {
        res.status(400).json({status: false, message: 'invalid account'})
    }
};

export const verifyToken = async (req, res) => {
    const user = await User.findOne({username: req.body.username, token: req.body.token}).exec()
    if (user) {
        const token = jwt.sign({id: user._id}, 'key', {expiresIn: '1hr'})
        res.status(200).json({
            status: true,
            message: 'token is valid',
            data: {
                token
            }
        })
    } else {
        res.status(400).json({
            status: false,
            message: 'token is invalid'
        })
    }
}

export const resetPassword = async (req, res) => {
    const user = await User.findOneAndUpdate({_id: req.user.id}, {password: req.body.password}).exec()
    if (user) {
        res.status(200).json({
            status: true,
            message: 'successfully updated password'
        })
    } else {
        res.status(400).json({
            status: false,
            message: 'an error occurred'
        })
    }
}

export default {
    login,
    signup,
    forgotPassword,
    verifyToken,
    resetPassword
}
