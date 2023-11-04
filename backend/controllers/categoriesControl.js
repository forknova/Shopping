import categoryService from '../services/categoryService.js';
const addCategory = async (req, res) => {
    try {
        let adminId = req.body.adminId;
        let gender = req.body.gender;
        let type = req.body.type;

        let added = await categoryService.addCategory(adminId, gender, type)
        if (added) {
            res.send(true)
        }
        else if (added == false) {
            res.send(false) //not an admin
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

const showAllcategories = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        console.log(categories)
        res.send(categories);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

export default {
    addCategory,
    showAllcategories
}