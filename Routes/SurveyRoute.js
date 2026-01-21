const express = require('express')
const { createSurvey, getSurveyData, deleteSurveyData, getuserSurveyData, getUserSurvey } = require('../Controller/SurveyController')
const { Check, CheckAdmin } = require('../Middleware/Checkauth')

const Router = express.Router()

Router.post('/createsurvey', Check, createSurvey)
Router.get('/getsurvey/',Check,CheckAdmin,  getSurveyData)
Router.get('/getusersurveydata',Check, getuserSurveyData)
Router.get('/getusersurvey/:id', getUserSurvey)
Router.delete('/deletesurvey/:id', Check, deleteSurveyData)

module.exports = Router