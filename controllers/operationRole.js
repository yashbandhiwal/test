const crypto = require('crypto');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Role = require('../models/Role');
const {ObjectId} = require('mongodb');


// @desc      create
// @route     POST /api/v1/operationRole/create
// @access    Public
exports.create = asyncHandler(async (req, res, next) => {

    const { roleName, module ,active} = req.body;

    // Create role
    const role = await Role.create({
      roleName,
      module,    
      active
    });
  
    res.status(200).json({
        success:true,
        message:"role created"
    })

});

// @desc      remove access module
// @route     POST /api/v1/operationRole/removeAccess
// @access    Public
exports.removeAccess = asyncHandler(async(req,res,next) => {

    const { roleName, module } = req.body;

    let roleExist = await Role.findOne({roleName,module})

    if(!roleExist){
        return next(new ErrorResponse('Role with given access module dont exist', 404));
    }

    await Role.deleteOne({_id:ObjectId(roleExist._id)})

    res.status(200).json({
        success:true,
        message:"Access module deleted"
    })

})