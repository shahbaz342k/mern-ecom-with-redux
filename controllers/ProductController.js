const { default: slugify } = require("slugify");
const Product  = require("../models/ProductModel.js");
const { CreateError } = require('./../utils/createError.js');


const add = async ( req, res, next ) =>{
    const {title, ...others} = req.body;
    // Simple use
    // const title1 =
    // 'He thrusts his fists against the posts and still insists he sees the ghosts';
    // Config your options
    const options = {
    replacement: '-', // replace spaces with replacement character, defaults to `-`
    remove: undefined, // remove characters that match regex, defaults to `undefined`
    lower: true, // convert to lower case, defaults to `false`
    strict: true, // strip special characters except replacement, defaults to `false`
    locale: 'en', // language code of the locale to use
    };
    const slugStr = slugify(title,options);
    // res.send(slugStr);
    
    try{
        
        const product = new Product({
            title:title,
            slug:slugStr,
            ...others
        });
        const product_document = await product.save(); 

        res.status(201).json({
            result:product_document,
            success:true,
        })

    }catch(err){
        next(err)
    }
}

const read = async ( req, res, next ) =>{
    let data = '';
    try{
        if (req.params.id) {
            const _id = req.params.id;
             data = await Product.find({_id:_id});
            //  resultCount = data.length
        }else{
             data = await Product.find().sort({_id:-1});
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

    let result = await Product.findOneAndUpdate({_id:_id}, {$set:req.body}, {new:true});
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
    // let result = Product.findByIdAndUpdate(_id,req.body);
    let result = await Product.deleteOne({_id:_id});
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
    let result = await Product.deleteMany();
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

const productCart = async (req, res, next) => {
        let documents;
        // let ids = ['62a823ff8c6461a92151ec67','62a75109b95a76b9f2fb1f7a'];
        // let idsss = '62a75109b95a76b9f2fb1f7a,62a823ff8c6461a92151ec67'
        let ids = req.body.ids;
        ids = ids.split(',');
        // res.send(ids);
        try {
            documents = await Product.find({
                _id: { $in: ids },
            }).select('-updatedAt -__v');
        } catch (err) {
            next(err)
        }
        res.status(200).json({
            success:true,
            result:documents
        })
}

const searchProduct = async (req, res, next) =>{
    let query = req.params.query;
    // res.send(query)

    // for single regex
    let regex = new RegExp( query, 'i') 
    
    try {
        // for single field search query
    //    let doc = await Product.find({title: regex}); 

       // for multiple fields search query
       let doc = await Product.find(
        {
            "$or":[
                {"title": {$regex:query,$options:'i'}},
                {"category": {$regex:query,$options:'i'}}
            ]
        }
       ); 
       if( doc.length == 0 ){
        res.status(404).json({
            success:false,
            result:[],
        })
       }
       res.status(200).json({
            success:true,
            count:doc.length,
            result:doc
       })
    } catch (err) {
        next(err)
    }
}

module.exports = { add, read, update, destroy, destroyAll, productCart, searchProduct }