const express = require('express')
const fetchuser = require('../middleware/fetchuser')
const User = require('../models/User1')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const router = express.Router()
const JWT_SECREATE = 'iamnishar'

//Rout 1:create user using:POST "/api/auth" dosen't require auth(signup)
router.post('/createuser', [
    body('name', 'enter valid name').isLength({ min: 3 }),
    body('email', 'enter valid email').isEmail(),
    body('password', 'enter valid password').isLength({ min: 5 })

], async (req, res) => {
    const errors = validationResult(req);
    let success=false;
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
        success=false;
    }

    // const user=User(req.body)
    // user.save()
    // res.send(req.body)

    try {
        //checking user alerady exist 
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({success, error: "sorry user alerady exist" })
            success=false
        }

        //creating salt and hash of the password
        const Salt = await bcrypt.genSalt(10)
        secPass = await bcrypt.hash(req.body.password, Salt)

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })

        const data = {
            user: {
                id: user.id
            }
        }
        success=true;
        const authtoken = jwt.sign(data, JWT_SECREATE)
        res.json({success, authtoken })

    } catch (error) {
        console.error(error.message)
        res.status(500).send(success,'some internal server error ')
    }
})

//Rout 2:for login user
router.post('/login', [

    body('email', 'enter valid email').isEmail(),
    body('password', 'password can not be blank').exists()

], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body
    try {
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ error: "please login with valid credential" })
        }

        let success=false;
        const comparepassword = await bcrypt.compare(password, user.password)
        if (!comparepassword) {
            success=false
            return res.status(400).json({ success,error: "please login with valid credential" })
        }

        const data = {
            user: {
                id: user.id
            }
        }
        success=true;
        const authtoken = jwt.sign(data, JWT_SECREATE)
        res.json({ success,authtoken,user })

    } catch (error) {
        console.error(error.message)
        res.status(500).send('some internal server error ')
    }
})


//Rout 3: Get loggedin user detail
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id
        const user = await User.findById(userId).select("-password")
        res.send(user)

    } catch (error) {
        console.error(error.message)
        res.status(500).send('some internal server error ')
    }
})
module.exports = router