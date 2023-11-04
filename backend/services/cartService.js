import mongoose from "mongoose";
import cartSchema from '../model/cartSchema.js';
import productSchema from '../model/productSchema.js';
import connection from "../connection.js"

const Cart = mongoose.model('ShoppingCarts', cartSchema);
const Product = mongoose.model('Products', productSchema);

const getCart = async (userId) => {
  try {
    
    let cart = await Cart.findOne({ userId: userId });
    console.log(cart)
    if (cart) {
      let msg = [];

      for (let i = 0; i < cart.products.length; i++) {
        let prodId = cart.products[i].productId;
        console.log(cart.products[i])

        let product = await Product.findById(prodId);

        let desc = product.description;
        let img = product.img
        let prodname = product.name;
        let prodprice = product.price

        let color = cart.products[i].color
        let size = cart.products[i].size
        let quantity = cart.products[i].quantity
        // msg.push( {product: cart.products[i], description: desc, });
        msg.push({ product: { productId: prodId, name: prodname, size: size, color: color, price: prodprice, quantity: quantity,  img:img }, description: desc });
        console.log(msg[0].product)

      }
      let prod = []
      prod.push(msg)
      prod.push(cart.totalcost)
      return prod
    } else {
      return false; // No cart
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
};


const addProduct = async (userId, prodId, color, size, quantity) => {

  try {
    // console.log(prodId)
    console.log(userId)
    let available = await Cart.findOne({ userId: userId })
    quantity = parseInt(quantity)
    if(checkQuantity(prodId,quantity)){
    if (available) {
           
      let products = available.products || [];
      products.push({ "productId": prodId, "color": color, "size": size, "quantity": quantity, })
      await Cart.updateOne({ userId: userId }, { products: products })
      let totalcost = await totalCost(available.id)
      await Cart.updateOne({ userId: userId }, { totalcost: totalcost })



      return true
           
           }
    
    else {
      let products = [{ "productId": prodId, "color": color, "size": size, "quantity": quantity }]
      let prod = await Product.findById(prodId)
      console.log(prod)
      let price = parseInt(prod.price)

      let totalcost = price * quantity



      const newCart = new Cart({
        userId,
        products,
        totalcost
      });

      await newCart.save();

      return true;


    }}
    return false //no quantity available

  }

  catch (e) {
    console.log(e);
    throw e;

  }
}

const totalCost = async (cartId) => {
  let total = 0;
  try {
    let cart = await Cart.findById(cartId);
    console.log(cart)
    if (cart) {
      for (let i = 0; i < cart.products.length; i++) {
        let prodId = cart.products[i].productId;
        let quantity = parseInt(cart.products[i].quantity);
        let prod = await Product.findById(prodId);
        let price = parseInt(prod.price);
        let totalPrice = price * quantity;
        total += totalPrice;
      }
      return total;
    }

  } catch (e) {
    console.log(e);
    throw e;
  }
}
const removeProduct = async (userId, prodId, size, color) => {
  try {

    let cart = await Cart.findOne({ userId: userId });
    let products = cart.products

    if (products.length > 0) { //if fi products
      for (let i = 0; i < products.length; i++) {
        //get their info
        let prodid = products[i].productId;
        let dbcolor = products[i].color;
        let dbsize = products[i].size;

        if (prodid == prodId && dbcolor == color && dbsize == size) {
          products.splice(i, 1);
          await Cart.updateOne({ userId: userId }, { products: products })
          await totalCost(cart.id)

          return true
        }
      }
    }

    return false
  }

  catch (e) {
    console.log(e);
    throw e;
  }
}

const editProduct = async (userId, prodId, size, color, quantity) => {
  try {
    let cart = await Cart.findOne({ userId: userId });
    let products = cart.products
    if (products.length > 0) {
      for (let i = 0; i < products.length; i++) {
        if (products[i].productId == prodId) {
          products[i].color  = color;
          products[i].size = size;
          products[i].quantity = quantity;
          if(checkQuantity(prodId,quantity)){
          let updated = await Cart.updateOne({ userId: userId }, { products: products })
          if (updated) {

            // recalculate total cost
            let totalcost = await totalCost(cart.id);
            await Cart.updateOne({ userId: userId }, { totalcost: totalcost });
            return true
          }}
          return false // quantity not available
        }
      }
    }
    else {
      return false //no product with this id
    }
  }
  catch (e) {
    console.log(e);
    throw e;
  }
}

const checkQuantity = async (productId,quantity)=>{
try{
  if(productId){
  let products = Product.findById(productId)
  let description = products.description
  for (let i = 0; i < description.length ; i++ ){
    for(let j = 1; j<description[i].length; j++){
      let prodquantity = description[i][j][1];
      if(quantity>prodquantity){
        return false
      }
    }

  }
  return true}
}
catch (e) {
  console.log(e);
  return false
}
}




export default {
  totalCost,
  addProduct,
  getCart,
  removeProduct,
  editProduct,
  checkQuantity
}