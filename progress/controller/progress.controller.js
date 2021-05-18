const ProgressModel = require('../models/progress.model');


exports.getProgressByTaskIDAndUserID = (req, res) => {
    ProgressModel.findByTaskIdAndUserID(req.params.taskId, req.params.userId)
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

exports.findByTask = (req, res) => {
    ProgressModel.findByTask(req.params.taskId).then((result) => {
        res.status(200).send(result);
    });
}

exports.findByUser = (req, res) => {
    ProgressModel.findByTask(req.params.userId).then((result) => {
        res.status(200).send(result);
    });
}