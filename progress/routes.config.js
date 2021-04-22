const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN;
const INSTRUCTOR = config.permissionLevels.INSTRUCTOR;
const STUDENT = config.permissionLevels.STUDENT;
const EVERYONE = config.permissionLevels.EVERYONE;

exports.routesConfig = function (app) {
    app.post('/progress', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(STUDENT)
    ]);

    app.get('/progress/time', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(STUDENT)
    ]);
};