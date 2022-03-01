import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'



export default function Dashboard() {

  const [error, setError] = useState('')
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    setError('')

    try {
      await logout()
      history.push('/')
    } catch {
      setError('Hubo un fallo al salir')
    }
  }

  return (
   
<div>
  <div className="dash">
    <nav>
      <h2>Bienvenido { currentUser.email }</h2>
      <div className="menu">
        <button><Link to='/update-profile'>Perfil</Link></button>
        <button onClick={handleLogout}>Salir</button>
        {/* <button><Link to='/Form'>Registro</Link></button>
        <button><Link to='/List'>Lista</Link></button>
        <button><Link to='/Cru'>Cru</Link></button> */}
       
      </div>
    </nav>
    { error && <h1>{error}</h1>}
   
  </div>
  <button><Link to='/Cru'>Mentoria</Link></button>
  <button><Link to='/Estudiantes'>Registro</Link></button>
</div>
  )
}

