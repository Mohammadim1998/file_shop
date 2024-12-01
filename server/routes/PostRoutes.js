const express=require('express');
const router=express();
const { check} =require('express-validator');

const PostCtrl=require('../controllers/PostCtrl');
const Post=require('../models/Post');


router.get("/posts",PostCtrl.getAllPosts);
// THIS RELATED POSTS IS FOR ADD OR UPDATE A BLOG
router.get("/posts-rel",PostCtrl.getRelPosts);
router.post("/new-post",[
    check("title","تعداد کارکتر عنوان مقاله باید بیشتر از 8 کارکتر باشد...").isLength({min:8}),
    check("published","فرمت بخش انتشار اشتباه است.").isBoolean(),
    check("relatedPosts","فرمت بخش پست های مرتبط اشتباه است.").isArray(),
    check("tags","فرمت بخش تگ ها اشتباه است.").isArray(),
    check("slug", "لطفا اسلاگ دیگری انتخاب کنید...").custom(value => {
        return Post.find({
            slug: value
        }).then(post => {
            if (post.length > 0) {
                throw ("لطفا اسلاگ دیگری انتخاب کنید...");
            }
        });
    }),
],PostCtrl.newPost);
router.post("/update-post/:id",[
    check("title","تعداد کارکتر عنوان مقاله باید بیشتر از 8 کارکتر باشد...").isLength({min:8}),
    check("published","فرمت بخش انتشار اشتباه است.").isBoolean(),
    check("relatedPosts","فرمت بخش پست های مرتبط اشتباه است.").isArray(),
    check("tags","فرمت بخش تگ ها  اشتباه است.").isArray(),
    check("slug", "لطفا اسلاگ دیگری انتخاب کنید...").custom(value => {
        return Post.find({
            slug: value
        }).then(post => {
            if (post.length > 1) {
                throw ("لطفا اسلاگ دیگری انتخاب کنید...");
            }
        });
    }),
],PostCtrl.updatePost);
router.post("/delete-post/:id",PostCtrl.deletePost);
router.get("/get-post/:slug",PostCtrl.getOnePost);
router.get("/get-post-by-id/:id",PostCtrl.getOnePostById);

router.get("/get-new-posts",PostCtrl.getNewPosts);
router.get("/get-most-viewed-posts",PostCtrl.getMostViewed);
// THIS RELATED POSTS IS FOR SINGLE BLOG PAGE
router.post("/get-related-posts",PostCtrl.getRelatedPosts);
router.get("/search-posts",PostCtrl.SearchPosts);




module.exports=router;