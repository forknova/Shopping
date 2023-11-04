import express from 'express';
import boughtCartControl from '../controllers/boughtCartsControl.js';
let app = express();
app.use(express.json());
app.post('/buy', boughtCartControl.addToBought);
app.get('/all-orders/:userId', boughtCartControl.getHistory);
app.get('/get-one-order',boughtCartControl.getOneOrder)

export default app