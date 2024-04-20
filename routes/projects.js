var express = require('express');
var router = express.Router();
const Project = require('../models/project');
const AuthenticationMiddleWare = require('../extensions/authentication')



router.get("/", AuthenticationMiddleWare, async (req, res, next) => {
 let projects = await Project.find().sort([["dueDate", "descending"]]);
 res.render("projects/index", {
    title: "Project Tracker",
    dataset: projects,
  });
});
//GET /projects/add
router.get("/add", AuthenticationMiddleWare ,async (req, res, next) => {
  res.render("projects/add", {
    title: "Add a New Project",
    
  });
});

//post/projects/add
router.post("/add",AuthenticationMiddleWare,async (req,res)=>{
// use project module to save the data the DB
// use the new Project() Method of the model
// map the fields with the data from the request
// if the operation is successful

let newProject= new Project({
    name : req.body.name,
    Id : req.body.Id,
    date : req.body.date,
    course: req.body.course
})


// save changes
await newProject.save();
res.redirect("/projects");


});

// Get/projects/delete/_id
// router.get("/delete/:_id", async (req, res, next) => {
//   let projectId = req.params._id;
//   await Project.findByIdAndRemove({ _id: projectId });
//   res.redirect("/projects");
// });

// router.get("/delete/:_id", async (req, res, next) => {
//     let projectId = req.params._id;
//     await Project.findByIdAndRemove({ _id: projectId });
//     res.redirect("/projects");
//   });

router.get("/delete/:_id",AuthenticationMiddleWare, async (req, res, next) => {
    let projectId = req.params._id;
    await Project.findOneAndDelete({ _id: projectId });
    res.redirect("/projects");
  });

  //GET/projects/edit/_id
router.get("/edit/:_id", AuthenticationMiddleWare, async (req, res, next) => {
    let projectId= req.params._id;
    let projectData=await Project.findById(projectId);
    res.render("projects/edit",{
      title:"Edit Project info",
      project:projectData,
    })
    });
  //POST/projects/edit/_id
    router.post("/edit/:_id", AuthenticationMiddleWare, async (req,res,next)=>{
      let projectId= req.params._id;
      await Project.findByIdAndUpdate(
     {_id:projectId},
     {
     name: req.body.name,
      dueDate: req.body.dueDate,
      course: req.body.course,
      status: req.body.status,
     });
     res.redirect("/projects");
    });


module.exports = router;

// const express = require("express");
// const router = express.Router();
// const Project = require("../models/project");

// router.get("/", async (req, res, next) => {
//  let projects = await Project.find().sort([["dueDate", "descending"]]);
//  res.render("projects/index", {
//     title: "Project Tracker",
//     dataset: projects,
//   });
// });
// //GET /projects/add
// router.get("/add", async (req, res, next) => {
//   res.render("projects/add", {
//     title: "Add a New Project",
    
//   });
// });

// // POST /projects/add
// router.post("/add", async (req, res, next) => {
//  let newProject = new Project({
//     name: req.body.name,
//     dueDate: req.body.dueDate,
//     course: req.body.course,
//     status: req.body.status,
//   });
//   await newProject.save();
//   res.redirect("/projects");
// });

// // GET /projects/delete/_id
// router.get("/delete/:_id", async (req, res, next) => {
//   let projectId = req.params._id;
//   await Project.findByIdAndRemove({ _id: projectId });
//   res.redirect("/projects");
// });

// // GET /projects/edit/_id
// router.get("/edit/:_id", async (req, res, next) => {
//   let projectId = req.params._id;
//   let projectData = await Project.findById(projectId);
//   res.render("projects/edit", {
//     title: "Edit Project Info",
//     project: projectData,
//    });
// });

// // POST /projects/edit/_id
// router.post("/edit/:_id", async (req, res, next) => {
//   let projectId = req.params._id;
//   await Project.findByIdAndUpdate(
//     { _id: projectId }, // filter to find the project to update
//     {
//       // updated data
//       name: req.body.name,
//       dueDate: req.body.dueDate,
//       course: req.body.course,
//       status: req.body.status,
//     }
//   );
//   res.redirect("/projects");
// });

// // Export router object
// module.exports = router;