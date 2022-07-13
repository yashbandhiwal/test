const crypto = require('crypto');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const {ObjectId} = require('mongodb');


// @desc      gell all user
// @route     POST /api/v1/operationUser/register
// @access    Public
exports.getall = asyncHandler(async (req, res, next) => {

    let {search} = req.body;
   
    let query;

    // Finding resource
    query = User.find();
    
    // Pagination
    const page = parseInt(req.body.page, 10) || 1;
    const limit = parseInt(req.body.limit, 10) || 25;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await User.countDocuments({name:{$regex:search,$options:"i"}});

    query = User.aggregate([
        {
            $match:{
                name:{$regex:search,$options:"i"}
            }
        },
        {
            $lookup:{
                from: "roles",
                localField: "role",
                foreignField: "roleName",
                as:"roleData"
            }
        },
        {
            $project:{
            "_id": 1,
            "name": 1,
            "email": 1,
            "role": 1,
            "createdAt": 1,
            "roleData.roleName":1,
            "roleData.module":1
            }
        }
  
    ])
    

    // Executing query
    const results = await query;

    // Pagination result
    const pagination = {};
    
    if (endIndex < total) {
        pagination.next = {
        page: page + 1,
        limit
        };
    }
    
    if (startIndex > 0) {
        pagination.prev = {
        page: page - 1,
        limit
        };
    }

    res.status(200).json({
        success: true,
        count: results.length,
        pagination,
        data: results
    })

       

});


// @desc      check module accisable or not
// @route     POST /api/v1/operationUser/check
// @access    Public
exports.check = asyncHandler(async (req, res, next) => {

    res.status(200).json({
        success:true,
        message:"Have a good day"
    })

});

// @desc      update users
// @route     POST /api/v1/operationUser/updateUsers
// @access    Public
exports.updateUsers = asyncHandler(async (req, res, next) => {

    const { lastname } = req.body;
    if(!lastname){
        return next(new ErrorResponse('Please add the last Name', 400));
    }

    await User.updateMany({},{lastname});

    res.status(200).json({
        success:true,
        message:"last name is updated of every user"
    })

});

// @desc      update one user
// @route     POST /api/v1/operationUser/updateOne
// @access    Public
exports.updateOne = asyncHandler(async (req, res, next) => {

    const { id,lastname,name,role } = req.body;
    if(!id){
        return next(new ErrorResponse('Please select a user id', 400));
    }

    let bundle = {};
    if(lastname) bundle.lastname = lastname;
    if(name) bundle.name = name;
    if(role) bundle.role = role;

    await User.findByIdAndUpdate({
        _id:ObjectId(id)
    },
    {
        $set:bundle
    },
    {
        new:true
    })

    await User.updateMany({},{lastname});

    res.status(200).json({
        success:true,
        message:"user been updated"
    })

});