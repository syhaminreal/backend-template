const jwt = require("jsonwebtoken")
const { User } = require('../models/user.model.js')
const multer = require('multer')

const showError = (error, next) =>{
    console.log(error) // for server
            next({ // for user 
                message: 'problem while processing request.',
                status: 400
            })
}

const auth = async(req,res,next) => {
    if('authorization' in req.headers){
        const token = req.headers.authorization.split(' ').pop()
        
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const user = await User.findById(decoded.id)
            if(user){
                if(user.status){
                    req.user = user
                    next()
                }
                else{
                    next({ // for user 
                        message: 'Inactive account.',
                        status: 403
                    })
                }
            }
            else{
                throw Error('No user')
            }
        } catch (err) {
            next({ // for user 
                message: 'Invalid Token.',
                status: 401
            })
        }
    }
    else{
        next({ // for user 
            message: 'Token missing.',
            status: 401
        })
    }
}

const cmsUser = async(req,res,next) => {
    if(req.user.type != 'Customer'){
        next()
    }
    else{
        next({
            message: 'Access denied',
            status: 403
        })
    }
}

const adminUser = async(req,res,next) => {
    if(req.user.type == 'Admin'){
        next()
    }
    else{
        next({
            message: 'Access denied',
            status: 403
        })
    }
}

const validationError = (error,next) => {

    let message = {}
    if('errors' in error){
        for(let k in error.errors) {
            message = {
                ...message, [k]: error.errors[k].message
            }
        }
    }
    else{
        showError(error,next)
    }
    next({
        message,
        status: 422
    })

}

const uploadFile = (mimeList= []) => multer({
    fileFilter: (req, file, cb) => {
        if(mimeList.length > 0){
            if(mimeList.includes(file.mimetype)){
                cb(null, true)
            }
            else{
                cb(new Error(`file type not supported for the file: ${file.originalname}`), false)
            }
        }
        else{
            cb(null, true)
        }
    },
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads' )
        },
        filename: ( req, file,cb)=> {
            const ext = file.originalname.split('.').pop()

            cb(null, `file${Date.now()}${Math.floor(Math.random() * 11)}.${ext}`)
        }
    })
})




module.exports = { showError , auth, cmsUser, adminUser, validationError, uploadFile}