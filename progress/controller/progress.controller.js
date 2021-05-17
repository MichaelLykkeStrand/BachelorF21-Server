const ProgressModel = require('../models/progress.model');


exports.getProgressByTaskIDAndUserID = (req, res) => {
    ProgressModel.findByTaskIdAndUserID(req.params.taskId, req.params.userId)
        .then((result) => {
            res.status(200).send(result);
        });
};