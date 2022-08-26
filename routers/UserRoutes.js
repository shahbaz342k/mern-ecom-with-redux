const express = require('express');
const Router = express.Router();
const { destroy, destroyAll, login, read, register, update, imgUpload } = require('../controllers/UserController');
const { upload } = require('../helper.js');
// import { verifyAdmin, verifyToken, verifyUser } from './../utils/authentication.js';


// Router.get('/checkauth', verifyToken, (req, res, next) => {
//     res.json('hello juser you are logged in')
// })

// Router.get('/checkauth/:id', verifyUser, (req, res, next) => {
//     res.json('hello juser you are logged in and you can perform task')
// })

// Router.get('/checkadmin/:id', verifyAdmin, (req, res, next) => {
//     res.json('hello admin you are logged in and you can perform all task')
// })

Router.post('/users/register',upload.single('file'),register);

Router.post('/users/login',login);

Router.get('/users/:id', read);

Router.get('/users/', read);

Router.put('/users/:id', update);

Router.delete('/users/:id', destroy);
Router.post('/imageupload',upload.single('image'),imgUpload)
Router.delete('/users/delete/all',destroyAll);

module.exports = Router;