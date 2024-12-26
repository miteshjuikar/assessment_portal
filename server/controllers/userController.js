const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

//Registration

const registerUser = async(req,res) => {
    const { userName, email, password, role } = req.body;
    
    try {
        const checkUser = await User.findOne({email});
        if(checkUser)
            return res.json({
                success: false,
                message: "User Already exists with the same email! Please try again"
            });
        const hashPasssword = await bcrypt.hash(password, 12);

        if(role==="admin"){
            return res.json({
                success: false,
                message: "Something went wrong"
            });
        }
        const newUser = new User({
            userName,
            email,
            password: hashPasssword,
            role
        });

        await newUser.save();

        res.status(200).json({
            success: true,
            message: "Registration successful",
          });
    } catch (err) {
        console.log("authController", err);
        res.status(500).json({
            success: false,
            message: "Some error occured",
        })
    }
}

//Login

const loginUser = async(req,res) => {
    const { email, password } = req.body;

    try {
    const checkUser =await User.findOne({email});

    if(!checkUser){
        return res.json({
            success: false,
            message: "User doesn't exists! Please register first"
        });
    }

    const checkPasswordMatch = await bcrypt.compare(password, checkUser.password);    

    if(!checkPasswordMatch){       
        return res.json({
            success: false,
            message: "Incorrect password! Please try again"
        })
    }
    const secretKey = process.env.SECRET_KEY;
    
    const token = jwt.sign({
        id: checkUser._id,
        userName: checkUser.userName,
        email: checkUser.email,
        role: checkUser.role
        }, secretKey,
        { expiresIn: "1day" }
    );

    res.cookie('token', token,  { httpOnly: true, secure: false }).json({
        success: true,
        message: "Logged in successfully",
        user: {
          email: checkUser.email,
          role: checkUser.role,
          id: checkUser._id,
          userName: checkUser.userName,
        },
    });

    } catch (err) {
        console.log("authController", err);
        res.status(500).json({
            success: false,
            message: "Some error occured",
        })
    }
}

//Logout
const logoutUser = (req, res) => {
    
    res.clearCookie("token").json({
      success: true,
      message: "Logged out successfully!",
    });
  };


//Auth middleware
const authMiddleware = (req,res,next) => {
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            success: false,
            message: "Unauthorised user!"
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Unauthorised user!"
        });
    }
}

module.exports = { registerUser, loginUser, logoutUser, authMiddleware};