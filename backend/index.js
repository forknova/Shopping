
import express from 'express';
import userRoute from './routes/userRoute.js';
import productRoute from './routes/productsRoutes.js';
import categoryRoute from './routes/categoriesRoutes.js'
import cartRoute from './routes/cartRoute.js';
import ordersRoute from './routes/boughtCartRoutes.js';
import featuredRoute from './routes/featuredRoutes.js'

import cors from 'cors';

let app = express();

app.use(cors())
const PORT =  4000;

app.use(userRoute);
app.use(productRoute)
app.use(categoryRoute)
app.use(cartRoute)
app.use(ordersRoute)
app.use(featuredRoute)



app.listen(PORT, () => console.log("listening on port " + PORT));