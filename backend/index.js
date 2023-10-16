
import express from 'express';
import routes from './registration/routes/registerRoute.js';


let app = express();
const PORT = process.env.PORT || 4000;

app.use(routes);

app.listen(PORT, () => console.log("listening on port " + PORT));