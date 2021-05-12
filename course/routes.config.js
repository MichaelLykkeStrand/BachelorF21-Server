const CoursesController = require('./controllers/courses.controller');
const TasksController = require('./controllers/tasks.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN;
const INSTRUCTOR = config.permissionLevels.INSTRUCTOR;
const STUDENT = config.permissionLevels.STUDENT;
const EVERYONE = config.permissionLevels.EVERYONE;

exports.routesConfig = function (app) {

    //Manage user references
    app.post('/courses/manage', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(INSTRUCTOR),
        CoursesController.addUserById
    ]);
    app.delete('/courses/manage', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(INSTRUCTOR),
        CoursesController.removeUserById
    ]);

    //Course CRUD
    app.post('/courses', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(INSTRUCTOR),
        CoursesController.insert
    ]);
    app.get('/courses', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(EVERYONE),
        CoursesController.list
    ]);
    app.get('/courses/:courseId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(EVERYONE),
        CoursesController.getById
    ]);
    app.patch('/courses/', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        CoursesController.patchById
    ]);
    app.delete('/courses/:courseId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        CoursesController.removeById
    ]);

    //Task
    app.get('/courses/task/:taskId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(EVERYONE),
        TasksController.getById
    ]);
    app.delete('/coursesTask/:taskId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(INSTRUCTOR),
        TasksController.removeById
    ]);
    app.post('/coursesTask/', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(INSTRUCTOR),
        TasksController.insert
    ]);
    app.patch('/coursesTask/', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(INSTRUCTOR),
        TasksController.patchById    
    ]);
};
