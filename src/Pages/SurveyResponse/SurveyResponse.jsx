import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const SurveyResponse = () => {
  return (
    <div className='bg-white rounded-md p-4'>

      <div className='flex items-center gap-2'>
        <Link to={-1}><FaArrowLeft className='text-[#FFA175]' /></Link>
        <p>Survey Response</p>
      </div>
      
    </div>
  )
}

export default SurveyResponse