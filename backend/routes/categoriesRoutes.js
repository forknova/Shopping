import express from 'express';

import categoryControl from '../controllers/categoriesControl.js';
let app = express();
app.use(express.json());

  
app.post('/addCategory',  categoryControl.addCategory)
app.get('/allCategories',  categoryControl.showAllcategories)
// app.delete('/removeProduct', productControl.removeProduct)
// app.put('/editProduct', productControl.editProduct)
// app.get('/checkquantity', productControl.checkquantity)
export default app
