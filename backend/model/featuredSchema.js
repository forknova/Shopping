import mongoose from "mongoose";
const Schema = mongoose.Schema;
const featuredSchema = new Schema({
productId :{ type: Schema.Types.ObjectId, ref: 'products' }

});

export default featuredSchema