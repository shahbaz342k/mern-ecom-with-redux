const User  = require("../models/UserModel.js");
const bcrypt =  require("bcryptjs");
const CreateError  = require('./../utils/createError.js');
// const CreateError = require('./../utils/createError');
const jwt = require("jsonwebtoken");
const { upload } = require("../helper.js");



const imgUpload = async (req, res, next) => {

    try {
        const file = req.image;
        console.log(file)
        res.json('file uploaded');
    } catch (error) {
        res.json('not upload', error.message)
    }
}
    

const register = async ( req, res, next ) =>{
    // res.json(req.files)
    // res.json({body:req.body,files:req.files})
    // res.json(req)
    // if( req.file ){
    //     res.json(req.files)
    // }else{
    //     res.json(req.body)
    // }
    // res.json(req.files.file.name)
    try{
       
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        
        let datasend = {};
        if( req.file ){
            
            let fileUrl = '';
            if(!req.file) {
                res.status(500);
                return next(err);
            }
            
            fileUrl ='http://127.0.0.1:5000/images/' + req.file.filename;
            // res.json(fileUrl)
            // console.log('return false')
            // console.log('filename', fileUrl)
            // return;
            // fileUrl = 'http://127.0.0.1:5000/images/' + req.files.file.name;
            // res.json(fileUrl)
            datasend= {
                name:req.body.name,
                email:req.body.email,
                password:hash,
                image:fileUrl
            }
            // datasend= {...others,password:hash,image:fileUrl}
        }else{
           
            datasend= {
                name:req.body.name,
                email:req.body.email,
                password:hash,
            }
        }
        const user = new User(datasend);

        const user_document = await user.save(); 

        res.status(201).json({
            result:user_document,
            success:true,
        })

    }catch(err){
        next(err)
    }
}
const login = async ( req, res, next ) =>{
    try{
        // destructring the parameters
        const {email} = req.body;
        
        // get user from username in user table
        const user = await User.findOne({email:email});
        
        //check user object
        if(!user) return next(CreateError(404,'user not found'));

        // compare plain password to hash password
        let isPasswordMatch = await bcrypt.compare(req.body.password,user.password);
        // check both password match or not
        if(!isPasswordMatch) return next(CreateError(400, 'password wrong'));

        // create jwt token
        const token = jwt.sign(
                        {data:{ id: user._id, isAdmin:user.isAdmin }}, 
                        process.env.JWT_SECRET,
                        { expiresIn: '30 days' }
                    );

        // finally return response
        const {password, isAdmin, ...otherDetails} = user._doc;

        return res.cookie(
            "access_token",token,{
                httpOnly:true
            }
        )
        .status(200).json({
            result:otherDetails,
            token : token,
            success:true,  
        });

    }catch(err){
        next(err)
    }
    
}

const read = async ( req, res, next ) =>{
    let data = '';
    try{
        if (req.params.id) {
            const _id = req.params.id;
             data = await User.find({_id:_id});
            //  resultCount = data.length
        }else{
             data = await User.find().sort({_id:-1});
            //  resultCount = data.length
            
        }
        res.status(200).json({
            success:true,
            count: data.length,
            result:data
        })
        // res.status(200).json(data)
    }catch(err){
        next(err)
    }
}
const update = async ( req, res ) =>{
    const _id = req.params.id;
    
    let data;
    if( req.body.password ){
        // res.json(req.body)
        const {password, ...others} = req.body;
        // res.json(req.body);
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        data = {password:hash, ...others};
    }else{
        data = req.body;
    }
    // res.json(data)
    
    let result = await User.findOneAndUpdate({_id:_id}, {$set:data}, {new:true});
    try{
        res.status(200).json({
            success:true,
            result:result
        })
    }catch(err){
        res.status(500).json(err)
    }
}
const destroy = async ( req, res) =>{
    const _id = req.params.id;
    // res.json(_id)
    // let result = User.findByIdAndUpdate(_id,req.body);
    let result = await User.deleteOne({_id:_id});
    try{
        if( result.deletedCount > 0){
            res.status(200).json({
                success:true,
                result:result
            })
        }else{
            res.status(404).json({
                success:false,
                result:{}
            })
        }
        
    }catch(err){
        res.status(500).json(err)
    }
}
const destroyAll = async ( req, res) =>{
    let result = await User.deleteMany();
    try{
        if( result.deletedCount > 0){
            res.status(200).json({
                success:true,
                result:result
            })
        }else{
            res.status(404).json({
                success:false,
                result:{}
            })
        }
        
    }catch(err){
        res.status(500).json(err)
    }
}

module.exports = { register, login, read, update, destroy, destroyAll,imgUpload }