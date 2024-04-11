import express from "express";

//controller functions
import { loginUser, signupUser } from "../controllers/userController.js";

const router = express.Router();


//login route
//we will send the username and password
router.post('/login', loginUser);

// signup route
router.post('/signup', signupUser);




export default router;