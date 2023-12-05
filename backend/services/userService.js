import mongoose, { set } from "mongoose";
import bcrypt from 'bcrypt';
import userSchema from '../model/UserSchema.js';
import tokenSchema from '../model/RefreshTokenSchema.js';
import jwt from "jsonwebtoken"
import tokenService from "../services/tokenService.js"

const User = mongoose.model('Users', userSchema);
const RefreshTokens = mongoose.model('RefreshTokens', tokenSchema );
import  Connection  from "../connection.js" ;

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
    return userInfos
    }
      
    catch (e) {
        console.log(e);
        throw e
    }
}
const availableUser = async (email, password) => {
  try {
    // Find user by email
    let user = await User.findOne({ email: email });

    if (!user) {
      // Handle case when user is not found
      return false;
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      if (user.isDeleted) {
        // Handle case when user is deleted
        return false;
      }

      // Generate tokens
      const accessToken = tokenService.generateAccessToken(user);
      const refreshToken = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.REFRESH_TOKEN_SECRET
      );

let userId = user.id
let token = refreshToken
      // Save refresh token to the database
      const newToken = new RefreshTokens({ token, userId });
      await newToken.save();

      // Return tokens
      return { accessToken, refreshToken };
    } else {
      // Handle case when password is invalid
      return false;
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
}