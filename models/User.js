// const mongoose = require('mongoose');
// const plm = require('passport-local-mongoose');

// var dataSchemaObj = {
//     username: {type: String, require},  //username is a string that must be unique in the database.
//     password: { type: String, require}   //password is also a string which will be hashed and stored in the db.
   
// }

// // const mongoose=require('mongoose');
// // const plm= require('passport-local-mongoose');
// // var dataSchemaObj={
// //     username:{type:String},
// //     password:{type:String}
// // }
// var userSchema=new mongoose.Schema(dataSchemaObj);
// userSchema.plugin(plm);
// module.exports=new mongoose.models('User',userSchema);


const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

var dataSchemaObj = {
    username: { type: String },
    password: { type: String },

    // add fields to handle oauth authenticated users
    oauthId: { type: String }, // id value to identify this user in the third-party system
    oauthProvider: { type: String }, // what auth provider was used? Github, google, etc.
    created: { type: Date }, // keeps track of when user was created
}
var userSchema = new mongoose.Schema(dataSchemaObj);
// Use passport-local-mongoose to indicate this is a special authentication model
// plugin() adds plm functionality to our model
// i.e. hashing/salting password, and handling authentication attempts
userSchema.plugin(plm);
// export the enhanced model
module.exports = new mongoose.model('User', userSchema);