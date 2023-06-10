const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt  = require('bcrypt');

const { isAlphanumeric } = validator;

const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Please enter an username'],
        unique: true,
        lowercase: true,
        validate: [isAlphanumeric, 'Please enter valid username'],
    },
    password: {
        type: String,
        required: false,
        minlength: 6,

    },
    refreshToken: {
        type: String,
        required: false
    },
});

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    console.log('password >>>>>>>>>>>>>>>>>> ', this.password);
    next();
});

userSchema.post('save', function (doc, next) {
    console.log('After user created ', doc);
    next();
});

userSchema.statics.login = async function(username, password) {
    const user = await this.findOne({username});
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        } else {
            throw Error('Username OR Password wrong');
        }
    } else {
        throw Error('Username OR Password wrong');
    }
}





const User = mongoose.model('user', userSchema);
module.exports = User;
