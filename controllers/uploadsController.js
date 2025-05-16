const { StatusCodes } = require('http-status-codes');
const cloudinary= require('cloudinary').v2
const fs= require('fs')

const uploadProductImage = async(req, res) => {
 
  const result= await cloudinary.uploader.upload(
    req.files.image.tempFilePath, 
    {
      use_filename: true,
      folder: 'file_upload'
         
    }
  )
  fs.unlinkSync(req.files.image.tempFilePath)

 
  res.status(StatusCodes.OK).json({image: {src: result.secure_url}})
}

module.exports= { uploadProductImage} 