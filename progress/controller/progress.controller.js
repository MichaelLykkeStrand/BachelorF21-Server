const ProgressModel = require('../models/progress.model');


exports.getProgressByTaskIDAndUserID = (req, res) => {
    ProgressModel.findByTaskIdAndUserID(requ.params.taskID, req.params.userId)
        .then((result) => {
            res.status(200).send(result);
        });
};