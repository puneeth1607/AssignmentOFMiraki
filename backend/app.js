const express = require('express')
const app = express()
let port = 4000

const mongoose = require('mongoose')
const cors = require('cors')
const User = require('./model/user')
// const Task = require('./model/task')

//middleware
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// connecting to database
// user data base
const db_url = 'mongodb://localhost:27017/userData'
mongoose.connect(db_url).then(() => {
    console.log('connection established')
})



// user register page backend
app.post('/register', (req, res) => {
    User.findOne({ email: req.body.email }).then((data) => {
        if (data) {
            //err message
            res.send({ message: 'user alredy exists' })

        } else {
            //add the data

            // creating a new object
            let udata = new User({
                fname: req.body.fname,
                lname: req.body.lname,
                email: req.body.email,
                password: req.body.password
            })

            // saving the data and displaying the message
            udata.save().then(() => {
                res.send({ message: "user registered succesfully" })

            }).catch(() => {
                res.send({ message: "user registraion failed. try after sometime" })
            })

        }
    })
})

// user login page backend
app.post('/login',(req,res)=>{
    User.findOne({email:req.body.email})
    .then((userData)=>{
        if(userData){
          if(req.body.password === userData.password){
            res.send({message:"login succenfull" , status:200})
          }else{
            res.send({message:"invalid user id or passowrd"})
          }
        }
        else{
          res.send({message:'user not found'})
        }
      }
    )
  })
  





app.listen(port, () => {
    console.log('server started (renning in the port 4000)')
})
