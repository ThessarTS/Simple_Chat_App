const { checkPassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
const { User } = require('../models/index')

class UserController {
    static async register(req, res, next) {
        try {
            let { username, password } = req.body

            let newUser = await User.create({ username, password })
            const access_token = signToken({ id: newUser.id })
            res.status(201).json({ access_token, username })
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            let { username, password } = req.body
            if (!username) {
                throw { name: 'blankUsername' }
            }
            if (!password) {
                throw { name: 'blankPass' }
            }
            let user = await User.findOne({ where: { username } })
            if (!user) {
                throw { name: 'invalidUsernamePass' }
            }
            let isValidPass = checkPassword(password, user.password)
            if (!isValidPass) {
                throw { name: 'invalidUsernamePass' }
            }
            const access_token = signToken({ id: user.id })
            res.json({ access_token, username: user.username })
        } catch (error) {
            next(error)
        }
    }

    static async findUser(req, res, next) {
        try {
            res.json({ username: req.user.username })
        } catch (error) {
            next(error)
        }
    }

    static async findAllUser(req, res, next) {
        try {
            let users = await User.findAll({ attributes: { exclude: ['password'] } })
            res.json(users)
        } catch (error) {
            next(error)
        }
    }

}

module.exports = UserController