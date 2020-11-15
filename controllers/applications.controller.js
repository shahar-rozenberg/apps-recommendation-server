var applicationsService = require('../services/applications.service');

const getFiltered = async (req, res, next) => {
    const recommendedApplications = await applicationsService.getRecommendedApplications(req.query);
    res.header('Access-Control-Allow-Origin', '*');
    res.status(200).json(recommendedApplications);

    //TODO: add logging end errors handling
}

module.exports = {
    getFiltered: getFiltered,
};