import mongoose from "mongoose";
import userSchema from '../model/userSchema.js';


const User = mongoose.model('Users', userSchema);
(async () => {
    try {
        await mongoose.connect("mongodb+srv://user1:hUVuQH7FzEB3AxM2@atlascluster.5feaxgy.mongodb.net/?retryWrites=true&w=majority", {
          
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
})();

const register= async(fullname, email, password) =>{
  
    let boolean = "";
    try{
       
      let alreadytaken=  await User.find({email: email})
      if(alreadytaken.length>0){
       
         boolean="email already used";
      }
      else{
       
    const newUser = new User({
        fullname,
        email,
        password,
        role: "user",
        
    });
  
 console.log(JSON.stringify(newUser))
    await newUser.save();
  
    
    boolean = "done"}

}
 catch (e) {
    console.log(e);
    boolean = "an error occurs"
}
return boolean
}

const isAdmin = async (id) => {
    try {
        const admin = await User.findById(id);
        console.log(id)
        if (admin && admin.role === "admin") {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        console.log(e);
        return "an error occurs"; 
    }
};

const getAllUsers = async() => {
    try{
        return await User.find({})
        
    }
    catch (e) {
        console.log(e);
        return "an error occurs"; 
    }
}




export default {
    mongoose,
    register,
    isAdmin,
    getAllUsers
};