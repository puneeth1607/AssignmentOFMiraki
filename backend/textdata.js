const express = require('express')
const app = express()
let port = 5000

const mongoose = require('mongoose')
const cors = require('cors')
const Task = require('./model/task')

//middleware
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


//task database
const dbt_url = 'mongodb://localhost:27017/task'
mongoose.connect(dbt_url).then(() => {
    console.log('connection established')
})


// to Post the task 
app.post('/home', async (req, res) => {
    let tdata = new Task({
        title: req.body.title,
        description: req.body.description,
        content: req.body.content
    })

    console.log(tdata)
    // saving the data and displaying the message
    try {
        await tdata.save()
        res.send({ message: "data saved" })

    } catch {
        res.send({ message: "unable to save data " })

    }
})
//get the data
app.get('/read/', async (req, res) => {
    Task.find({})
        .then((result) => {
            res.send(result)
        }).catch(() => {
            res.send('unable to fetch ')
        })
})

//get tehe data by id
app.get('/read/:id', async (req, res) => {
    Task.findById({_id: req.params.id})
        .then((result) => {
            res.send(result)
        }).catch(() => {
            res.send('unable to fetch ')
        })
})
// update the data
app.put('/read/:id', async (req, res) => { 
    Task.findOneAndUpdate({ _id: req.params.id }, {
        $set:{
            title: req.body.title,
            description: req.body.description,
            content: req.body.content
        }
        
    }).then((result) => {
                res.status(200).json({
                    udpadted_task : result
                })
            }).catch(err => {
                console.log("data not found")
                res.status(200).json({
                    error :err
                })
            })
    })
    

    // update the data
app.delete('/read/:id', async (req, res) => { 
    Task.findOneAndDelete({ _id: req.params.id }).then((result) => {
                res.status(200).json({
                    udpadted_task : result  
                })
            }).catch(err => {
                console.log("data not found")
                res.status(200).json({
                    error : err
                })
            })
    })


// app.put('/update/:id',(req,res)=>{
//     const id = req.params.id;
//     const data = courses.find(x=>x.id === parseInt(id))
//     if(data){
//         data.title=req.body.uptitle
//         data.description=updescription
//         data.content=upcontent
//         data.save()
//     }
//     else{
//         res.send('can find id')
//     }
//     })


app.listen(port, () => {
    console.log('server started (renning in the port 5000)')
})