const NotificationModel = require('../models/notifications.model');

exports.insert = (req, res) => {
    CourseModel.createCourse(req.body)
        .then((result) => {
            res.status(201).send({ id: result._id });
        }).catch((error => {
            res.status(400).send(error);
        }));
};

exports.addUserById = (req, res) => {
    //TODO
    CourseModel.addUserToCourse(req.body.courseId,req.body.userId).then((result)=>{
        res.status(200).send(result);
    });
};

exports.removeUserById = (req, res) => {
    //TODO
    CourseModel.removeUserFromCourse(req.body.courseId,req.body.userId).then((result)=>{
        res.status(200).send(result);
    });
};

exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    CourseModel.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
};

exports.listFromUser = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    //TODO
    CourseModel.findById(req.params.userId);
};

exports.getById = (req, res) => {
    CourseModel.findById(req.params.courseId)
        .then((result) => {
            res.status(200).send(result);
        });
};
exports.patchById = (req, res) => {
    CourseModel.patchCourse(req.params.courseId, req.body)
        .then((result) => {
            res.status(204).send({});
        });
};

exports.removeById = (req, res) => {
    CourseModel.removeById(req.params.classroomId)
        .then((result) => {
            res.status(204).send({});
        });
};