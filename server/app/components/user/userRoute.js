module.exports = function(app) {
    const userController = app.components.user.userController;

    app.route("/createUser").post(userController.createUser);
    app.route("/login").post(userController.login);
    app.route("/alterPassword").post(userController.alterPassword);
}