const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
  roleName: {
    type: String,
    required: [true, 'Please add a name']
  },
  module:{
    type:String,
    default:"getme"
  },
  active:{
    type:Boolean,
    default:true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Role', RoleSchema);
