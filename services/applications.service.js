const fetch = require("node-fetch");
const moment = require("moment");

const filters = {
    FREE_TEXT: 'freeText',
    BIRTH_YEAR: 'birthYear',
    CATEGORIES: 'preferredCategories',
    MIN_RATE: 'minimumAppRating'
};

const FILTERED_APP_FIELDS = {
    MIN_AGE: 'min_age',
    CATEGORY: 'category',
    RATE: 'rating'
};

const APPLICATIONS_URL = 'https://gist.githubusercontent.com/orgoldfus/d1cd6b8a65a0d242a522b8fa12ca0304/raw/60ba3f3b2b1eabf72adfd9a043c77b8c648b79ef/apps.json';

class ApplicationsService {
    static async getRecommendedApplications(filtersFromRequest) {
        let json = await this.readFromJson();

        let recommendedFilters = json.filter((app) => {
            return this.runAllFilters(app, filtersFromRequest);
        });

        return recommendedFilters;
    }

    static readFromJson() {
        return new Promise((resolve, reject) => {
            fetch(APPLICATIONS_URL, {method: 'Get'})
                .then((resp) => resp.json())
                .then((json) => {
                    resolve(json);
                }).catch((error) => {
                    reject(error);
            });
        });
    }

    static runAllFilters(app, filtersFromRequest) {
        return this.filterByText(app, filtersFromRequest[filters.FREE_TEXT]) &&
               this.filterByBirthDate(app, filtersFromRequest[filters.BIRTH_YEAR]) &&
               this.filterByCategory(app, filtersFromRequest[filters.CATEGORIES]) &&
               this.filterByRate(app, filtersFromRequest[filters.MIN_RATE]);
    }

    static filterByText(app, text) {
        if (!text) return true;

        return Object.keys(app).some((field) => {
            return app[field].toString().toLowerCase().indexOf(text.toLowerCase()) !== -1;
        });
    }

    static filterByBirthDate(app, date) {
        if (!date) return true;

        let age = moment().diff(date, 'years');
        return age >= app[FILTERED_APP_FIELDS.MIN_AGE];
    }

    static filterByRate(app, rate) {
        if (!rate) return true;

        return parseFloat(rate) <= parseFloat(app[FILTERED_APP_FIELDS.RATE]);
    }

    static filterByCategory(app, categories) {
        if (!categories) return true;

        categories = categories.split(',');
        return categories.some((category) => category === app[FILTERED_APP_FIELDS.CATEGORY]);
    }
}

module.exports = ApplicationsService;
