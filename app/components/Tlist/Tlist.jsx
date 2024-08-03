import React from 'react'
import Teams from '../Teams/Teams'
import { teamdata } from '../../data'
import './Tlist.css'

const Tlist = () => {
  return (
    <div className='teamdata teams'>
      <div className='Title-hero'><h1>OUR TEAMS</h1></div>
        <div className="teamdata-list">
            {teamdata.map((item)=>(
                <Teams key={item.id} Name={item.Name} img={item.img} Post={item.Post} Facebook={item.Facebook} Github={item.Github}/>
            ))}
        </div>
    </div>
  )
}

export default Tlist