const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const ProgressController = require('./controller/progress.controller');
const config = require('../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN;
const INSTRUCTOR = config.permissionLevels.INSTRUCTOR;
const STUDENT = config.permissionLevels.STUDENT;
const EVERYONE = config.permissionLevels.EVERYONE;

exports.routesConfig = function (app) {
    app.get('/progress/:taskId/:userId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(STUDENT),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        ProgressController.getProgressByTaskIDAndUserID 
    ]);

    app.get('/progress/userTime/', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(INSTRUCTOR),
        ProgressController.findByTask
    ]);

    app.get('/progress/taskTime/', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(INSTRUCTOR),
        ProgressController.findByUser
    ]);

    app.post('/progress/userTaskTime/', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(STUDENT),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        ProgressController.updateByTaskId
    ]);
};