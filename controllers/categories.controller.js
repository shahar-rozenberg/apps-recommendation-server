var categoriesService = require('../services/categories.service');

const getAll = async (req, res, next) => {
    const allCategories = await categoriesService.getAllCategories();
    res.header('Access-Control-Allow-Origin', '*');
    res.status(200).json(allCategories);

    //TODO: add logging end errors handling
}

module.exports = {
    getAll: getAll,
};