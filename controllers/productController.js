const Product= require('../models/Product')
const { StatusCodes } = require('http-status-codes');
const {NotFoundError, BadRequestError}= require('../errors')

const createProduct= async(req, res) => {
  const {name, price} = req.body

  if(!name ) {
     throw new BadRequestError ('Please provide name')
  }

   if(!price || typeof price !== 'number' || isNaN(price)) {
     throw new BadRequestError ('Please provide price, price has to be a number')
  }


 const product= await Product.create(req.body)
 
  res.status(StatusCodes.CREATED).json({product})
}

const getAllProducts= async(req, res) => { 
 
 const products= await Product.find({}) 
 res.status(StatusCodes.OK).json({products, count:products.length}) 
}

const deleteProduct= async(req, res) => {
  
  const productID= req.params.id
  const product= await Product.findByIdAndDelete({_id: productID})

  if(!product) {
    throw new NotFoundError(`No product with id ${productID}`)
  }

  res.status(StatusCodes.OK).json({product})
}
module.exports= {createProduct, getAllProducts, deleteProduct}