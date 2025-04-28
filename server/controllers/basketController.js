const { jwtDecode } = require('jwt-decode');
const basketService = require('../services/basketService');

module.exports = {
    getCartFullProductList: {
        path: '/cart-full',
        method: 'get',
        /**
         * @param req {  Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> }
         * @param res {  Response<ResBody, LocalsObj> }
         * */
        handler: async (req, res) => {
            try {
                const userId = jwtDecode(req.headers.authorization).id;
                const result = basketService.getAllBasketProducts(userId);
                const products = result.products;

                let index = 0;
                let isStop = false;
                let resultProducts = [];

                while (!isStop) {
                    if (!products[index]) {
                        break;
                    }

                    await fetch(`https://api.v2.react-learning.ru/products/${products[index].id}`)
                        .then(res => res.json())
                        .then(data => {
                            resultProducts.push(data);
                            index++;
                            if (index >= products.length) {
                                isStop = true;
                            }
                        });
                }

                return res.status(200).json({
                    products: products.map((_, i, arr) => ({
                        product: resultProducts[i],
                        count: arr[i].count,
                    })),
                    count: result.count,
                });
            } catch (e) {
                return res.status(500).json({ message: e.message });
            }
        },
    },
    getCartShortProductList: {
        path: '/cart',
        method: 'get',
        /**
         * @param req {  Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> }
         * @param res {  Response<ResBody, LocalsObj> }
         * */
        handler: async (req, res) => {
            try {
                const userId = jwtDecode(req.headers.authorization).id;
                const result = basketService.getAllBasketProducts(userId);

                return res.status(200).json(result);
            } catch (e) {
                return res.status(500).json({ message: e.message });
            }
        },
    },
    getCartProductListCount: {
        path: '/cart/count',
        method: 'get',
        /**
         * @param req {  Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> }
         * @param res {  Response<ResBody, LocalsObj> }
         * */
        handler: (req, res) => {
            try {
                const userId = jwtDecode(req.headers.authorization).id;
                const result = basketService.getAllBasketProducts(userId);
                return res.status(200).json(result.count);
            } catch (e) {
                return res.status(500).json({ message: e.message });
            }
        },
    },
    addProductToCart: {
        path: '/cart/add',
        method: 'post',
        /**
         * @param req {  Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> }
         * @param res {  Response<ResBody, LocalsObj> }
         * */
        handler: (req, res) => {
            try {
                const userId = jwtDecode(req.headers.authorization).id;
                const { productId } = req.body;
                const { products } = basketService.getAllBasketProducts(userId);
                const currentProduct = products.find(product => product.id === productId);
                if (currentProduct) {
                    currentProduct.count++;
                } else {
                    products.push({ id: productId, count: 1 });
                }
                basketService.updateBasket(userId, products);
                return res.status(200).json(productId);
            } catch (e) {
                return res.status(500).json({ message: e.message });
            }
        },
    },
    removeProductFromCart: {
        path: '/cart/remove/:productId',
        method: 'delete',
        /**
         * @param req {  Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> }
         * @param res {  Response<ResBody, LocalsObj> }
         * */
        handler: (req, res) => {
            try {
                const userId = jwtDecode(req.headers.authorization).id;
                const { productId } = req.params;
                const { products } = basketService.getAllBasketProducts(userId);
                const currentProductIndex = products.findIndex(product => product.id === productId);

                if (currentProductIndex === -1) {
                    return res.status(404).json({ message: 'Продукт не найден в корзине' });
                }

                const currentProduct = products[currentProductIndex];
                currentProduct.count--;

                if (currentProduct.count === 0) {
                    products.splice(currentProductIndex, 1);
                }

                basketService.updateBasket(userId, products);
                return res.status(200).json(productId);
            } catch (e) {
                return res.status(500).json({ message: e.message });
            }
        },
    },
    deleteProductFromCart: {
        path: '/cart/delete/:productId',
        method: 'delete',
        /**
         * @param req {  Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>> }
         * @param res {  Response<ResBody, LocalsObj> }
         * */
        handler: (req, res) => {
            try {
                const userId = jwtDecode(req.headers.authorization).id;
                const { productId } = req.params;
                const { products } = basketService.getAllBasketProducts(userId);
                const currentProductIndex = products.findIndex(product => product.id === productId);

                if (currentProductIndex === -1) {
                    return res.status(404).json({ message: 'Продукт не найден в корзине' });
                }

                products.splice(currentProductIndex, 1);

                basketService.updateBasket(userId, products);
                return res.status(200).json(productId);
            } catch (e) {
                return res.status(500).json({ message: e.message });
            }
        },
    },
};
