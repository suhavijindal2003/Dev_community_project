const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    firstName: {type:String},
    lastName:{type:String},
    emailId:{type:String,unique:true,required:true},
    password:{type:String,requires:true}
});

module.exports=mongoose.model('User', UserSchema);










