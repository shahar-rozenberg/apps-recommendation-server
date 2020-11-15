var express = require('express');
var router = express.Router();
var {getFiltered} = require('../controllers/applications.controller')


router.get('/', getFiltered);

module.exports = router;