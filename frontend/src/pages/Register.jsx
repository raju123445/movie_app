
import React, { useState } from 'react'
import axios from 'axios'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = async () => {
    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/register`, {
      name, email, password
    })
    alert('Registered successfully')
  }

  return (
    <div style={{padding:'40px'}}>
      <h2>Register</h2>
      <input placeholder="Name" onChange={e=>setName(e.target.value)} /><br/>
      <input placeholder="Email" onChange={e=>setEmail(e.target.value)} /><br/>
      <input placeholder="Password" type="password" onChange={e=>setPassword(e.target.value)} /><br/>
      <button onClick={handleRegister}>Register</button>
    </div>
  )
}
