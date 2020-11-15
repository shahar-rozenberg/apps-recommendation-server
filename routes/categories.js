var express = require('express');
var router = express.Router();
var {getAll} = require('../controllers/categories.controller')

router.get('/', getAll);

module.exports = router;
