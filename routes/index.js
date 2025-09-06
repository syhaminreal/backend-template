const express = require('express')
const staffsRoutes = require("./staff.routes.js");
const { adminUser } = require("../lib/");
const authRoutes = require('./auth.routes')


const router = express.Router()

// Mount auth routes under /auth
router.use('/auth', authRoutes)

//mount staff routas
router.use("/staffs", adminUser, staffsRoutes);

module.exports = router
