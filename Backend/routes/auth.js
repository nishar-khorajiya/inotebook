const express=require('express')
 const User=require('../models/User1')
const router = express.Router()

//create user using:POST "/api/auth" dosen't require auth
router.get('/',(req,res)=>{
    const user=User(req.body)
    user.save()
    res.send(req.body)
})

module.exports=router