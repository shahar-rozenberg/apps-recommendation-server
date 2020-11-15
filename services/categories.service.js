const fetch = require("node-fetch");
const CATEGORIES_URL = 'https://gist.githubusercontent.com/orgoldfus/3889d968bda41bc1dc4df20ff0235ad5/raw/de7644ebe7982e3f31d596c0d3db2219f4c7e9eb/categories.json';

class CategoriesService {
    static async getAllCategories() {
        let categories = await this.readFromJson();
        return categories;
    }

    static readFromJson() {
        return new Promise((resolve, reject) => {
            fetch(CATEGORIES_URL, {method: 'Get'})
                .then((resp) => resp.json())
                .then((json) => {
                    resolve(json);
                }).catch((error) => {
                reject(error);
            });
        });
    }
}

module.exports = CategoriesService;
