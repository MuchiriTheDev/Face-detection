import { Tilt } from 'react-tilt'
import React from 'react'
import "./Logo.css"
import img from "../../assets/ebf6e98f-dd31-427c-bbcc-6ee4d165353f.jpg"

const defaultOptions = {
	reverse:        false,  // reverse the tilt direction
	max:            55,     // max tilt rotation (degrees)
	perspective:    1000,   // Transform perspective, the lower the more extreme the tilt gets.
	scale:          1.0,    // 2 = 200%, 1.5 = 150%, etc..
	speed:          1000,   // Speed of the enter/exit transition
	transition:     true,   // Set a transition on enter/exit.
	axis:           null,   // What axis should be disabled. Can be X or Y.
	reset:          true,    // If the tilt effect has to be reset on exit.
	easing:         "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
}

const Logo = () => {
  return (
    <div className="logo">
        <Tilt className='tilt' options={defaultOptions}>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48"><path fill="#64b5f6" d="M37,36H17c-2.761,0-5-2.239-5-5V11c0-2.761,2.239-5,5-5h20c2.761,0,5,2.239,5,5v20 C42,33.761,39.761,36,37,36z M21,30h14V18.5c0-3.038-2.462-5.5-5.5-5.5H18v14C18,28.657,19.343,30,21,30z"/><path fill="#fb8c00" d="M31,42H11c-2.761,0-5-2.239-5-5V17c0-2.761,2.239-5,5-5h20c2.761,0,5,2.239,5,5v20 C36,39.761,33.761,42,31,42z M17.5,36H30V21c0-1.657-1.343-3-3-3H15c-1.657,0-3,1.343-3,3v9.5C12,33.538,14.462,36,17.5,36z"/><path fill="#64b5f6" d="M36,26v1c0,1.657-1.343,3-3,3H23v6h14c2.75,0,5-2.25,5-5v-5H36z"/></svg>
            </div>
        </Tilt>
    </div>
  )
}
export default Logo