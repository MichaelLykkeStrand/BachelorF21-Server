const mongoose = require('../../common/services/mongoose.service').mongoose;
const UserModel = require('../../users/models/users.model');

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    instructors: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
    students: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
    successors: [{ type: Schema.Types.ObjectId, ref: 'Courses' }],
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Tasks' }]
});

courseSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

courseSchema.set('toJSON', {
    virtuals: true
});

courseSchema.findById = function (cb) {
    return this.model('Courses').find({ id: this.id }, cb);
};

const Course = mongoose.model('Courses', courseSchema);


exports.addStudentToCourse = async (courseId, userId) => {
    //TODO
    let course = await Course.findById(courseId);
    let user = await UserModel.findById(userId);

    course.students.push(user);
    UserModel.addToCourse(userId, courseId);
    course.save();

    return course;
};

exports.removeStudentFromCourse = async (courseId, userId) => {
    //TODO
    let course = await Course.findById(courseId).populate('students');
    let user = await UserModel.findById(userId);
    course.students.pull(user);
    course.save();
    return course;
};


exports.findById = async (id) => {
    let result = await Course.findById(id);
    result = result.toJSON();
    return result;
};

exports.findAsObjectById = async (id) => {
    let result = await Course.findById(id).populate('students').populate('tasks');
    return result;
};

exports.createCourse = (courseData) => {
    const course = new Course(courseData);
    return course.save().then((result) => {
        return result;
    });
};

exports.list = async (perPage, page) => {
    return new Promise((resolve, reject) => {
        Course.find()
            .limit(perPage)
            .skip(perPage * page)
            .populate('students').populate('instructors').populate('tasks')
            .exec(function (err, courses) {
                if (err) {
                    reject(err);
                } else {
                    resolve(courses);
                }
            })
    });
};

exports.patchCourse = async (id, courseData) => {
    console.log("Course patch: "+ courseData.tasks)
    return Course.findOneAndUpdate({
        _id: id
    }, courseData);
};

exports.removeById = (courseId) => {
    return new Promise((resolve, reject) => {
        Course.deleteMany({ _id: courseId }, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

