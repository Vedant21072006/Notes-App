import express from 'express'
import {dbConnect } from '../config/dbconfig.js'
import { ObjectId } from 'mongodb'
import {verifyToken} from '../middleware/verifyToken.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { adddatacontroller, deletedatacontroller, listdatacontroller, populatedatacontroller, updatedatacontroller } from '../controllers/notesController.js'
import { isAdmin } from '../middleware/roleMiddleware.js'
const router = express.Router()


// list data
router.get("/list",verifyToken,listdatacontroller)

// add data 
router.post('/add',verifyToken,adddatacontroller)

// delete data
router.delete("/delete/:id",verifyToken,isAdmin,deletedatacontroller)

//populate data
router.get("/note/:id",verifyToken,populatedatacontroller)

// edit data
router.put("/update/:id",verifyToken,updatedatacontroller)

export default router;