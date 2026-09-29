const Product = require('../model/productModel');

const ProductMethods = {};

ProductMethods.getAllProduct = async (req,res,next) => {
    const data = await Product.find();

    if(!data){
        return res.status(400).json({
            message:"No Data Found"
        })
    }

    res.status(200).json({
        Product:data,
        message:`${data.length} products available`
    })
}

ProductMethods.createProduct = async (req,res,next) => {
    const data = await Product.create(req.body);

    if(!data){
       return res.status(500).json({
            error:"Error occured while creating the product.",
            message:res.error
        })
    }

    res.status(201).json({
        message:"Product Created Successfully !!!",
        data
    })
}

module.exports = ProductMethods;