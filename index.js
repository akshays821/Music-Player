import express from "express"
import dotenv from "dotenv"
import connectDB from "./Config/db.js"
import userRouter from "./Routes/userRoute.js"
import songRouter from "./Routes/songRoutes.js"
import playlistRouter from "./Routes/playlistRoutes.js"

const app = express()
dotenv.config()
const port = process.env.PORT
app.use(express.json())

app.use('/users' , userRouter)
app.use('/songs' , songRouter)
app.use('/playlists' , playlistRouter)

connectDB()

app.listen(port , ()=>{
    console.log(`server running on ${port}`);
    
})