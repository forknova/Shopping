import boughtCartService from '../services/boughtCartService.js';

const addToBought = async (req, res) =>{
     try{ 
         const user = req.user;

        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        let paymentMethod = req.body.paymentMethod;
        let adress = req.body.adress;
        let d = new Date()
        let date = formatDate(d)
            let added = await boughtCartService.addToBought(user.userId, paymentMethod, adress,date)
            if(added){
                res.send(true)
            }
            else if(added == false){
                res.send(false) 
            }
        }
    
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}
function formatDate(date) {
    if (!(date instanceof Date) || isNaN(date)) {
        throw new Error('Invalid date object');
    }

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
}

const getHistory = async (req,res) => {
    try{
        const user = req.user;

        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        if(user.userId){
            let hist = await boughtCartService.getHistory(user.userId)
            if(hist){
                res.send(hist)
            }
            else if(hist == false){
                res.status(404).send(false) // no carts available
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
         const user = req.user;

        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
    let orderId = req.params.orderId;
    let show = await boughtCartService.getOneOrder(orderId);
    if(show){
       res.send(show)
    }
    else if(show == false){
       res.status(404).send(false)
    }
}
catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
}

}

const adminOrders = async (req,res) => {
    try{
        const admin = req.user;
        if(!admin){
            res.status(401).json({ error: 'Unauthorized' });
        }
        let orders = await boughtCartService.adminOrders (admin.userId)
        if(orders){
            res.send(orders)
        }
        else if(orders == false){
            res.status(401).json({ error: 'Unauthorized' });
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
    getOneOrder,
    adminOrders
}