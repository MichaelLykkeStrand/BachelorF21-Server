const UsersController = require('./controllers/users.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN;
const INSTRUCTOR = config.permissionLevels.INSTRUCTOR;
const STUDENT = config.permissionLevels.STUDENT;
const EVERYONE = config.permissionLevels.EVERYONE;

exports.routesConfig = function (app) {
    app.post('/users', [
        UsersController.insert
    ]);
    app.get('/users', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(EVERYONE),
        UsersController.list
    ]);
    app.get('/users/:userId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(EVERYONE),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        UsersController.getById
    ]);
    app.get('/users/courses/:userId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(EVERYONE),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        UsersController.getCoursesById
    ]);
    app.get('/users/course', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(EVERYONE),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        UsersController.getCoursesById
    ]);
    app.patch('/users/:userId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(EVERYONE),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        UsersController.patchById
    ]);
    app.delete('/users/:userId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        UsersController.removeById
    ]);
};
