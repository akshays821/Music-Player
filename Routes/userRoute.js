import express from "express"
import { registerUser, loginUser } from "../Controllers/userController.js"
import { authenticateToken } from "../Middlewares/authMiddleware.js"

const userRouter = express.Router()

// PUBLIC ROUTES
userRouter.post("/register", registerUser)   // POST /api/users/register
userRouter.post("/login", loginUser)         // POST /api/users/login

// PROTECTED ROUTE (only with token)
userRouter.get("/profile", authenticateToken, (req, res) => {
  res.json({ message: "This is a protected profile", user: req.user })
})

export default userRouter
