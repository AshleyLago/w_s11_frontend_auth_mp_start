import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function StarsList() {
  const navigate = useNavigate()
  const [stars, setStars] = useState([])

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const fetchStars = async () => {
        try {
          const { data } = await axios.get(
            '/api/stars',
            { headers: { Authorization: token } }
          )
          setStars(data)
        } catch (err) {
          if (err.response.status == 401) {
            handleLogout()
          }
        }
      }
      fetchStars()
    } else { navigate('/') }
  }, [])

  return (
    <div className="container">
      <h3>StarsList <button onClick={() => handleLogout()}>Logout</button></h3>
      {stars.length > 0 ? (
        <div>
          {stars.map((star) => (
            <div key={star.id} style={{ marginBottom: '20px' }} className="star">
              <h4>{star.fullName}</h4>
              <p>Born: {star.born}</p>
              <p>{star.bio}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No stars found.</p>
      )}
    </div>
  )
}
