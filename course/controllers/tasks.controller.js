const TaskModel = require('../models/tasks.model');

exports.patchById = (req, res) => {
    TaskModel.patchTask(req.body.taskId, req.body.userId)
        .then((result) => {
            res.status(204).send({});
        });
};