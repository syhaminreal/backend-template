const express = require('express')
// const staffsRoutes = require("./staff.routes.js");
const { adminUser } = require("../lib/");
const authRoutes = require('./auth.routes')


const router = express.Router()

// Mount auth routes under /auth
router.use('/auth', authRoutes)


router.use((req,res,next) =>{
    res.status(404).json({
        error:'Not found'
    })
})

// //mount staff routas
// router.use("/staffs", adminUser, staffsRoutes);

module.exports = router
