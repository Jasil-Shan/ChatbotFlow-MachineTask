import React from 'react'
import SaveButton from './SaveButton/SaveButton'

const Navbar = () => {
  return (
    <div className='flex h-full bg-gray-300 p-1 rounded-md justify-end'>
        <SaveButton />
    </div>
  )
}

export default Navbar