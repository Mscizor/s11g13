const express = require('express');
const router = express();

// controllers that provide functions depending on post or get
const controller = require('../controllers/indexController');
const logController = require("../controllers/loginController");
const regController = require("../controllers/registerController");
const userController = require("../controllers/userController");
const adminController = require("../controllers/adminController");
const adminAddMovie = require("../controllers/addMovie.js");
const adminAddShow = require("../controllers/addShow.js");
const checkAuth = require('../middleware/check-auth');

////// ROUTING /////////
// Handles home and '/'
router.get(["/", "/home"], controller.getHome);

//Route to see all movies
router.get("/movies", controller.getMovies);
router.get("/movies/view", controller.getViewMovie);

router.get("/calendar", controller.getCalendar);

router.get("/payment", controller.getPayment);

//this path is to '/seats'
router.get('/seats', controller.getSeats);

/////////Routes under Register Account
router.get("/register", regController.getRegister);
router.post("/register", regController.postRegister);


/////////Routes under Login////////
router.get("/login", logController.getLogin);
router.post("/login",logController.postLogin, checkAuth );

///////Routes Involving user//////////

//this path is to '/userprofile/:username'
router.get('/user/:username', userController.getUserProfile);
//this path is to '/userprofile/:username/ticket'
router.get('/user/:username/tickets', userController.getUserTicket);
//this path is to '/userprofile/:username/cart'
router.get('/user/:username/cart', userController.getCart);




///this path is to '/admin'
router.get('/admin', adminController.getAdminBoard);
//add show
router.post('/admin/addShow',adminAddShow.postShow);
//add movie
router.post('/admin/addMovie',adminAddMovie.postMovie);


module.exports = router;