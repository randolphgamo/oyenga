import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";



//schema specifies the structure of the data
const userSchema = new mongoose.Schema({
   
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    
    
})

// static signup method

userSchema.statics.signup = async function (email, password) {


    //validation
    if (!email || !password) {
        throw Error("All fields must be filled");
    }

    if (!validator.isEmail(email)) {
        throw Error("Email is not valid");
    }

    if (!validator.isStrongPassword(password)) {
        throw Error("Password not strong enough");
    }
    

    //not really needed as property unique already enforces unicity

    //this refers to the model (User)
    const exists = await this.findOne({ email });

    if (exists) {
        throw Error("Email already in use");
    }


    //bcrypt helps in hashing the password
    //it also salts the password. 
    //salting allows to add random characters to password (before hashing) 
    //this ensures that two passwords that are the same will not be the same in db
    //make life harder for hackers.
    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(password, salt);


    //create the user in mongo
    const user = await this.create({ email, password: hash });

    return user;

}


//static login method
userSchema.statics.login = async function (email, password) {

    if (!email || !password) {
        throw Error("All fields must be filled");
    }

    const user = await this.findOne({ email });

    if (!user) {
        throw Error("Incorrect email");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw Error("Incorrect password");
    }

    return user;
}



//model applies the schema we have provided to create collection in mongo
export default mongoose.model("User", userSchema);