var express = require('express');
var passport = require('passport');
var Account = require('../data-models/account-model');
var router = express.Router();

function checkIfAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        next();
    }else{
        res.redirect("/users/login");
    }
}

router.get('/register', checkIfAuthenticated, function(req, res) {
    res.render('users/register-form', {signedUser: req.user});
});

router.post('/register', checkIfAuthenticated, function(req, res) {
    Account.register(new Account({ username : req.body.username, firstName: req.body.firstName, secondName: req.body.secondName, lastName: req.body.lastName, role: req.body.role }), req.body.password, function(err, account) {
        if (err) {
            console.log(err);

            return res.render('users/register-form', { signedUser: req.user, error : err.message });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

router.get('/login', function(req, res, next) {
    res.render('users/login-form', {signedUser: req.user, title: 'Test' });
});

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            next(err);
        }
        if (!user) {
            res.render('users/login-form', { signedUser: req.user, error : "Невалиден email/парола!" });
            return;
        }
        req.logIn(user, function(err) {
            if (err) {
                console.log('error loging in!!')
            }
            res.redirect('/');
        });
    })(req, res, next);
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/userList', checkIfAuthenticated, function(req, res, next) {
    Account.find().exec(function(err, data) {
        console.log(data);
        res.render('users/users-list', {signedUser: req.user, users: data });
    });

});

module.exports = router;
