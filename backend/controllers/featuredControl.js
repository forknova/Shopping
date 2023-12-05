import productService from '../services/productService.js';
import featuredService from '../services/featuredService.js';

const addToFeatured = async (req,res) =>{
    try{
        const user = req.user;

        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        let prodId = req.body.productId;
        let added = featuredService.addToFeatured(user.userId,prodId);
        if(added){
            res.send(true)
        }
        else if (added == false){
            res.send(false) //wrong Id
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

const getFeatured = async(req,res) =>{
    try{
        let show = await featuredService.getFeatured();
        if(show){
            res.send(show)
        }
        else if( show ==false){
            res.send(false) //the featured table is empty
        }
    }  catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

const removeOne = async (req,res) => {
    try{
        const user = req.user;

        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        let prodId = req.params.productId;
        let deleted = await featuredService.removeOne(user.userId,prodId)
            if(deleted){
                res.send(true)
            }
            else if(deleted == false){
                res.send(false)
            }
        
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

export default {
    addToFeatured,
    getFeatured,
    removeOne
}