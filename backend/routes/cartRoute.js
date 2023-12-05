import express from 'express';

import tokenControl from '../controllers/tokenControl.js';
import cartControl from '../controllers/cartControl.js';
let app = express();
app.use(express.json());

  
app.post('/add-to-cart', tokenControl.token, cartControl.addProduct)
app.get('/total-cost',tokenControl.token,  cartControl.totalCost)
app.get('/shopping-cart',tokenControl.token, cartControl.getCart)
app.delete('/delete-from-cart',tokenControl.token, cartControl.removeProduct)
app.put('/edit-cart',tokenControl.token,cartControl.editProduct)
export default app