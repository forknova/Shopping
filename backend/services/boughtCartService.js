import mongoose from "mongoose";
import boughtCartSchema from '../model/boughtCartSchema.js';

import cartSchema from '../model/cartSchema.js';
import productSchema from '../model/productSchema.js';
const Product = mongoose.model('Products', productSchema);
const Cart = mongoose.model('ShoppingCarts', cartSchema);
const Bought = mongoose.model('BoughtCarts', boughtCartSchema);
import connection from "../connection.js"

const addToBought = async (userId, paymentMethod, adress, date) => {
    try {
        let cart = await Cart.findOne({userId:userId})

        if (cart) {
            let cartId = cart.id;
            let products = cart.products;
            // console.log("thissss"+products)
            let totalcost = cart.totalcost;
            let paymentmethod = paymentMethod;
            if (retrieveQuantity(products)==true) {
                const newCart = new Bought({
                    userId,
                    products,
                    adress,
                    paymentmethod,
                    totalcost,
                    date

                });
                let save = await newCart.save();
                await checkquantity()
                if (save) {
                    let deleted = await Cart.findByIdAndDelete(cartId)
                    if (deleted) {
                        return true
                    }
                    else {
                        return false
                    }
                }
            }
            else {
                return false
            }
        }
    }
    catch (e) {
        console.log(e);
        throw e

    }
}

const getHistory = async (userId) => {
    try {
        let hist = await Bought.find({userId : userId})
        let msg =[]
        if (hist.length > 0) {
            for (let i = 0 ; i<hist.length ; i++){
                msg.push({"id": hist[i].id, "prodnumb":hist[i].products.length, "totalCost": hist[i].totalcost, "paymentMethod": hist[i].paymentmethod, "date": hist[i].date})
           console.log(msg)
            }
            return msg
        }
        else {
            return false //he has no orders history
        }
    } catch (e) {
        console.log(e);
        throw e

    }
}
const retrieveQuantity = async (order) => {
    try {
        for (let i = 0; i < order.length; i++) {
            let product = order[i];
            let prodId = order[i].productId.valueOf(); // productId value
            let quantity = parseInt(product.quantity); // converting quantity to a number
            let color = product.color;
            let size = product.size;

            let prod = await Product.findById(prodId);

            let description = prod.description;
            for (let i = 0; i < description.length; i++) {
                if (description[i][0] == color) {
                    for (let j = 1; j < description[i].length; j++) {
                        if (description[i][j][0] == size) {
                            let prodquantity = description[i][j][1];
                            console.log("prodQuant"+prodquantity)
                            console.log("quant"+ quantity)
                            if (prodquantity < quantity) {
                                return false; // no available quantity
                            } else {
                                description[i][j][1] = prodquantity - quantity;
                                let updated = await Product.findByIdAndUpdate(prodId, { description: description });
                                if (updated) {
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
        }
        return false;
    } catch (e) {
        console.log(e);
        throw e;
    }
};
 const getOneOrder = async (userId,orderId) =>{
    try{
        let order = await Bought.findById(orderId);
        if(order && order.userId == userId){
            return order
        }
            return false //wrong order Id or userId
        
    } catch (e) {
        console.log(e);
        throw e;
    }

 }
 const checkquantity = async () => {
    try{
    let products = await Product.find()
    for(let k=0; k<products.length; k++)
    for(let i = 0 ; i< products[k].description.length ; i++){
        for(let j=0 ; j< products[k].description[i].length; j++)
        if(products[k].description[i][j][1] == 0){
            products[k].description.splice([i][j])
            let id = products[k].id
            let updated = await Product.findByIdAndUpdate(id, {products:products})
            if(!updated){
                return false
            }
        }

    }} catch (e) {
        console.error(e);
        throw e;
    }
}



export default {
    addToBought,
    getHistory,
    getOneOrder
}
