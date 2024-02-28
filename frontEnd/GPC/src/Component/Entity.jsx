import React, { useEffect, useState } from 'react'
import data from  '../data.json'
import '../Styles/entity.css'

const Entity = () => {
  const [ Database, setDatabase ] = useState([]) 

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await fetch("http://localhost:3000/getcomp")
        const json = await response.json()
        setDatabase(json)
      }catch(err){
        console.log('Error:', err)
      }
    }
    fetchData()
  }, [])
  
  return (
    <>
      <h2>Entities</h2>
      {Database && Database.map((item, index) => {
        return(
          <div key={index} className='entity'>
            <p>{item.PC}</p>
            <p>{item.CPU}</p>
            <p>{item.GPU}</p>
            <p>{item.RAM}</p>
            <p>{item.Storage}</p>
            <p>{item.SMPS}</p>
            <p>{item.Cabinet}</p>
            <p>{item.Price_INR}</p>
          </div>
        )
      })}
    </>
  )
}

export default Entity
