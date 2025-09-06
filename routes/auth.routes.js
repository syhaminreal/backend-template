const express = require('express')
const router = express.Router()

// No destructuring — import directly
const AuthCtrl = require('../controller/auth.controller')

router.post('/register', AuthCtrl.register)
router.post('/login', AuthCtrl.login)

module.exports = router
