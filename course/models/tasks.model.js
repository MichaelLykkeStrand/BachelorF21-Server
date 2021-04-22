const mongoose = require('../../common/services/mongoose.service').mongoose;
const UserModel = require('../../users/models/users.model');

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
    completedBy:{
        type: Map,
        of: new Schema({
            user: {type: Schema.Types.ObjectId, ref: 'Users'},
            timeUsed: Number //Seconds
        })
    } 
});

const Task = mongoose.model('Tasks', taskSchema);

taskSchema.findById = function (cb) {
    return this.model('Tasks').find({ id: this.id }, cb).populate('completedBy');
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


