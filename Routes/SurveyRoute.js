const express = require('express')
const { createSurvey, getSurveyData, updateSurvey, deleteSurveyData, getuserSurveyData } = require('../Controller/SurveyController')
const { Check } = require('../Middleware/Checkauth')

const Router = express.Router()

Router.post('/createsurvey', Check, createSurvey)
Router.get('/getsurvey/',Check, getSurveyData)
Router.get('/getusersurveydata/:id', getuserSurveyData)
Router.put('/updatesurvey/:id', Check, updateSurvey)
Router.delete('/deletesurvey/:id', Check, deleteSurveyData)

module.exports = Router