import React, { useState } from 'react'
import style from './style.module.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const Register = () => {
  
    let [fname, setFname] = useState('');
    let [lname, setlname] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [cpassword, setCPassword] = useState('');
    let navigate = useNavigate();
  
    let request = ((e) => {
      e.preventDefault()
      let data = { fname, lname, email, password, cpassword }
      if (fname && lname && email && (password === cpassword)) {
        axios.post('http://localhost:4000/register', data)
          .then((res) => {
            alert(res.data.message)
            navigate('/')
          })
          .catch(() => {
            alert('invalid credentials')
          })
  
      }
    })
  
    return (
      <div>
        <section className={style.body}>
          <div className={style.createcard}>
            <div style={{ height: 40, color: 'red' }}><h1>Register</h1></div>
            <div className={style.input}>FirstName:<input type="text" onChange={e => setFname(e.target.value)} autoFocus />  </div>
            <div className={style.input}>SecondName:<input type="text" onChange={e => setlname(e.target.value)} />  </div>
            <div className={style.input}>Email:<input type="email" onChange={e => setEmail(e.target.value)} />  </div>
            <div className={style.input}>Password:<input type="text" onChange={e => setPassword(e.target.value)} /></div>
            <div className={style.input}>conformPassword:<input type="text" onChange={e => setCPassword(e.target.value)} /></div>
            <button style={{ height: 30, width: 100, color: 'red' }} onClick={request}  > Register </button>
            <br />
            <Link to="/">I have allredy registered</Link>
          </div>
  
  
        </section>
      </div>
  )
}

export default Register