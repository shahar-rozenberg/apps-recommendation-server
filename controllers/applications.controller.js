var applicationsService = require('../services/applications.service');

const getFiltered = async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    try {
        const recommendedApplications = await applicationsService.getRecommendedApplications(req.query);
        res.status(200).json(recommendedApplications);
        console.info(`selected ${recommendedApplications.length} applications`);
    } catch(error) {
        res.status(500).json(error.message);
        console.error('Failed to retrieve match applications');
    }
}

module.exports = {
    getFiltered: getFiltered,
};