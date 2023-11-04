import mongoose from "mongoose";
import productSchema from '../model/productSchema.js';
import userSchema from '../model/userSchema.js';
import featuredSchema from "../model/featuredSchema.js";
const Featured = mongoose.model('Featured', featuredSchema)
const Product = mongoose.model('Products', productSchema);
const User = mongoose.model('Users', userSchema);

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
        throw e
    }
};

const addToFeatured = async(adminId,prodId) =>{
    try{
        if(await isAdmin(adminId)){
        let product = await Product.findById(prodId);
        if(product){
            let productId = prodId
            const newFeatured = new Featured({
              productId
                
            });
           await newFeatured.save()
           return true
        }
        return false
    }
    return false //not an admin
}
    catch (e) {
        console.log(e);
        throw e
    }

}

const getFeatured = async () => {
    try{
        let features = await Featured.find();
        let msg = []
        if(features.length>0){
            for(let i=0 ; i<features.length; i++){
             let product = await Product.findById(features[i].productId)   
               msg.push({"id":product.id,"name":product.name, "img":product.img, "price":product.price})
            }
            return msg
        }
        return false //no featured posts 
    }
    catch (e) {
        console.log(e);
        throw e
    }
}

const removeOne = async (adminId,prodId) => {
    try{
        if(await isAdmin(adminId)){
       let deleted = await Featured.findOneAndDelete({productId:prodId})
       if(deleted){
        return true
       }
       return false
    }
    return false // not an admin
}
    catch (e) {
        console.log(e);
        throw e
    }

}

export default {
    getFeatured,
    addToFeatured,
    removeOne
}

