import mongoose from "mongoose";
const Schema = mongoose.Schema;
const userSchema = new Schema({
   
    fullname: String,
    email: String,
    password: String,
    role: String,
   

});

export default userSchema