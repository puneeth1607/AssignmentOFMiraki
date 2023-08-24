import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const Edituser = () => {
    let {id} = useParams()
    let [title, setTilet] = useState("")
    let [description, setDescription] = useState("")
    let [content, setContent] = useState("")  
    let navigate = useNavigate()
        // update the data
    let updatedata=(e)=>{
        let data = { title, description, content }
        axios.put(`http://localhost:5000/read/${id}`,data)
        .then((res)=>{
         if (res.data.udpadted_task) {
            navigate("/homepage")
         } else {
            alert(res.data.error)
         }     
   
        })
    }
console.log(id)
    //fetch data
    useEffect(() => {
        axios.get(`http://localhost:5000/read/${id}`)
            .then((res) => {
                 setTilet(res.data.title)
                 console.log(res.data)
                setDescription(res.data.description)
                setContent(res.data.content)
            },[])

    }, [])

  return (
     <div style={{
            display: 'flex',
            justifyContent: 'center',
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
                    <input type="text" style={{height:'30px'}}   defaultValue={title} onChange={e => setTilet(e.target.value) } /></div>
                <br />
                <div><label style={{ color: 'white',fontSize:'20px' }} > Description: </label>
                    <input type="text"  style={{height:'30px'}}   defaultValue={description} onChange={e => setDescription(e.target.value)} /> </div>
                <br />
                <label style={{ color: 'white' }} > Content:</label>
                <br />
                <textarea name="" id="" cols="30" rows="10"  defaultValue={content} onChange={e => setContent(e.target.value)}></textarea>
                <br />
                <button onClick={(x)=>updatedata(x._id)} style={{ height: "30px", width: '70px' }}  > submit</button>
            </section>
            </div>
  )
}

export default Edituser