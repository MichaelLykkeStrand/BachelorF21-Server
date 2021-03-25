const ModuleController = require('./controllers/module.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN;
const INSTRUCTOR = config.permissionLevels.INSTRUCTOR;
const STUDENT = config.permissionLevels.STUDENT;
const EVERYONE = config.permissionLevels.EVERYONE;

exports.routesConfig = function (app) {
    app.post('/modules', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        ModuleController.insert
    ]);
    app.get('/modules', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(EVERYONE),
        ModuleController.list
    ]);
    app.get('/modules/:moduleId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(EVERYONE),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        ModuleController.getById
    ]);
    app.patch('/modules/:moduleId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        ModuleController.patchById
    ]);
    app.delete('/modules/:moduleId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        ModuleController.removeById
    ]);
};