const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const moduleSchema = new Schema({
    moduleId: {
        type: String,
        required: true
    },
    moduleName: {
        type: String,
        default: false
    }
});

moduleSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
userSchema.set('toJSON', {
    virtuals: true
});


const Progress = mongoose.model('Modules', moduleSchema);