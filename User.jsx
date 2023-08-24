import React, { useState } from 'react'
import style from './style.module.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';

const User = () => {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let navigate = useNavigate()

  let enterpage = (e) => {
    e.preventDefault();
    let data = { email, password }
    axios.post('http://localhost:4000/login',data)

      .then((res) => {
        if (res.data.status === 200) {
          alert(res.data.message)
          navigate('/homepage')
        } else {
          alert(res.data.message)
        }
      })
  }


  return (
    <div>
      <section className={style.body}>
        <div className={style.logcard}>
          <h1>Login</h1>
          <div className={style.input}>email:<input type="text" onChange={e => setEmail(e.target.value)} />  </div>
          <div className={style.input}>Password:<input type="text" onChange={e => setPassword(e.target.value)} /></div>
          <button style={{ height: 30, width: 100, }} onClick={enterpage}> submit</button>
          <br />
          <Link to="/register">Create An Account if not exist</Link>
        </div>


      </section>

    </div>

  )
}

export default User