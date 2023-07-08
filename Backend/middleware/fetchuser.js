var jwt = require('jsonwebtoken');
const JWT_SECREATE = 'iamnishar'

const fetchuser=(req,res,next)=>{
    //get the user from jwt token and add id to req object
    const token=req.header('auth-token')
    if(!token){
        res.status(401).send({error:"please authenticate using valid token"})
    }

    try{
        const data=jwt.verify(token,JWT_SECREATE)
        req.user=data.user
        next()
    }catch(error){
        res.status(401).send({error:"please authenticate using valid token"})
    }
}

module.exports=fetchuser