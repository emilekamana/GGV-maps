var express = require('express')
var uiController = require('../controllers/uiController')
var router = express.Router()

// list all transponders
router.get('/', uiController.list_transponders)

// create a transponder (dummy)
router.post('/', uiController.create_transponder)

// delete a transponder by ID
router.delete('/:transponderId', uiController.delete_transponder)

module.exports = router