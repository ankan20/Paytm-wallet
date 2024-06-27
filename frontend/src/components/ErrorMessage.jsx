import React from 'react'

const ErrorMessage = ({message}) => {
  return (
    <div className='w-full text-red-500'>
      {message}
    </div>
  )
}

export default ErrorMessage
