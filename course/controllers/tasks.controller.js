const TaskModel = require('../models/tasks.model');

exports.patchById = (req, res) => {
    console.log(Object.getOwnPropertyNames(req.body))
    TaskModel.patchTask(req.body._id, req.body)
        .then((result) => {
            res.status(204).send({});
        });
};
exports.getById = (req, res) => {
    TaskModel.findById(req.params.taskId)
        .then((result) => {
            res.status(200).send(result);
        });
};