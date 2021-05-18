const TaskModel = require('../models/tasks.model');
const CourseModel = require('../models/courses.model');

exports.patchById = (req, res) => {
    console.log(Object.getOwnPropertyNames(req.body))
    TaskModel.patchTask(req.body._id, req.body)
        .then((result) => {
            res.status(204).send({});
        });
};

exports.completeById = async (req, res) => {
    TaskModel.findById(req.body._id).then(async r => {
        let hasAlreadyCompleted = r.completedBy.some(function (user){
            return user._id.equals(req.jwt.userId);
        });
        if(!hasAlreadyCompleted){
            let t = await TaskModel.patchStatus(req.body._id, req.body.userId);
            let course = await CourseModel.findAsObjectById(t.courseID);
            let courseData = {};
            courseData.tasks = course.tasks;
            for(var i = 0; i < courseData.tasks.length; i++){
                console.log(courseData.tasks[i]);
                let hasCompleted = courseData.tasks[i].completedBy.includes(req.body.userId);
                if(!hasCompleted){
                    return;
                }

            }
            CourseModel.addUserToCourse(course._id, req.body.userId).then((result)=>{
                res.status(200).send(result);
            });
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