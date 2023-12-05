import express from 'express';
import tokenControl from '../controllers/tokenControl.js';
import boughtCartControl from '../controllers/boughtCartsControl.js';
let app = express();
app.use(express.json());
app.post('/buy',tokenControl.token,boughtCartControl.addToBought);
app.get('/all-orders', tokenControl.token,boughtCartControl.getHistory);
app.get('/get-one-order/:orderId',tokenControl.token,boughtCartControl.getOneOrder)
app.get('/admin-orders',tokenControl.token, boughtCartControl.adminOrders)

export default app