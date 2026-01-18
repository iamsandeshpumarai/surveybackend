const express = require('express')
const { createSurvey, getSurveyData, deleteSurveyData, getuserSurveyData } = require('../Controller/SurveyController')
const { Check } = require('../Middleware/Checkauth')

const Router = express.Router()

Router.post('/createsurvey', Check, createSurvey)
Router.get('/getsurvey/', getSurveyData)
Router.get('/getusersurveydata/:id', getuserSurveyData)
Router.delete('/deletesurvey/:id', Check, deleteSurveyData)

module.exports = Router