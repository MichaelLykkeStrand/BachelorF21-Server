const mongoose = require('../../common/services/mongoose.service').mongoose;
const UserModel = require('../../users/models/users.model');
const CourseModel = require('../../course/models/courses.model');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    assignedTo: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
    completedBy: [{ type: Schema.Types.ObjectId, ref: 'Users' }]
});

const Task = mongoose.model('Tasks', taskSchema);

taskSchema.findById = function (cb) {
    return this.model('Tasks').find({ id: this.id }, cb).populate('completedBy').populate('assignedTo');
};

exports.findById = async (id) => {
    let result = await Task.findById(id);
    result = result.toJSON();
    return result;
};

exports.patchStatus = async (id, userId) => {
    let task = await Task.findById(id);
    let user = await UserModel.findById(userId);

    task.completedBy.push(user);
    task.save();

    return task;
}

exports.patchTask = async (id,taskData) => {
    return Task.findOneAndUpdate({
        _id: id
    }, taskData);
}

exports.createTask = async (taskData) => {
    let response;
    let course = await CourseModel.findById(taskData.courseID)
    let task = new Task(taskData);
    task.save().then((result) => {
        response = result;
        console.log(result);
    });
    let courseData = {};
    courseData.tasks = course.tasks;
    courseData.tasks.push(task._id);
    console.log("Tasks: "+courseData.tasks);
    CourseModel.patchCourse(taskData.courseID,course)
    return response
};


