import express from 'express'
import { dbConnect, userdbconnect } from '../config/dbconfig.js'
import { AdminStats, deleteUseranddata, DeleteUserSpecificNotes, PopulateUserSpecificnotes, UpdateUserSpecificNotes, UserData, UserSpecificNotes } from '../controllers/adminControllers.js'
import { ObjectId } from 'mongodb'
import { verifyToken } from '../middleware/verifyToken.js'
import { isAdmin } from '../middleware/roleMiddleware.js'

const router = express.Router()

// user -data
router.get('/user-data',UserData)


// delete users and their notes

router.delete('/delete-user/:id',deleteUseranddata)

// user specfic notes
router.get('/user-notes/:id',UserSpecificNotes)


// delete user specific notes (one note)
router.delete('/admin/delete-user-notes/:id',verifyToken,isAdmin,DeleteUserSpecificNotes)

router.put('/admin/update-user-note/:id',UpdateUserSpecificNotes)

// populate user data
router.get('/admin/user-old-data/:id',PopulateUserSpecificnotes

)

router.get('/admin/stats',AdminStats);
export default router