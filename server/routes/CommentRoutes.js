const express = require('express');
const router = express();
const { check } = require('express-validator');

const CommentCtrl = require('../controllers/CommentCtrl');


router.post("/new-comment", [
    check("message", "تعداد کارکتر دیدگاه شما باید بیشتر از 20 کارکتر باشد...").isLength({ min: 20 }),
], CommentCtrl.newComment);

router.get("/comments", CommentCtrl.getAllComments);
router.get("/not-viewed-comments", CommentCtrl.getAllNotViewedComments);

router.post("/update-comment/:id", [
    check("message", "تعداد کارکتر دیدگاه شما باید بیشتر از 20 کارکتر باشد...").isLength({ min: 20 }),
], CommentCtrl.updateComment);
router.post("/delete-comment/:id", CommentCtrl.deleteComment);
// for admin
router.get("/get-comment/:id", CommentCtrl.getOneCommentById);
router.post("/get-model-comments", CommentCtrl.getModelComments);
router.get("/get-comment-children/:id", CommentCtrl.getCommentChildren);
router.post("/publish-comment", CommentCtrl.publishComment);
router.get("/get-model-comments-number/:id", CommentCtrl.getModelCommentsNumber);



module.exports = router;