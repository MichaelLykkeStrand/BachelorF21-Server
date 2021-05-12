const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const ProgressController = require('./controller/progress.controller');
const config = require('../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN;
const INSTRUCTOR = config.permissionLevels.INSTRUCTOR;
const STUDENT = config.permissionLevels.STUDENT;
const EVERYONE = config.permissionLevels.EVERYONE;

exports.routesConfig = function (app) {
    app.post('/progress/task', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(STUDENT),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        ProgressController.getProgressByTaskIDAndUserID //Change to only use TASKID
    ]);

    app.get('/progress/time', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(STUDENT)
    ]);
};