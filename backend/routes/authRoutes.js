import express from 'express'

import { logincontroller, logoutcontroller, signupcontroller } from '../controllers/authController.js'
const router = express.Router()

// login and singup 
router.post('/signup',signupcontroller)

router.post('/login',logincontroller);


//logout 
router.post("/logout",logoutcontroller);



export default router;