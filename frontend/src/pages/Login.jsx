
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, {
      email, password
    })
    if(res.data.success){
      navigate('/dashboard')
    } else {
      alert('Invalid credentials')
    }
  }

  return (
    <div style={{padding:'40px'}}>
      <h2>Login</h2>
      <input placeholder="Email" onChange={e=>setEmail(e.target.value)} /><br/>
      <input placeholder="Password" type="password" onChange={e=>setPassword(e.target.value)} /><br/>
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}
