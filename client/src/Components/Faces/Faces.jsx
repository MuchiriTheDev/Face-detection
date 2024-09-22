import React, { useEffect } from 'react';
import "./Faces.css";

const Faces = (props) => {


  return (
    <div className='face'>
      <div className="box ma">
        <img 
          src={props.image} 
          alt="" 
          id='input-image' 
          style={{maxWidth: "500px", height:"auto", maxHeight: "400px"}} 
          className="face-img" 
        />
        {
          props.size.map((box, i) => (
            <div 
              key={i} 
              className={`${props.clicked ? " border-face" : null}`}
              style={{
                top: `${box.topRow}px`, 
                bottom: `${box.bottomRow}px`, 
                right: `${box.rightCol}px`, 
                left: `${box.leftCol}px`
              }}
            ></div>
          ))
        }
      </div>
    </div>
  );
}

export default Faces;