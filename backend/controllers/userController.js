import User from "../models/userModel.js";
import * as dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";


//create token that would be reusable in 
//login user and signup user

const createToken = (_id) => {

    //the user remains login for 3 days and then token expires
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
}


// login user
const loginUser = async (req, res) => {

    const { email, password } = req.body;

    try {

    const user = await User.login(email, password);

    const token = createToken(user._id);

    res.status(200).json({email,token})
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }

    
}




//signup user

const signupUser = async (req, res) => {

    //destructure the req.body
    const { email, password } = req.body;

    //use a try catch block to handle error
    //that is thrown in model
    try {
        const user = await User.signup( email, password );

        //create token
        const token = createToken(user._id);

        res.status(200).json({email,token})
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }

}

export { loginUser, signupUser };