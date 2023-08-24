import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


const Homepage = () => {
    let [title, setTilet] = useState()
    let [description, setDescription] = useState()
    let [content, setContent] = useState()
    let [getcontent, setgetContent] = useState([])
    let navigate = useNavigate()


    //post the data
    let taskdata = ((e) => {
        e.preventDefault()
        let data = { title, description, content }
        axios.post("http://localhost:5000/home", data)
            .then((res) => {
                alert(res.data.message)
                window.location.assign("/homepage")
            }).catch((res) => {
                alert(res.data.message)
            })
    })


    //get the data
    useEffect(() => {
        axios.get("http://localhost:5000/read")
            .then((res) => {
                setgetContent(res.data)
                console.log(res.data.title)
            }, [])

    }, [])

    // delete the data
    let deletedata=(value)=>{
        axios.delete(`http://localhost:5000/read/${value}`)
        .then((res)=>{
         if (res.data.udpadted_task) {
            alert("deleted sucessfully")
            
            window.location.assign("/homepage")
         } else {
            alert(res.data.error)
         }     
   
        })
    }

    return (
        <div style={{
            display: 'flex',
            // justifyContent: 'center',
            width: "100vw",
            height: '100vh'
        }}>
            <section style={{
                backgroundColor: "black",
                display: 'flex',
                flexFlow: 'column',
                // justifyContent: 'center',
                alignItems: 'center',
                padding: '40px',
                margin: "40px",
                height: '400px'
            }}>
                <div><label style={{ margin: '26px', color: 'white' ,fontSize:'20px'}} > Title  :</label>
                    <input type="text" style={{height:'30px'}}  onChange={e => setTilet(e.target.value)} /></div>
                <br />
                <div><label style={{ color: 'white',fontSize:'20px' }} > Description: </label>
                    <input type="text" style={{height:'30px'}} onChange={e => setDescription(e.target.value)} /> </div>
                <br />
                <label style={{ color: 'white',fontSize:'20px'}} > Content:</label>
                <textarea name="" id="" cols="30" rows="10" onChange={e => setContent(e.target.value)}></textarea>
                <br />
                <button onClick={taskdata} style={{ height: "30px", width: '70px' }}> submit</button>
            </section>
            <section style={{
                backgroundColor: "black",
                display: 'flex',
                flexFlow: 'column',
                // justifyContent: 'center',
                alignItems: 'center',
                padding: '40px',
                margin: "10px",
                padding:"20px",
                height: '80vh',
                width: '800px'
            }}>
                {getcontent.map((x) => {
                    return (
                        <div style={{ margin:'5px',borderRadius:'15px',display: 'flex', height: '50px', width: '100%', backgroundColor: 'white', justifyContent: 'space-evenly', alignItems: 'center' }}>
                            <h3 style={{ width: '100px', height: '30px', border: '1px solid black' }}>{x.title}</h3>
                            <h3 style={{ width: '100px', height: '30px', border: '1px solid black' }}>{x.description}</h3>
                            <h6 style={{ width: '200px', height: '30px', border: '1px solid black' }}>{x.content}</h6>
                            <Link to={`/editpage/${x._id}`} ><button style={{ height: '30px', width: '50px' }}  >Edit</button></Link>
                            <button style={{ height: '30px', width: '70px' }} onClick={()=>deletedata(x._id)}>Delete</button>

                        </div>
                    )
                })}
                

            </section>

        </div>
    )
}

export default Homepage