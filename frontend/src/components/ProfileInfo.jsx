import React from 'react'
import { getInitials } from '../utils/helper'

const ProfileInfo = ({ userinfo, onLogout }) => {

  if (!userinfo) {
    return null; // or a loading spinner
  }
  
  return (
    <div className='flex items-center gap-4'>
        <div className='w-12 h-12 flex item-center justify-center rounded-full test-state-900 font-medium bg-state-100'>
            {getInitials(userinfo.name)}
        </div>
        <div>
            <p className='text-sm font-medium'>{userinfo.name}</p>
            <button
                className='text-sm text-slate-700 underline'
                onClick={onLogout}
            >Logout</button>
        </div>
    </div>
  )
}

export default ProfileInfo