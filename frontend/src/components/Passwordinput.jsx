import React from 'react'
import { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'

const Passwordinput = ({ value, onChange, placeholder }) => {
    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }
  return (
    <div className='flex item-center bg-transparent border-[1.5px] px-5 rounded mb-3'>
        <input
            value={value}
            onChange={onChange}
            type={showPassword ? 'text' : 'password'}
            placeholder={placeholder || 'Password'} 
            className='w-full text-sm bg-transparent rounded outline-none'
         />

         {showPassword ? <FaRegEye
            size={22}
            className='text-primary cursor-pointer'
            onClick={() => togglePasswordVisibility()}
          /> :
          <FaRegEyeSlash
            size={22}
            className='text-slate-400 cursor-pointer'
            onClick={() => togglePasswordVisibility()}
          />
         }
    </div>
  )
}

export default Passwordinput