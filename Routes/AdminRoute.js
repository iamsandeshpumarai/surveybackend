const express = require('express')
const {   logOut, UserSignup, UserLogin, RegisterAdmin } = require('../Controller/AuthController')
const { Check } = require('../Middleware/Checkauth')
const Router = express.Router()



Router.post('/logout', logOut)
Router.post('/loginuser',UserLogin)
Router.post('/loginadmin',RegisterAdmin)
Router.post('/registeruser',UserSignup)


module.exports = Router