const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

//TODO Last active time
const progressSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, ref: 'Users',
        required: true
    },
    task: {
        type: Schema.Types.ObjectId, ref: 'Tasks',
        required: true
    },
    timeUsed:{
        type: Number,
        default: 0
    },
    timesPaused:{
        type: Number,
        default: 0
    }
});

progressSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
progressSchema.set('toJSON', {
    virtuals: true
});


const Progress = mongoose.model('Progress', progressSchema);


exports.findByUserId = async (id) => {
    try {
    let result = await Progress.find({ user: id });
    result = result.toJSON();
    return result;
    }catch (error) {
        return error;
    }
};

exports.findByTaskId = async (id) => {
    try {
        let result = await Progress.find({ task: id });
        result = result.toJSON();
        return result;
    } catch (error) {
        return error;
    }

};

exports.findByTaskIdAndUserID = async (taskid,userid)=>{
    try {
    console.log("Finding progress for: Task="+taskid+" User="+ userid);
    let result = await Progress.findOne({user: userid, task: taskid });
    result = result.toJSON();
    return result;
    }
    catch (error) {
        return error;
    }
};

exports.updateByTaskId = async (progressData) => {
    try {
        let result = await Progress.find({ 
            task: progressData.task,
            user: progressData.user
        });
        result.timeUsed += progressData.timeUsed;
        result.timesPaused += progressData.timesPaused;
        Progress.findOneAndUpdate({
            task: progressData.task,
            user: progressData.user
        }, result);

        result = result.toJSON();
        return result;
    }
    catch (error) {
        return error;
    }
};

exports.findById = async (id) => {
    try {
    let result = await Progress.find({ task: id });
    result = result.toJSON();
    return result;
    }
    catch (error) {
        return error;
    }
};




