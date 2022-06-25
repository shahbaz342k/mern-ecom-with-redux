const express = require('express');
const Router = express.Router();
const { add, read, destroy } = require('../controllers/OrderController');

// take order route
Router.post('/order/', add);

// get orders route
Router.get('/order/:id?', read);

Router.delete('/order/', destroy);

module.exports = Router;