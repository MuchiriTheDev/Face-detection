import React from 'react'
import "./Rank.css"

const Rank = (props) => {
  return (
    <div className='rank'>
        <div className="section-1">
            <p className='one'>{props.name}, you current number of entries is......</p>
        </div>
        <div className="section-1">
            <p className='two'>#{props.entries}</p>
        </div>
    </div>
  )
}

export default Rank