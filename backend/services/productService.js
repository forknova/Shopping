// //product service
import path from "path";
import mongoose from "mongoose";
import productSchema from '../model/ProductSchema.js';
import userSchema from '../model/UserSchema.js';
import categorySchema from '../model/CategorySchema.js'
import fs from 'fs'
import Connection from "../connection.js";


const User = mongoose.model('Users', userSchema);
const Product = mongoose.model('Products', productSchema);
const Categories = mongoose.model('categories', categorySchema);


import { json } from "express";
import { Console } from "console";

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

const addProduct = async (adminId, name, imgUrl, price, description, category) => {

    try {
        let cat = await Categories.findOne({ $and: [{ gender: category.gender, type: category.type }] });
        let categoryId = cat.id
        if (categoryId) {

            if (await isAdmin(adminId)) {
                const newProduct = new Product({
                    name,
                    price,
                    description,
                    categoryId,
                    imgUrl

                });


                await newProduct.save();

                // console.log(description)
                return true;

            }
            else {
                return false //not an admin
            }
        }
        else {
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
        if (await isAdmin(adminId)) {
            let products = await Product.find()
            let productsInfo = []
            for (let i = 0; i < products.length; i++) {
                if (!(products[i].isDeleted)) {
                    let catId = products[i].categoryId
                    if (catId) {
                        let category = await Categories.findById(catId)
                        productsInfo.push({ "_id": products[i].id, "name": products[i].name, "img": products[i].imgUrl, "price": products[i].price, "description": products[i].description, "categoryId": products[i].categoryId, "gender": category.gender, "type": category.type, "isDeleted": products[i].isDeleted })
                    }
                }
            }
            return productsInfo
        }
        return false // not an admin

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
        if (product) {
            let catId = product.categoryId
            if (catId) {
                let category = await Categories.findById(catId)
                productsInfo = { "_id": product.id, "name": product.name, "img": product.imgUrl, "price": product.price, "description": product.description, "categoryId": product.categoryId, "gender": category.gender, "type": category.type }

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
            // console.log(updated)
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

const searchProduct = async (gender, type, search, sort, page) => {
    try {
        let query = {};

        if (gender != '') {
            query.gender = gender;
        }

        if (type != "") {
            query.type = { $regex: type, $options: 'i' };
        }

        let categ = await Categories.find(query);
        let produits = [];
        let totalCount = 0;
        let products;

        if (categ.length > 0) {
            for (let i = 0; i < categ.length; i++) {
                let categId = categ[i].id;

                if (search != "") {
                    query = {
                        $and: [
                            { categoryId: categId },
                            { name: { $regex: search, $options: 'i' } },
                            { isDeleted: false }
                        ]
                    };
                } else {
                    query = {
                        $and: [
                            { categoryId: categId },
                            { isDeleted: false }
                        ]
                    };
                }

                products = await Product.find(query);

                let count = await Product.find(query).count();
                totalCount += count;

                produits.push(...products);
            }
        }

        if (sort == "asc") {
            produits.sort((a, b) => a.price - b.price);
        } else if (sort == "dsc") {
            produits.sort((a, b) => b.price - a.price);
        }

        if (page > 1) {
            let splice = (page - 1) * 12;
            produits.splice(0, splice);
            produits.splice(page * 12);
        } else {
            produits.splice(12);
        }

        return [
            produits,
            produits.length,
            totalCount
        ];

    } catch (e) {
        console.error(e);
        throw e;
    }
}
    // else {
        //     if (search != "") {

        //         products = await Product.find({ $and: [{ name: { $regex: search, $options: 'i' } }, { isDeleted: false }] }).skip(start).limit(12);;

        //         if (sort == "asc") {
        //             products = await Product.find({ $and: [{ isDeleted: false} ,{ name: { $regex: search, $options: 'i' }} ] }).sort({ 'price': 1 }).skip(start).limit(12).exec();
        //             count = await Product.find({ $and: [{ isDeleted: false} ,{ name: { $regex: search, $options: 'i' }} ] }).count();
        //         } else if (sort == "dsc") {
        //             products = await Product.find({ $and: [{ isDeleted: false} ,{ name: { $regex: search, $options: 'i' }} ] }).sort({ 'price': -1 }).skip(start).limit(12).exec();
        //             count = await Product.find({ $and: [{ isDeleted: false} ,{ name: { $regex: search, $options: 'i' }} ] }).count();
        //         }

        //     }
        //     else {
                
        //         products = await Product.find({ isDeleted: false }).skip(start).limit(12);
        //         count = await Product.find({ isDeleted: false }).count()
               
        //     if (sort == "asc") {
        //         products = await Product.find({ isDeleted: false }).sort({ 'price': 1 }).skip(start).limit(12).exec();
        //         count = await Product.find({ isDeleted: false }).count();
        //     } else if (sort == "dsc") {
        //         products = await Product.find({ isDeleted: false }).sort({ 'price': -1 }).skip(start).limit(12).exec();
        //         count = await Product.find({ isDeleted: false }).count();
        //     }
        //     }

        //     produits = products
        //     produits.push(products.length)
        //     produits.push(count)
        //     return produits
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