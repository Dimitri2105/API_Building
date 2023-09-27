const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')
const User = require('../modals/userModel')


exports.validate = async(req,res,next) =>{
    try{

        const user = await User.findOne({_id : "6512837bcfa2828acaa3c25c" , lastActive : true })
        console.log("user >>>>>>>>>" , user)
        // console.log("user.lastActive >>>>>>>>" , typeof(user.lastActive))
        if(user === null){
            return res.status(400).json({ message : "User is not active . Try again after some time "})
        }
        if(user.lastActive === 'true'){
            console.log("HERE >>>>>>")
            next()
        }
        



    }
    catch(error){
        console.log(error)
        res.status(400).json({ error : error })
    }
}