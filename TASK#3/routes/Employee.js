const express = require('express');
const multer = require('multer')
const router = express.Router();
const mongoose = require('mongoose');
const {Employee,validate}=require('../models/employee');
const path=require("path");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
     const fileName=`${Date.now()}-${file.originalname}`;
     cb(null, fileName);
  }
  })
  
  const upload = multer({ storage: storage })



// post route to add new employee

router.post('/', upload.single("profileImage"), async (req, res) => {
    console.log(req.body);
    console.log(req.file);
    try {
        const { Name, JoiningData, email, Salary } = req.body;
        
        const profileImage = req.file ? `/uploads/${req.file.filename.replace(/\\/g, '/')}` : undefined;


        const newEmployee = new Employee({
            Name,
            JoiningData,
            profileImage,
            email,
            Salary
        });

        const savedEmployee = await newEmployee.save();
        res.status(201).json({ message: 'Employee added successfully', employee: savedEmployee });
    } catch (err) {
        console.error(err);
        if (err.code === 11000) {
            res.status(400).json({ error: 'Email already exists' });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});


module.exports = router;
