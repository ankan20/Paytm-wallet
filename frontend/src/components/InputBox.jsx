import React from 'react'

const InputBox = ({label,placeholder}) => {
  return (
    <div>
      <div className='text-sm font-medium text-left py-2'>
        {label}
      </div>
      <input type="text"  placeholder={placeholder} className='w-full  px- py-1 border'/>
    </div>
  )
}

export default InputBox
