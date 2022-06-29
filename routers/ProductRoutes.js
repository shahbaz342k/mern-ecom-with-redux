const express = require('express');
const Router = express.Router();
const { add, read, update, destroy, destroyAll, productCart, searchProduct } = require('../controllers/ProductController.js');

Router.post('/products/', add);

Router.get('/products/:id?', read);
// Router.get('/products/', read);

Router.put('/products/:id', update);

Router.delete('/products/:id', destroy);

// Router.delete('/products/delete/all',destroyAll);

Router.post('/cart', productCart);

// search product api
Router.get('/products/find/:query', searchProduct);


module.exports = Router;