const ProgressModel = require('../models/progress.model');


exports.getProgressByTaskIDAndUserID = (req, res) => {
    ProgressModel.findByTaskIdAndUserID(req.params.taskID, req.params.userId)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.updateByTaskId = (req, res) => {
    ProgressModel.updateByTaskId(req.body)
        .then((result) => {
            res.status(200).send(result);
        });
};