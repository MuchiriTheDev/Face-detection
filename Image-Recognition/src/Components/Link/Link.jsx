import React from 'react'
import "./Link.css"

const Link = (props) => {
  return (
    <div className='img-link'>
        <p className="link-text">
          Use the appropriate image address
        </p>
        <div className="inner">
            <input type="url" name="image-link" id="image-link" onChange={props.onsearch} placeholder='Enter your image link' required/>
            <button className="btn" onClick={props.clicked}>Recognise</button>
        </div>
    </div>
  )
}

export default Link