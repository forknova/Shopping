import express from 'express';

import cartControl from '../controllers/cartControl.js';
let app = express();
app.use(express.json());

  
app.post('/addToCart',  cartControl.addProduct)
app.get('/totalCost',  cartControl.totalCost)
app.get('/shoppingCart', cartControl.getCart)
app.delete('/deleteFromCart', cartControl.removeProduct)
app.put('/editCart',cartControl.editProduct)
export default app