const express = require('express');
const commentController = require('../controllers/commentController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
    .route('/')
    .post(commentController.setIds, commentController.createComment);

router.delete(
    '/deleteMyComment/:commentId',
    commentController.setIds,
    commentController.deleteMyComment
);

router.get('/', commentController.getAllComments);

module.exports = router;
