const express = require('express');

const router = express.Router();
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const JWT_SECRET  = require("../config");
const  { authMiddleware } = require("../middleware");

const signupBody = zod.object({
    username: zod.string().min(1,{message:"username is required"}).email(),
	firstName: zod.string().min(1,{message:"firstname is required"}),
	lastName: zod.string().min(1,{message:"lastname is required"}),
	password: zod.string().min(6,{message:"password is required"})
})

router.post("/signup", async (req, res) => {
    const { success ,error} = signupBody.safeParse(req.body)
    
    if (!success) {
        return res.status(411).json({
            errorMessage:error.issues
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    const userId = user._id;

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })
})


const signinBody = zod.object({
    username: zod.string().min(1,{message:"username is required"}).email(),
	password: zod.string().min(6,{message:"password must have atleast 6 charetor"})
})

router.post("/signin", async (req, res) => {
    const { success ,error} = signinBody.safeParse(req.body)
    
    if (!success) {
        return res.status(411).json({
            errorMessage:error.issues
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
  
        res.json({
            token: token
        })
        return;
    }

    
    res.status(411).json({
        errorMessage: "Error while logging in"
    })
})

const updateBody = zod.object({
	password: zod.string().min(6,{message:"password must have atleast 6 charetor"}),
    firstName: zod.string().min(1,{message:"firstname is required"}).optional(),
    lastName: zod.string().min(1,{message:"lastname is required"}).optional(),
})

router.put("/update", authMiddleware, async (req, res) => {
    const { success ,error} = updateBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            errorMessage:error.issues 
        })
    }

    await User.updateOne( {
        _id: req.userId
    },{
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        password:req.body.password
    })

    res.json({
        message: "Updated successfully",
        success:true
    })
})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";
    const authHeader = req.headers.authorization;
    
    if(!authHeader || !authHeader.startsWith('Bearer ')|| (authHeader.split(' ')[1]=="")){
        return res.json({
            success:false,
            message:"User is not loged in"
        });
    }
    const token = authHeader.split(' ')[1];
    const userId = jwt.verify(token,JWT_SECRET);

    const users = await User.find({
        $and :[
            {
                _id:{ $ne:userId.userId}
            },
            {
                $or: [{
                    firstName: {
                        "$regex": filter
                    }
                }, {
                    lastName: {
                        "$regex": filter
                    }
                }]
            }
        ]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

router.get("/me",async(req,res)=>{

    const authHeader = req.headers.authorization;
    
    if(!authHeader || !authHeader.startsWith('Bearer ') || (authHeader.split(' ')[1]=="")){
        
        return res.status(200).json({
            success:false,
            message:"User is not loged in"
        });
    }
    const token = authHeader.split(' ')[1];
    const userId = jwt.verify(token,JWT_SECRET);
    const user = await User.findOne({ _id: userId.userId });
    if(!user){
        
        return res.status(200).json({
            
            message:"no user found",
            success:false,
        })
    }
    res.status(200).json({
        username:user.username,
        firstName:user.firstName,
        lastName:user.lastName
    })
})

module.exports = router;