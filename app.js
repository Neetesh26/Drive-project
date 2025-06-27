const express = require('express')
const app = express()
const userRouter = require('./routes/user.routes')
const morgan = require('morgan')
const dotenv = require('dotenv')
dotenv.config()
const connectDb = require('./config/db')
connectDb()


app.use(morgan('dev'))


app.set('view engine', 'ejs');


//fetch data in terminal 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// app.get('/', (req, res) => {
//     res.render('register')
// })


app.use('/user',userRouter)




app.listen(3000, () => {
    console.log('Server is running on port 3000')
})
