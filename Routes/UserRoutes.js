const express = require('express')
const { getUserData ,deleteUserData} = require('../Controller/UserController')
const { Check, CheckAdmin } = require('../Middleware/Checkauth')
const Router = express.Router()

Router.get('/user', getUserData)

Router.delete('/delete/:id', Check, CheckAdmin, deleteUserData)

module.exports = Router