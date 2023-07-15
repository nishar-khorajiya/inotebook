import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

const Login = (props) => {

    const history=useNavigate()
    const [credentials,setCredentials]=useState({email:"",password:""})

    const handleSubmit = async(e) => {
        e.preventDefault()
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhOTM2ZWZmYzBjMzVjZTIyMzIyNzdmIn0sImlhdCI6MTY4ODgxNzU0Mn0.3AwNxNtzOERB9LMz86GlQy0gm9hftYe0zPmdMnK7zrc"
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password})
        });
        const json=await response.json();
        console.log(json)

        if(json.success){
            localStorage.setItem('token',json.authtoken)
            history('/')
            props.showAlert("Login successfully",'success')
        }
        else{
            props.showAlert("Login failed",'danger')
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <>
            <form onSubmit={handleSubmit} >
                <div className="mb-3 my-3" >
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} name='email' onChange={onChange} id="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputpassword1" className="form-label" >password</label>
                    <input type="password" name='password' value={credentials.password} onChange={onChange} className="form-control" id="password" autoComplete="on"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default Login