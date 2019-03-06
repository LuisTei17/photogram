module.exports = function(app) {
    const postController = app.controllers.postController;

    app.route("/post").post(postController.createPost);

    app.route("/post/:idPost")
        .get(postController.getPost)
        .put(postController.editPost)
        .delete(postController.deletePost);

    app.route("/getPosts").get(postController.getPosts);


}