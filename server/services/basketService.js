const fileService = require('./objectFileService');

const fileName = 'basket.json';

module.exports = {
    getAllBasketProducts: function (userId) {
        const basketProducts = fileService.getElementByKey(fileName, userId);

        if (!basketProducts || basketProducts.length === 0) {
            fileService.createElement(fileName, userId, []);

            return { products: [], count: 0 };
        }

        let count = 0;

        basketProducts.forEach(product => {
            count += product.count;
        });

        return { products: basketProducts, count };
    },

    updateBasket: function (userId, newProducts) {
        try {
            fileService.updateElement(fileName, userId, newProducts);
        } catch (e) {
            throw new Error(`Fail to update basket for a user with id=${userId}, reason: "${e.message}"`);
        }
    },
};
