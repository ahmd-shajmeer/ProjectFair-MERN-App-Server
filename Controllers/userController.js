const users = require('../Models/userModel')
const jwtoken = require('jsonwebtoken')

exports.register = async (req,res) =>{
    const {username,email,password} = req.body
    // console.log("Inside register request");
    try{
        // Check email already exist
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(406).json("User Already Exist!! Please Login...")
        }else{
            // Add as new user to db
            const newUser = new users({
                username,email,password,profile:"",github:"",linkedin:""
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }catch(err){
        res.status(401).json(err)
    }
}

exports.login = async (req,res) =>{
    const {email,password} = req.body
    // console.log("Inside login request");
    try{
        // Check email,password exist
        const existingUser = await users.findOne({email,password})
        if(existingUser){
            // Generate token using jwtoken
            const token = jwtoken.sign({userId:existingUser._id},process.env.jwt_secretKey)
            res.status(200).json({existingUser,token})
        }else{
            res.status(406).json("Incorrect Email/Password")
        }
    }catch(err){
        res.status(401).json(err)
    }
}

// Update user profile
exports.editProfile = async (req,res) =>{
    const userId = req.payload
    const {username,password,email,github,linkedin,profileImage} = req.body
    const profile = req.file?req.file.filename:profileImage
    
    try{
        const updateProfile = await users.findByIdAndUpdate({_id:userId},{
            username,email,password,profile,github,linkedin
        },{new:true})
        await updateProfile.save()
        res.status(200).json(updateProfile)
    }catch(err){
        res.status(401).json(err)
    }
}