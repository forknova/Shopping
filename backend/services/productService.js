// //product service

import mongoose from "mongoose";
import productSchema from '../model/productSchema.js';
import userSchema from '../model/userSchema.js';
import categorySchema from '../model/categorySchema.js'
import fs from 'fs'
import path from "path";

const User = mongoose.model('Users', userSchema);
const Product = mongoose.model('Products', productSchema);
const Categories = mongoose.model('categories', categorySchema);


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
        throw e
    }
};

const addProduct = async (adminId, name, file, price, description, category) => {

    try {
        console.log(file)
        const sourcePath = file.path;
        const uniqueIdentifier = Date.now(); // to prevent errors
        const pathToSave = "C:/pojects/Interphase-project-main/Interphase-project-main/backend/public"
        const destinationPath = path.join(pathToSave, `${uniqueIdentifier}_${file.originalname}`);

        
        const readStream = fs.createReadStream(sourcePath);
const writeStream = fs.createWriteStream(destinationPath);

readStream.pipe(writeStream);
        const url = destinationPath;
        const filename=uniqueIdentifier+"_"+file.originalname
        const img = { filename, url };
        let cat = await Categories.findOne({$and: [{gender: category.gender, type: category.type}]});
        let categoryId = cat.id
        if(categoryId){

        if (await isAdmin(adminId)) {
            const newProduct = new Product({
                name,
                price,
                description,
                categoryId,
                img

            });


            await newProduct.save();

            // console.log(description)
            return true;

        }
        else {
            return false //not an admin
        }
    }
    else{
        return false //no category with these type  and gender
    }
    }
    catch (e) {
        console.log(e);
        throw e

    }
}

const getAllProducts = async (adminId) => {
    try {
        // if (await isAdmin(adminId)) {
        let products = await Product.find()
        let productsInfo = []
        for (let i=0 ; i<products.length ; i++){
            if(!(products[i].isDeleted)){
            let catId = products[i].categoryId
            if(catId){
                let category = await Categories.findById(catId)
                productsInfo.push({"_id":products[i].id, "name":products[i].name, "img":products[i].img, "price":products[i].price,"description":products[i].description,"categoryId":products[i].categoryId,"gender":category.gender,"type":category.type , "isDeleted":products[i].isDeleted})
            }
        }
        }
        return productsInfo
    // }
    // return false // not an admin

            ;


    }
    catch (e) {
        console.log(e);
        throw e
    }
}

const getOneProduct = async (productId) => {
    try {
        let product = await Product.findById(productId);
        let productsInfo
        if(product){
            let catId = product.categoryId
            if(catId){
                let category = await Categories.findById(catId)
            productsInfo={"_id":product.id, "name":product.name, "img":product.img, "price":product.price,"description":product.description,"categoryId":product.categoryId,"gender":category.gender,"type":category.type}
            
        }
        return productsInfo

        }
            return false //no product with this id
        

    }
    catch (e) {
        console.log(e);
        throw e
    }
}


const removeProduct = async (adminId, productId) => {
    try {
        if (await isAdmin(adminId)) {
            let product = await Product.findById(productId);
            if (product) {
              product.isDeleted = true;
              await product.save(); 
              return true;
            } else {
              return false;
            }
        }
        else {
            return false //not an admin
        }
    }
    catch (e) {
        console.log(e);
        throw e
    }
}


const editProduct = async (adminId, productId, name, price, description, category) => {
    try {
        if (await isAdmin(adminId)) {
            let updated = await Product.findByIdAndUpdate(productId, { name: name, price: price, description: description, category: category })
            console.log(updated)
            if (updated) {
                return true
            //     if(checkquantity(productId))
            //     return true
            // else {
            //     return false
            // }
            }
            else {
                return false // no prod with this id
            }
        }
        else {
            return false // not an admin
        }
    }
    catch (e) {
        console.log(e);
        throw e
    }

}

const searchProduct = async (gender, type, search, sort,page) => {
    try {
  let start = (page-1)*12
  let count
        let products = await Product.find({isDeleted:false});
        count = await Product.find({isDeleted:false}).count()
        let query = {};

        if (gender != "") {
            query['category.gender'] = gender;
        }

        if (type != "") {
            query['category.type'] = type;
        }

        if (search != "") {

            products = await Product.find({ $and: [query, { name: { $regex: search, $options: 'i' } }, {isDeleted:false}] }).skip(start).limit(12);;


        }
        else {
            products = await Product.find({ $and: [query, {isDeleted:false}]}).skip(start).limit(12);
            count = await Product.find(query).count()
        }
        if (sort == "asc") {
            products = await Product.find({ $and: [query, {isDeleted:false}]}).sort({ 'price': 1 }).skip(start).limit(12).exec();
            count = await Product.find({ $and: [query, {isDeleted:false}]}).count();
        } else if (sort == "dsc") {
            products = await Product.find({ $and: [query, {isDeleted:false}]}).sort({ 'price': -1 }).skip(start).limit(12).exec();
            count = await Product.find({ $and: [query, {isDeleted:false}]}).count();
        }
        

let produits = [products]
       produits.push(products.length)
       produits.push(count)
       return produits


    } catch (e) {
        console.error(e);
        throw e;
    }
}




// const checkquantity = async (productId) => {
//     try{
//     let product = await Product.findById(productId)
//     for(let i = 0 ; i< product.description.length ; i++){
//         for(let j=0 ; j< product.description[i].length; j++)
//         if(product.description[i][j][1] == 0){
//             product.description.splice([i][j])
//             let updated = await Product.findByIdAndUpdate(productId, {products:product})
//             if(updated){
//                 return true
//             }
//             return false
//         }

//     }} catch (e) {
//         console.error(e);
//         throw e;
//     }
// }



export default {
    mongoose,
    addProduct,
    isAdmin,
    getAllProducts,
    removeProduct,
    editProduct,
    searchProduct,
    getOneProduct
};