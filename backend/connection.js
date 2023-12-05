import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const { MONGO_USER, MONGO_PASSWORD, MONGO_CLUSTER, MONGO_DATABASE } = process.env;

const connection = (async () => {
    try {
        if (!MONGO_USER || !MONGO_PASSWORD || !MONGO_CLUSTER) {
            throw new Error("MongoDB connection variables not provided");
        }

        const connectionString = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_CLUSTER}/${MONGO_DATABASE}?retryWrites=true&w=majority`;

        await mongoose.connect(connectionString, {});

        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
})();

export default {
    connection
}