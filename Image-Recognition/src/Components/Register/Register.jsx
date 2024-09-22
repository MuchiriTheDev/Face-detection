import React, { useEffect, useState } from 'react'

const Register = (props) => {
    const [themail, setTheMail] = useState('');
    const [thePwd , setThePwd] = useState('');
    const [theName, setTheName] = useState('');

    const onEmailSubmit = (event)=>{
        setTheMail(event.target.value);
    }
    const onPasswordSubmit = (event)=> {
        setThePwd(event.target.value);
    }
    const onNameSubmit = (event)=> {
        setTheName(event.target.value);
    }
    const onSumbitregister = () => {
        fetch("http://localhost:3000/register",
          {
            method: "post",
            headers :{"Content-Type": "application/json"},
            body : JSON.stringify({
              email : themail,
              password : thePwd,
              name : theName,
            })
          }
        ).then(resp => resp.json()).then(user => {
            props.checkUser(user)
            props.check('home')
        });
      }

  return (
    <main className="br3 mw7 center shadow-5 pa4 black-80">
        <div className="measure center">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f4 fw6 ph0 mh0">Register</legend>
            <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input 
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 name" 
                    type="name"
                    name="name"
                    id="name"
                    onChange={onNameSubmit}
                />
            </div>
            <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input 
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 email" 
                    type="email" 
                    name="email-address"
                    id="email-address"
                    onChange={onEmailSubmit}
                    required
                />
            </div>
            <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input 
                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                    type="password"
                    name="password" 
                    id="password"
                    onChange={onPasswordSubmit}
                />
            </div>
            </fieldset>
            <div className="">
             <input 
                onClick={onSumbitregister}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                type="submit" 
                value="Register"
             />
            </div>
            <div className="lh-copy mt3">
                <a href="#0" onClick={() => props.check("signing")} className="f6 link dim black pointer db">Sign In</a>
            </div>
        </div>
    </main>
  )
}

export default Register