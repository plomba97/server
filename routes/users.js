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
    res.render('register-form', {signedUser: req.user});
});

router.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            console.log(err);

            return res.render('register-form', { signedUser: req.user, error : err.message });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

router.get('/login', function(req, res, next) {
    res.render('login-form', {signedUser: req.user, title: 'Test' });
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/users/login' }), function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
