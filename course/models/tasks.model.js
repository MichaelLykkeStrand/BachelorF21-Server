const mongoose = require('../../common/services/mongoose.service').mongoose;
const UserModel = require('../../users/models/users.model');
const CourseModel = require('../../course/models/courses.model');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    courseID: { type: Schema.Types.ObjectId, ref: 'Courses' },
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


exports.removeTaskById = async (id) => {
    let task = await this.findById(id);
    console.log(task);
    try{
        let course = await CourseModel.findById(task.courseID)
        let courseData = {};
        courseData.tasks = course.tasks;
        console.log("OLD data: "+course.tasks)
    
        for( var i = 0; i < courseData.tasks.length; i++){ 
            console.log(courseData.tasks[i]._id+" != "+task._id)
            if ( courseData.tasks[i]._id+"" == task._id+"") { //Convert to string, otherwise it can't compare?
                console.log(courseData.tasks[i]._id+" == "+task._id)
                courseData.tasks.splice(i, 1); 
            }
        }
        console.log("New data: "+courseData.tasks)
    
        await CourseModel.patchCourse(task.courseID,courseData)
    } catch{

    }

    //TODO
    await Task.deleteMany({_id: taskData._id}, (err) => {
        if (err) {
                reject(err);
        } else {
                resolve(err);
        }
    });

};


