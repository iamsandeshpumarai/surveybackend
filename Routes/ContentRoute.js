const express = require('express');
const { createContent, getContent } = require('../Controller/ContentController');
const router = express.Router();


router.post('/createcontent', createContent)
router.get('/getcontent', getContent)



module.exports = router;