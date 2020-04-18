const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {validationResult} = require("express-validator");

const User = require('../models/UsersModel.js');
const jwt = require('jsonwebtoken');

const loginController = {
    //Render login page
    getLogin: function(req, res, next){
        res.render("login", {
            pageName: "Log In",
        })
    },
    
    postLogin: (req, res, next)=>{
        // console.log('yes');
        console.log(req.body)
        const errors = validationResult(req).array({onlyFirstError: true}); //Get errors from express-validator routes
        
        console.table(errors)
        if (errors.length > 0){
            return res.status(403).render("login", {
                pageName: "Register",
                errors: errors,
            })
        }
        else {
            User.find({username: req.body.username})
            .exec()
            .then(user=>{
                if (user.length < 1){
                    return res.status(403).render("login", {
                        pageName: "Register",
                        errors: [{msg: "Invalid credentials"}],
                    })
                }
                bcrypt.compare(req.body.password, user[0].password, (err,result)=>{
                    if(err){
                        // return res.status(401).json({
                        //     //password dont match
                        //     message: 'Authentication failed'
                        // });
                        // alert('Authentication failed');
                        return res.status(401).render("login", {
                            pageName: "Register",
                            errors: [{msg: "Invalid credentials"}],
                        })
                    } 
                    if (result) {
                        const ntoken = jwt.sign(
                            {
                            email: user[0].email,
                            username: user[0].username,
                            userId: user[0]._id
                            },
                            process.env.JWT_KEY,
                            {
                                expiresIn: "2h"
                            }
                        );
                        // return res.status(200).json({
                        //     message: 'Authentication successful',
                        //     token: token;
                        // });
                        
                        User.findOneAndUpdate({username: user[0].username}, {token: ntoken}, {upsert: true}, function(err, doc) {
                            if (err) return res.send(500, {error: err});
                            console.log('token updated!');
                            //return res.send('Succesfully saved.');
                        });

                        req.session.userId = ntoken;
                        res.locals.user = user[0];
                        //req.session.userId = user[0].username;

                        if(user[0].userType.localeCompare("User")){
                            console.log('Admin Logged In');
                            req.session.notAdmin = false;
                            return res.redirect("/admin");
                        }
                        else{
                            console.log('User Logged In');
                            req.session.notAdmin = true;
                            return res.redirect("/user/"+user[0].username);
                        };
                    }
                    // res.status(401).json({
                    //     message: 'Authentication failed'
                    // });

                    return res.status(401).render("login", {
                        pageName: "Register",
                        errors: [{msg: "Invalid credentials"}],
                    })
                })
            })
            .catch(err=>{
                // console.log(err);
                // res.status(500).json({
                //     error:err
                // });
                // alert('Authentication failed');
                return res.status(500).render("login", {
                    pageName: "Register",
                    errors: [{msg: "Invalid credentials"}],
                })
            });
        }
    },
}

module.exports = loginController;