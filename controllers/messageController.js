const Message = require('../models/message.js');
const { DateTime } = require('luxon');
const { body, validationResult } = require('express-validator');

exports.message_list = function (req, res) {
    Message.find().exec((err, result) => {
        res.render('index', { title: 'The Zone', messages: result, user: res.locals.currentUser })
    })
};

exports.message_form_post = [
    body('title').trim().isLength({ min: 1}).escape().withMessage(`Title can't be empty!`),
    body('text').trim().isLength({ min: 1}).escape().withMessage(`Text can't be empty!`),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            res.render('/new-message')
        } else {
            let timestamp = DateTime.now().toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS)
            let message = new Message({
                title: req.body.title,
                text: req.body.text,
                timestamp: timestamp,
                author: res.locals.currentUser
            })
            message.save(function (err) {
                if (err) { return next(err); }
                res.redirect('/')
            });
        }
    }
];

exports.message_delete_post = function(req, res, next){
    Message.findByIdAndRemove(req.body.messageID, function deleteMessage(err){
        if (err) { return next(err) }
        res.redirect('/')
    })
}