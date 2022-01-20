const { Router } = require('express')
const authController = require('../controllers/auth.controller')

const authRouter = Router()

authRouter.post('/signup', authController.signUp)
authRouter.post('/admin', authController.signUpAdmin)
authRouter.post('/signin', authController.signIn)
authRouter.get('/signout', authController.signOut)
authRouter.get('/check', authController.checkAuth)
authRouter.post('/upload', authController.upload)
module.exports = authRouter
