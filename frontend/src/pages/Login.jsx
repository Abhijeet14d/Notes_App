import React from 'react'
import Navbar from '../components/Navbar.jsx'
import { Link } from 'react-router-dom'
import Passwordinput from '../components/Passwordinput.jsx'
import { useState } from 'react'
import { validateEmail } from '../utils/helper.js'
import { axiosInstance } from '../utils/axiosInstance.js'
import { useNavigate } from 'react-router-dom'
 
const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if( !validateEmail(email) ){
      setError('Please enter a valid email address')
      return
    } 
    if(!password){
      setError('Please enter a password')
      return
    }
    setError("");

    // login api call
    try {
      const response = await axiosInstance.post('/users/login',{
        email: email,
        password: password
      });
      if(response.data && response.data.token){
        localStorage.setItem('token', response.data.token);
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Invalid email or password');
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  }

  return (
    <>
      <Navbar />
      <div className='flex items-center justify-center mt-30'>
        <div className='w-96 border rounded bg-white px-7 py-10'>
          <form onSubmit={handleLogin}>
            <h4 className='text-2xl mb-7'>Login</h4>
            <input type="text" placeholder='Email'
            className='input-box'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <Passwordinput value={password} onChange={(e)=> setPassword(e.target.value)} />
            {error && <p className='text-red-500 text-sm'>{error}</p>}
            <button className='btn-primary'>Login</button>

            <p className='text-sm text-center mt-4'>Not registered yet? {" "}
              <Link to="/signup" className='font-medium text-primary underline'>
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login