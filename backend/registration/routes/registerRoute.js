import express from 'express';

import userControl from '../controllers/userControl.js';
let app = express();
app.use(express.json());

  
app.post('/register',  userControl.register)
app.get('/allUsers/:id', userControl.showAllUsers)
export default app;