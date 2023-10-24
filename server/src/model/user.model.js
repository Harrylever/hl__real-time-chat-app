const { default: mongoose } = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    // minlength: 3,
    // maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 200,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: true,
  },
}, {
  timestamps: true,
});

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
