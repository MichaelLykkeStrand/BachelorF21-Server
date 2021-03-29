const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        select: false,
        required: true
    },
    permissionLevel: {
        type: Number,
        default: 1
    },
    courses: {
        type: Array,
        select: false,
    }
});

userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
userSchema.set('toJSON', {
    virtuals: true
});

userSchema.findById = function (cb) {
    return this.model('Users').find({ id: this.id }, cb);
};

const User = mongoose.model('Users', userSchema);

//DO NOT USE THIS UNLESS the response is not sent to the client
exports.findByEmailIncludesPassword = async (email) =>{
    let result = await User.find({ email: email }).select('+password').exec();
    return result;
}

exports.findByEmail = async (email) => {
    let result = await User.find({ email: email });
    return result;
};

exports.findById = async (id) => {
    let result = await User.findById(id);
    result = result.toJSON();
    return result;
};

exports.findCoursesById = async (id) =>{
    let result = await User.findById(id).select('courses').exec();
    return result;
};

exports.createUser = (userData) => {
    const user = new User(userData);
    return user.save().then((result) => {
        return result;
    });
};

exports.list = async (perPage, page) => {
    return new Promise((resolve, reject) => {
        User.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, users) {
                if (err) {
                    reject(err);
                } else {
                    resolve(users);
                }
            })
    });
};

exports.patchUser = (id, userData) => {
    return User.findOneAndUpdate({
        _id: id
    }, userData);
};

exports.removeById = (userId) => {
    return new Promise((resolve, reject) => {
        User.deleteMany({ _id: userId }, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

