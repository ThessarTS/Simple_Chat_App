const { Message } = require('../models/index')

class MessageController {
    static async createMessage(req, res, next) {
        try {
            const sender = req.user.username
            const { message, ChatId } = req.body
            const read = true
            let newMessage = await Message.create({ ChatId, sender, message, read })

            res.status(201).json(newMessage)

        } catch (error) {
            next(error)
        }
    }

    static async findMessages(req, res, next) {
        try {
            const { ChatId } = req.params
            let messages = await Message.findAll({ where: { ChatId }, order: [['createdAt', 'ASC']] })

            res.json(messages)

        } catch (error) {
            next(error)
        }
    }

}

module.exports = MessageController