import dotenv from 'dotenv'
dotenv.config()


import express from 'express'
import cors from 'cors'
import { dbConnect,userdbconnect } from './config/dbConfig.js'
import { ObjectId } from 'mongodb'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import bcrypt from 'bcryptjs'
import {verifyToken} from './middleware/verifyToken.js'
import notesRoutes from './routes/notesRoutes.js'
import authRoutes from './routes/authRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
const app= express()
const PORT = process.env.PORT


// Middleware:
app.use(cors({
    origin: "http://localhost:5173", 
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(notesRoutes)
app.use(authRoutes)
app.use(adminRoutes)


//port
app.listen(PORT,()=>{
    console.log('___Server running__..');
})


   