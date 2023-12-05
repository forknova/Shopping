import express from 'express';

import tokenControl from '../controllers/tokenControl.js';
import categoryControl from '../controllers/categoriesControl.js';
let app = express();
app.use(express.json());

  
app.post('/add-category', tokenControl.token, categoryControl.addCategory)
app.get('/all-categories', tokenControl.token,  categoryControl.showAllcategories)
// app.delete('/removeProduct', productControl.removeProduct)
// app.put('/editProduct', productControl.editProduct)
// app.get('/checkquantity', productControl.checkquantity)
export default app
