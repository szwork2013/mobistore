"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const _ = require('lodash');

const CONSTANTS = require('../../../constants/constants');
const ProductDao = require('../dao/product');
const ShoppingCartDao = require('../dao/shoppingCart');
const ShoppingCartItemDao = require('../dao/shoppingCartItem');
const StrAdvert = require('../dao/advert');
const StrCategory = require('../dao/category');

module.exports = class HomeService {
    static getData() {
       return Promise.join(HomeService.getProducts(), HomeService.getAdverts(),
              HomeService.getShoppingCartItemNumb(), HomeService.getcategories(),
            function (products, adverts, shoppingCartItemNumb, categories) {
                console.log('===', products, adverts, shoppingCartItemNumb, categories);

                return new Promise((resolve, reject) => {
                    resolve({
                            products: products,
                            adverts: adverts,
                            shoppingCartItemNumb: shoppingCartItemNumb,
                            categories: categories
                        });
                });
            }
        );
    }

    static getProducts () {
        return ProductDao.list();
    }

    static getAdverts () {
        return  StrAdvert.list();
    }

    static getShoppingCartItemNumb () {
      return  ShoppingCartDao.getItemNumb(CONSTANTS.testClientId);
    }

    static getcategories () {
      return  StrCategory.list();
    }
};
