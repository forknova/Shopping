import mongoose from "mongoose";
const connection = 

(async () => {
    try {
        await mongoose.connect("mongodb+srv://user1:hUVuQH7FzEB3AxM2@atlascluster.5feaxgy.mongodb.net/?retryWrites=true&w=majority", {

        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
})();

export default{
    connection
}