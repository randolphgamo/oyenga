import mongoose from "mongoose";


//schema specifies the structure of the data
const songSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: true
    }, 
    content: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: false
    },
    genre: {
        type: String,
        required: true
    },
    
    rating: {
        type: Number,
        required: false
    }
   
}, //this tell us when the data was created 
{timestamps: true})


//model applies the schema we have provided to create the collection in the db
export default mongoose.model("Song", songSchema);