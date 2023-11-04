import mongoose from "mongoose";
const Schema = mongoose.Schema;
const cartSchema = new Schema({
   userId: { type: Schema.Types.ObjectId, ref: 'users' },
   products: [
      {
         productId: { type: Schema.Types.ObjectId, ref: 'products' },
         color: String, // Define the type for color (e.g., String, Number, etc.)
         size: { type: String, enum: ["s", "m","l","xl"] },
         quantity: Number // Corrected type from string to Number
      }
   ],
   totalcost: Number
});

export default cartSchema

