const { default: mongoose } = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  fullname: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 200,
    unique: true,
  },
  imgUri: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
  },
  jwt_enc_password: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
