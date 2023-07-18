import {React,useState} from 'react'
import { useNavigate} from 'react-router-dom'

const Signup = (props) => {
  const history = useNavigate()
  const [credentials, setCredentials] = useState({name:"", email: "", password: "" ,cpassword:""})

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhOTM2ZWZmYzBjMzVjZTIyMzIyNzdmIn0sImlhdCI6MTY4ODgxNzU0Mn0.3AwNxNtzOERB9LMz86GlQy0gm9hftYe0zPmdMnK7zrc"
      },
      body: JSON.stringify({name:credentials.name, email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    console.log(json)

    if (json.success) {
      localStorage.setItem('token', json.authtoken)
      history('/login')
      props.showAlert("created user successfully",'success')
    }
    else {
      props.showAlert("signup failed",'danger')
    }
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <>
      <div className="contsiner">
        <form onSubmit={handleSubmit} >
          <div className="mb-3 my-3" >
            <label htmlFor="name"  className="form-label">Name</label>
            <input type="name" className="form-control" value={credentials.name} name='name' onChange={onChange} id="name" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3 my-3" >
            <label htmlFor="emial"  className="form-label">Email address</label>
            <input type="email" className="form-control" value={credentials.email} name='email' onChange={onChange} id="email" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputpassword1" className="form-label" >password</label>
            <input type="password" name='password' value={credentials.password} onChange={onChange} className="form-control" id="password" autoComplete="on" minLength={5} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputpassword1" className="form-label" >confirm password</label>
            <input type="cpassword" name='cpassword' value={credentials.cpassword} onChange={onChange} className="form-control" id="cpassword" autoComplete="on" />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </>
  )
}

export default Signup