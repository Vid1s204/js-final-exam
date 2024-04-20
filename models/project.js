//  naming convention for models: use singular form of the entity


// import mongoose

const mongoose = require('mongoose');

// define schema (JSON), aka blueprint for our data objects

const  dataSchemaObj = {
    name:{  type : String, required: true},
    Id: {type :String ,required:true },
    date: {type :Date ,default: new Date() },
    course: { type:String },
};



// create mongoose schema

const projectsSchema = mongoose.Schema(dataSchemaObj);

// create and importing mongoose model

module.exports= mongoose.model("Project",projectsSchema) ;