
import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Dashboard() {
  const [movies, setMovies] = useState([])

  useEffect(()=>{
    const fetchMovies = async () => {
      const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}`)
      setMovies(res.data.results)
    }
    fetchMovies()
  },[])

  return (
    <div style={{padding:'20px', background:'#000', color:'#fff'}}>
      <h1>Netflix Style Movies</h1>
      <div style={{display:'flex', flexWrap:'wrap'}}>
        {movies.map(m=>(
          <div key={m.id} style={{margin:'10px'}}>
            <img src={`https://image.tmdb.org/t/p/w200${m.poster_path}`} />
            <p>{m.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
