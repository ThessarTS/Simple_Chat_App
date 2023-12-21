const { Op } = require('sequelize')
const { Chat } = require('../models/index')
class ChatController {
    static async findOrCreateChat(req, res, next) {
        try {
            const userOne = req.user.username
            const { userTwo } = req.body
            let chat = await Chat.findOne({
                where: {
                    [Op.and]: [
                        { userOne },
                        { userTwo }
                    ]
                }
            })
            if (!chat) {
                chat = await Chat.create({ userOne, userTwo })
            }
            res.json(chat)

        } catch (error) {
            next(error)
        }
    }

    static async findUserChats(req, res, next) {
        try {
            const user = req.user.username

            let userChats = await Chat.findAll({
                where: {
                    [Op.or]: [
                        { userOne: user },
                        { userTwo: user }
                    ]
                }
            })
            res.json(userChats)

        } catch (error) {
            next(error)
        }
    }

}

module.exports = ChatController