import { Radio, Typography } from 'antd'
import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import { useGetSurveyQuery } from '../../redux/api/userManagement'

const SurveyResponse = () => {
  const { Title } = Typography;
  const {id} =  useParams();
  const {data : getSurvey, isLoading} = useGetSurveyQuery(id)

  if(isLoading) return <p>Loading...</p>

  if(!getSurvey?.data) {
    return (
      <div className='bg-white rounded-md p-4'>
        <div className='flex items-center gap-2'>
          <Link to={-1}><FaArrowLeft className='text-[#FFA175]' /></Link>
          <p className='text-xl font-semibold'>Survey Response</p>
        </div>
        <div className="p-4 max-w-5xl mx-auto text-center">
          <Title level={4}>User has not provided any survey feedback.</Title>
        </div>
      </div>
    )
  }
  // console.log(getSurvey?.data);

  return (
    <div className='bg-white rounded-md p-4'>

      <div className='flex items-center gap-2'>
        <Link to={-1}><FaArrowLeft className='text-[#FFA175]' /></Link>
        <p className='text-xl font-semibold'>Survey Response</p>
      </div>
      <div className="p-4 max-w-5xl">
        {getSurvey?.data?.responses?.map((response, index) => (
          <div key={response._id || index} className="mb-4">
            <p className="font-semibold text-lg">{index + 1}. {response.question}</p>
            <div className="pl-4 mt-2">
              <p className="border-l-4 border-[#FFA175] pl-4 italic text-gray-700">{response.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SurveyResponse