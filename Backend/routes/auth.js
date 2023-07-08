const express = require('express')
const User = require('../models/User1')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const router = express.Router()
const JWT_SECREATE='iamnishar'

//create user using:POST "/api/auth" dosen't require auth
router.post('/createuser', [
    body('name', 'enter valid name').isLength({ min: 3 }),
    body('email', 'enter valid email').isEmail(),
    body('password', 'enter valid password').isLength({ min: 5 })

], async (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    // const user=User(req.body)
    // user.save()
    // res.send(req.body)

    try {
        //checking user alerady exist 
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: "sorry user alerady exist" })
        }

        //creating salt and hash of the password
        const Salt = await bcrypt.genSalt(10)
        secPass = await bcrypt.hash(req.body.password, Salt)

        user= await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })

        const data={
            user:{
                id:user.id
            }
        }

        const authtoken=jwt.sign(data,JWT_SECREATE)
        res.json({authtoken})

    } catch (error) {
        console.error(error.message)
    }
})

module.exports = router