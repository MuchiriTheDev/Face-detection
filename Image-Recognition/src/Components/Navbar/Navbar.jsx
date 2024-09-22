import React from 'react'
import "./Navbar.css"

const Navbar = (props) => {
  if(props.isSigned){ 
   return (
   <div className='navbar'>
      <a onClick={() => props.check("signing")} className='link'>Sign Out</a>
    </div>
    )
  }else{
  return(
    <div className='navbar'>
      <a onClick={() => props.check("signing")} className='link'>Sign In</a>
      <a onClick={() => props.check("register")} className='link'>Register</a>
    </div>
  )}

}

export default Navbar