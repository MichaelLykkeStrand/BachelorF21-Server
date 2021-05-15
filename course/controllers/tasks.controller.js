const TaskModel = require('../models/tasks.model');

exports.patchById = (req, res) => {
    console.log(Object.getOwnPropertyNames(req.body))
    TaskModel.patchTask(req.body._id, req.body)
        .then((result) => {
            res.status(204).send({});
        });
};

exports.completeById = (req, res) => {
    TaskModel.findById(req.body._id).then(r => {
        if(!r.completedBy.includes(req.jwt.userId)){
            TaskModel.patchStatus(req.body._id, req.jwt.userId)    
        }
    }).then((result) => {
        res.status(204).send({});
    });
}

exports.getById = (req, res) => {
    TaskModel.findById(req.params.taskId)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.insert = (req, res) => {
    console.log(req.body);
    TaskModel.createTask(req.body)
        .then((result) => {
            res.status(201).send({result}); 
        }).catch((error => {
            res.status(400).send(error);
        }));
};

exports.removeById = (req, res) => {
    console.log("Remove called!")
    TaskModel.removeTaskById(req.params.taskId)
        .then((result) => {
            res.status(201).send({result}); 
        }).catch((error => {
            res.status(400).send(error);
        }));
};