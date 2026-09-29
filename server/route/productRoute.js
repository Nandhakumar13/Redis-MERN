const express = require('express');
const ProductMethods = require('../controller/ProductController');

const prodRoute = express.Router();

prodRoute.route('/product').get(ProductMethods.getAllProduct);
prodRoute.route('/product/create').post(ProductMethods.createProduct);

module.exports  = prodRoute;