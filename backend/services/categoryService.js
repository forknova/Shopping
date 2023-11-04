import mongoose from "mongoose";
import categorySchema from '../model/categorySchema.js';
import userSchema from '../model/userSchema.js';
const User = mongoose.model('Users', userSchema);
const Category = mongoose.model('Categories', categorySchema);

import connection from "../connection.js"

const isAdmin = async (id) => {
    try {
        const admin = await User.findById(id);
       
        if (admin && admin.role === "admin") {
            return true;
        } else {
            
            return false;
        }
    } catch (e) {
        console.log(e);
        return false;
    }
};
const addCategory = async (adminId,gender,type) =>{

    try{

        if(await isAdmin (adminId)){
    const newCategory = new Category({
        gender,
        type
        
    });
  
   if( await newCategory.save()){
  return true;
   } 
   else{
    return false 
  }
}
  else{
    return false //not an admin
  }
}
catch (e) {
    console.log(e);
   return undefined;
  
}
}

const getAllCategories = async() => {
    try{
        
        let categories = await Category.find();
        let categoriesInfo = categories.map(categ => {
         
         return  categ.type;
         })
     return categoriesInfo
     }
      
      
  
      
    
    catch (e) {
        console.log(e);
        return undefined
    }
}
export default{
    addCategory,
    getAllCategories
}