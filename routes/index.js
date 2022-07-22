var express = require('express');
var router = express.Router();
let bcrypt = require('bcryptjs');
let User = require('../models/user.js')
let message_controller = require('../controllers/messageController.js')
let status_controller = require('../controllers/statusController.js')

/* GET home page. */
router.get('/', message_controller.message_list);

router.get('/sign-up', (req, res) => res.render('sign-up-form', { title: 'The Zone', user: res.locals.currentUser }));

router.post("/sign-up", (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    if (err){
      console.log('Error: Something went wrong')
    } else {
      const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        password: hashedPassword,
        membership_status: false,
        admin_status: false
      }).save(err => {
        if (err) { 
          return next(err);
        }
        res.redirect("/");
      });
    }
  })
});

router.get('/log-in', (req, res) => res.render('log-in-form', { title: 'The Zone', user: res.locals.currentUser }));
router.get('/log-out', (req, res) => {
  req.logout(function(err){
    if (err){
      return next(err);
    }
    res.redirect('/')
  });
});


// Handle message
router.get('/new-message', (req, res) => res.render('new-message-form', { title: 'The Zone', user: res.locals.currentUser }))
router.post('/new-message', message_controller.message_form_post)
router.post('/delete-message', message_controller.message_delete_post)

// Handle membership/admin
router.get('/request-membership', status_controller.request_membership_status)
router.get('/request-admin', status_controller.request_admin_status)
router.post('/request-membership', status_controller.request_membership_status_post)
router.post('/request-admin', status_controller.request_admin_status_post)


module.exports = router;