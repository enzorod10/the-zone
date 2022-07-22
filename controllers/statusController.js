const User = require('../models/user.js');

exports.request_membership_status = function(req, res, next){
    res.render('request-membership', { title: 'The Zone', user: res.locals.currentUser, error: null })
};

exports.request_admin_status = function(req, res, next){
    res.render('request-admin', { title: 'The Zone', user: res.locals.currentUser, error: null })
};

exports.request_membership_status_post = function(req, res, next){
    if(req.body.membershipCode === '1KP28SZONE'){
        User.findByIdAndUpdate(res.locals.currentUser._id, { membership_status: true }, {}, function(err, newUser){
            if (err) { next(err) }
            res.redirect('/');
        })
    } else {
        res.render('request-membership', { title: 'The Zone', user: res.locals.currentUser, error: 'Code is wrong' })
    }  
};

exports.request_admin_status_post = function(req, res, next){
    if(req.body.adminCode === '1KP28SZONE'){
        User.findByIdAndUpdate(res.locals.currentUser._id, { admin_status: true }, {}, function(err, newUser){
            if (err) { next(err) }
            res.redirect('/');
        })
    } else {
        res.render('request-admin', { title: 'The Zone', user: res.locals.currentUser, error: 'Code is wrong' })
    }
};