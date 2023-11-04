import mongoose from "mongoose";
const Schema = mongoose.Schema;
const productSchema = new Schema({

    name: String,
    price: Number,
    description: Array,
    categoryId:{ type: Schema.Types.ObjectId, ref: 'categories' },
    img: {
        filename: String,
        url: String,
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
    

});

export default productSchema