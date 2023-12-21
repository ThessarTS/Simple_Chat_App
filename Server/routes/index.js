const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')
const authentication = require('../middlewares/Authentication')
const ChatController = require('../controllers/chatController')
const MessageController = require('../controllers/messageController')

router.post('/register', UserController.register)

router.post('/login', UserController.login)

router.use(authentication)

router.get('/user', UserController.findUser)
router.get('/users', UserController.findAllUser)

router.post('/chats', ChatController.findOrCreateChat)
router.get('/chats', ChatController.findUserChats)

router.post('/messages', MessageController.createMessage)
router.get('/messages/:ChatId', MessageController.findMessages)

module.exports = router