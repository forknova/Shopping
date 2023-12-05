import cartService from '../services/cartService.js';
const getCart= async (req,res) => {
    try{
        const user = req.user;

        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        let cart = await cartService.getCart(user.userId)
        if(cart){
            res.send(cart)
        }
        else{
            res.send(false)
        }
    }

catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
}
}
const addProduct = async(req,res) => {
try{
    
    const user = req.user;
    if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    let quantity = req.body.quantity;
    quantity = parseInt(quantity)
    let size = req.body.size;
    let color = req.body.color
    let prodId = req.body.productId;
    console.log("thisssss"+user.userId)
    
    let added = await cartService.addProduct(user.userId,prodId,color,size,quantity)
    if(added){
        res.send(true)
    }
    else if (added == false){
        res.send(false)
    }

}
catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
}
}


const totalCost= async (req, res) => {
    try{
  let calculated = await cartService.totalCost()
 if(calculated>=0){
    return calculated
 }
 else{
    return false
 }

    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}
const removeProduct= async(req,res) => {
    try{
        
        const user = req.user;

        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        let prodId=req.query.productId;
        let color =req.query.color;
        let size = req.query.size;
        let deleted = await cartService.removeProduct(user.userId,prodId,size,color);
        if(deleted){
            res.send(true)
        }
        else if (deleted == false){
            res.send(false)
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }

}
const editProduct = async(req, res) => {
    try{
        
        const user = req.user;

        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        let quantity = req.body.quantity;
        quantity = parseInt(quantity)
        let size = req.body.size;
        let color = req.body.color
        let prodId = req.query.productId;
        let edited = await cartService.editProduct(user.userId,prodId,size,color,quantity)
        console.log(edited)
        if(edited){
            res.send(true)
        }
        else if(edited == false){
            res.send(false)
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}
export default{
    getCart,
    addProduct,
    totalCost,
    removeProduct,
    editProduct
}