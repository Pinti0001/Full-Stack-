import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    postImageLink : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
    },
    author : {
        type : String,
        trim : true,
        toLowerCase : true,
        required : true,
    },

}, {timestamps : true})

export default mongoose.model("Post", postSchema)