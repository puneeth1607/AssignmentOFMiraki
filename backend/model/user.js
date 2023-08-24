const mongoose = require('mongoose')
// creating the schema
const userSchema = new mongoose.Schema({
    fname:{
    type:String,
    required:true
},
lname:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true
}
})

//creates and exports a modele of schema
module.exports =  mongoose.model('User',userSchema)