require('dotenv').config()
require('express-async-errors')
const express= require('express')
const app= express()
const connectDB= require('./db/connect')
const productRouter= require('./routes/productRoutes')
const notFoundMiddleware = require('./middleware/not-found');
const fileUpload= require('express-fileupload')
const errorHandlerMiddleware = require('./middleware/error-handler');
const cloudinary= require('cloudinary').v2
const helmet= require('helmet')
const cors= require('cors')
const xss= require('xss-clean')
const rateLimiter= require('express-rate-limit')

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
}) 
const port= process.env.PORT || 3500



app.use(fileUpload({useTempFiles: true}))
app.use(express.static('./public'))

app.set('trust proxy', 1)
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
)
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())




app.use('/api/v1/products', productRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const start= async() => {
  try{
    await connectDB(process.env.MONGO_URI)
    console.log('connected to mongodb')
   app.listen(port, console.log(`Server is listening on port ${port}`))

  } catch(error) {
    console.log(error)
  }
 
}
start()