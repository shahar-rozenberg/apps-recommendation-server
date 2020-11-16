var categoriesService = require('../services/categories.service');

const getAll = async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    try {
        const allCategories = await categoriesService.getAllCategories();
        res.status(200).json(allCategories);
        console.info(`selected ${allCategories.length} categories`);
    } catch(error) {
        res.status(500).json(error.message);
        console.error('Failed to retrieve categories');
    }
}

module.exports = {
    getAll: getAll,
};