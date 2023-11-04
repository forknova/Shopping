import mongoose from "mongoose";
const Schema = mongoose.Schema;
const userSchema = new Schema({
   
    fullname: String,
    email: String,
    password: String,
    role: { type: String, enum: ["admin", "user"] },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false,
      },
});

export default userSchema