const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const progressSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    moduleId: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    timeUsed:{
        type: Number,
        default: 0
    }
});

progressSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
userSchema.set('toJSON', {
    virtuals: true
});


const Progress = mongoose.model('Progress', progressSchema);



