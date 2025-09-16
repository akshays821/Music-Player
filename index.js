import express from "express"
import dotenv from "dotenv"
import jsonwebtoken from "jsonwebtoken"
import connectDB from "./Config/db.js"

const app = express()
dotenv.config()
const port = process.env.PORT
app.use(express.json())

connectDB()

app.listen(port , ()=>{
    console.log(`server running on ${port}`);
    
})