var express = require('express')
var uiController = require('../controllers/uiController')
var router = express.Router()

// Routes for the ui

// list all transponders
router.get('/', uiController.list_transponders)

// create a transponder
router.post('/', uiController.create_transponder)

// delete a transponder by ID
router.get('/:transponderId', uiController.delete_transponder)

module.exports = router