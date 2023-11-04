import mongoose, { set } from "mongoose";
import bcrypt from 'bcrypt';
import userSchema from '../model/userSchema.js';
import connection from "../connection.js"

const User = mongoose.model('Users', userSchema);

const register= async(fullname, email, password) =>{
  
    let action = "";
    try{
       
      let alreadytaken=  await User.find({email: email})
      if(alreadytaken.length>0){
       
        return false ;
      }
      else{
       
    const newUser = new User({
        fullname,
        email,
        password,
        role: "user",
        
    });
  
    await newUser.save();
  
    
  return true}

}
 catch (e) {
    console.log(e);
    throw e;
  
}

}

const isAdmin = async (id) => {
    try {
        const user = await User.findById(id);
        if (user && user.role === "admin") {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        console.log(e);
        throw e
    }

};

const getAllUsers = async(id) => {
    try{
        let users = await User.find({ isDeleted: false , role:'user' }); //role ykun user krml ma ytlaalo l account taba3o w krml ma a3ml filter iza rad null
       let userInfos = users.map(user => {
        return { id: user.id, fullname: user.fullname, email: user.email, role: user.role };
    })
    }
      
    catch (e) {
        console.log(e);
        throw e
    }
}
const availableUser = async(email,password) => {

    try{
        let user = await User.findOne({email: email})
        let hash = user.password;
        if(await bcrypt.compare(password, hash)){
            if(user.isDeleted==true){
                return false
            }
            return user.id
        }
        else{
            return false
        }
        
      
    }
    catch (e) {
        console.log(e);
        throw e;
    }

 }

 const editUser= async(userId, email, password) => {
     try{
         let updated = await User.findByIdAndUpdate(userId,{email : email, password: password})
         if(updated){
             return true
         }
          else{
              return false
          }
     }
     catch (e) {
        console.log(e);
        throw e
        
    }
}   


const deleteUser = async (id) => {
    try {
      let deleted = await User.findById(id);
      if (deleted) {
        deleted.isDeleted = true;
        await deleted.save(); 
        console.log(deleted);
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.error(e);
      throw e
    }
  }

  const showInfo = async (userId) => {
    try{
      let user = await User.findById(userId);
      if(user){
          return {"id":user.id , "email":user.email}
      }
      else{
        return false // no user with this id
      }
    } catch (e) {
        console.error(e);
        throw e
      }
  }
  




export default {
    mongoose,
    register,
    isAdmin,
    getAllUsers,
    availableUser,
    editUser,
    deleteUser,
    showInfo
};