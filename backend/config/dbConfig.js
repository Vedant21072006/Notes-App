import { MongoClient } from "mongodb"

const url = "mongodb://localhost:27017/"
const database ="notes-database"
const collection ="notes"
let client = new MongoClient(url)
await client.connect().then(()=>{
    console.log("Database connected....");
    
})

export const dbConnect=async()=>{
 let db = await client.db(database)
 return db.collection(collection)
}

export const userdbconnect=async()=>{
     let db = await client.db(database)
 return db.collection('users')
}