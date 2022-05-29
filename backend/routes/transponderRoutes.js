var express = require('express')
var transponderController = require('../controllers/transponderController')
var router = express.Router()

// Routes for the api

// list all transponders
router.get('/', transponderController.list_transponders)

// create a transponder
router.post('/', transponderController.create_transponder)

// delete a transponder by ID
router.delete('/:transponderId', transponderController.delete_transponder)

module.exports = router