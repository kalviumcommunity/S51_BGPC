import React, { useEffect, useState } from 'react'
import '../Styles/entity.css'
import axios from "axios"

const Entity = () => {
  const [ Database, setDatabase ] = useState([]) 

  useEffect(() => { 
    const loadPost = async () => { 

        const response = await axios.get( 
            "http://localhost:3000/getcomp"
        ); 

        setDatabase(response.data); 
    }; 

    loadPost(); 
}, []);
  
  return (
    <>
      { Database.map((item, index) => {
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
