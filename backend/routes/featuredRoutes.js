import express from 'express';

import tokenControl from '../controllers/tokenControl.js';
import featuredControl from '../controllers/featuredControl.js';
let app = express();
app.use(express.json());

  
app.get('/get-featured', tokenControl.token, featuredControl.getFeatured)
app.post('/add-featured', tokenControl.token, featuredControl.addToFeatured)
app.delete('remove-featured',tokenControl.token,  featuredControl.removeOne)
export default app