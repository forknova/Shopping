import mongoose from "mongoose";
const Schema = mongoose.Schema;
const categorySchema = new Schema({

    gender: { type: String, enum: ["men", "women"] },
    type: String

});

export default categorySchema