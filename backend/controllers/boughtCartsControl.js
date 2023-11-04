import boughtCartService from '../services/boughtCartService.js';

const addToBought = async (req, res) =>{
    try{
        let userId = req.body.userId;
        let paymentMethod = req.body.paymentMethod;
        let adress = req.body.adress;
        let d = new Date()
        let date = formatDate(d)
        if(cartId){
            let added = await boughtCartService.addToBought(userId, paymentMethod, adress,date)
            if(added){
                res.send(true)
            }
            else if(added == false){
                res.send(false) 
            }
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}
function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }

const getHistory = async (req,res) => {
    try{
       
        let userId = req.params.userId;
        console.log(userId)
        if(userId){
            let hist = await boughtCartService.getHistory(userId)
            if(hist){
                res.send(hist)
            }
            else if(hist == false){
                res.send(false) // no carts available
            }
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

const getOneOrder = async (req,res) => {
    try{
    let userId = req.query.userId;
    let orderId = req.query.orderId;
    let show = await boughtCartService.getOneOrder(userId,orderId);
    if(show){
       res.send(show)
    }
    else if(show == false){
       res.send(false)
    }
}
catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
}

}

export default {
    addToBought,
    getHistory,
    getOneOrder
}