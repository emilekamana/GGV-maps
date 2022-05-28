var express = require('express')
var transponderController = require('../controllers/transponderController')
var router = express.Router()

// list all transponders
router.get('/', transponderController.list_transponders)

// create a transponder (dummy)
router.post('/', transponderController.create_transponder)

// delete a transponder by ID
router.delete('/:transponderId', transponderController.delete_transponder)

module.exports = router