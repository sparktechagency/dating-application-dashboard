import { Radio, Typography } from 'antd'
import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import { useGetSurveyQuery } from '../../redux/api/userManagement'

const SurveyResponse = () => {
  const { Title } = Typography;
  const {id} =  useParams();
  const {data : getSurvey} = useGetSurveyQuery(id)
  console.log(getSurvey?.data);

  return (
    <div className='bg-white rounded-md p-4'>

      <div className='flex items-center gap-2'>
        <Link to={-1}><FaArrowLeft className='text-[#FFA175]' /></Link>
        <p>Survey Response</p>
      </div>
      <div className="p-4 max-w-5xl mx-auto">
        {/* Section 1: Overall Connection */}
        <Title level={5}>1. Overall Connection</Title>

        {/* Question 1: Overall Connection Rating */}
        <div className="mb-4">
          <p>How would you rate your overall connection with your date?</p>
          <Radio.Group className='flex flex-col'value={getSurvey?.data?.first} >
            <Radio value={0}>01 (No connection at all)</Radio>
            <Radio value={1}>2</Radio>
            <Radio value={2}>3</Radio>
            <Radio value={3}>4</Radio>
            <Radio value={4}>5 (Strong connection)</Radio>
          </Radio.Group>
        </div>

        {/* Question 2: Comfort Level */}
        <div className="mb-4">
          <p>Did you feel comfortable with your match during the date?</p>
          <Radio.Group value={getSurvey?.data?.second} className='flex flex-col' >
            <Radio value={0}>Yes</Radio>
            <Radio value={1}>Somewhat</Radio>
            <Radio value={2}>No</Radio>
          </Radio.Group>
        </div>

        {/* Question 3: Additional Feedback */}
        <div className="mb-4">
          <p>Please describe what stood out to you about your match (positive or negative):</p>
          <textarea
            value={getSurvey?.data?.third}
            readOnly
            className="w-full p-2 border rounded border-[#FFA175]"
            rows="4"
          />
        </div>

        {/* Section 2: Chemistry and Compatibility */}
        <Title level={5}>2. Chemistry and Compatibility</Title>

        {/* Question 4: Chemistry Rating */}
        <div className="mb-4">
          <p>How would you rate the chemistry you felt with your match?</p>
          <Radio.Group className='flex flex-col' value={getSurvey?.data?.fourth} >
            <Radio value={0}>01 (No chemistry)</Radio>
            <Radio value={1}>2</Radio>
            <Radio value={2}>3</Radio>
            <Radio value={3}>4</Radio>
            <Radio value={4}>5 (Strong chemistry)</Radio>
          </Radio.Group>
        </div>
        {/* Question 2: Comfort Level */}
        <div className="mb-4">
          <p>Do you feel that the AI matchmaking captured your preferences accurately?</p>
          <Radio.Group className='flex flex-col' value={getSurvey?.data?.fifth}  >
            <Radio value={0}>Yes</Radio>
            <Radio value={1}>Somewhat</Radio>
            <Radio value={2}>No</Radio>
          </Radio.Group>
        </div>
        {/* Question 2: Comfort Level */}
        <div className="mb-4">
          <p>Did you and your match share similar values, interests, or relationship goals? </p>
          <Radio.Group className='flex flex-col' value={getSurvey?.data?.six} >
            <Radio value={0}>Yes</Radio>
            <Radio value={1}>Somewhat</Radio>
            <Radio value={2}>No</Radio>
          </Radio.Group>
        </div>
        {/* Question 3: Additional Feedback */}
        <div className="mb-4">
          <p>In your opinion, what factors influenced the level of chemistry you experienced?</p>
          <textarea
          value={getSurvey?.data?.seven}
            className="w-full p-2 border rounded border-[#FFA175]"
            rows="4"
          />
        </div>


        {/* Question section 3 */}

        {/* Section 2: Chemistry and Compatibility */}
        <Title level={5}>3. Communication and Comfort</Title>

        {/* Question 4: Chemistry Rating */}
        <div className="mb-4">
          <p>How would you rate the quality of communication during the date? </p>
          <Radio.Group className='flex flex-col' value={getSurvey?.data?.eight} >
            <Radio value={0}>01 (No chemistry)</Radio>
            <Radio value={1}>2</Radio>
            <Radio value={2}>3</Radio>
            <Radio value={3}>4</Radio>
            <Radio value={4}>5 (Strong chemistry)</Radio>
          </Radio.Group>
        </div>
        {/* Question 2: Comfort Level */}
        <div className="mb-4">
          <p>Did you feel comfortable being yourself during the date? *</p>
          <Radio.Group className='flex flex-col'value={getSurvey?.data?.nine} >
            <Radio value={0}>Yes</Radio>
            <Radio value={1}>Somewhat</Radio>
            <Radio value={2}>No</Radio>
          </Radio.Group>
        </div>
        {/* Question 2: Comfort Level */}
        
        {/* Question 3: Additional Feedback */}
        <div className="mb-4">
          <p>Were there any awkward or uncomfortable moments? If so, please describe. *</p>
          <textarea 
            value={getSurvey?.data?.ten}
            readOnly
            className="w-full p-2 border rounded border-[#FFA175]"
            rows="4"
          />
        </div>



        {/* Question section 4 */}

        {/* Section 2: Chemistry and Compatibility */}
        <Title level={5}>4. Date Satisfaction</Title>

        {/* Question 4: Chemistry Rating */}
        <div className="mb-4">
          <p>How satisfied were you with the overall experience?  </p>
          <Radio.Group className='flex flex-col' value={getSurvey?.data?.eleven} >
            <Radio value={0}>01 (No chemistry)</Radio>
            <Radio value={1}>2</Radio>
            <Radio value={2}>3</Radio>
            <Radio value={3}>4</Radio>
            <Radio value={4}>5 (Strong chemistry)</Radio>
          </Radio.Group>
        </div>
        {/* Question 2: Comfort Level */}
        <div className="mb-4">
          <p>Would you be interested in seeing your match again? </p>
          <Radio.Group className='flex flex-col' value={getSurvey?.data?.twelve} >
            <Radio value={0}>Yes</Radio>
            <Radio value={1}>Somewhat</Radio>
            <Radio value={2}>No</Radio>
          </Radio.Group>
        </div>
      
        {/* Question 3: Additional Feedback */}
        <div className="mb-4">
          <p>If not, can you share what led to this decision?</p>
          <textarea 
             value={getSurvey?.data?.thirteen}
            readOnly
            className="w-full p-2 border rounded border-[#FFA175]"
            rows="4"
          />
        </div>


        {/* Question section 5 */}

        {/* Section 2: Chemistry and Compatibility */}
        <Title level={5}>5. App Experience</Title>

        {/* Question 4: Chemistry Rating */}
        <div className="mb-4">
          <p>How would you rate the ease of use of the PodLove app in coordinating this date? </p>
          <Radio.Group className='flex flex-col'  value={getSurvey?.data?.fourteen} >
            <Radio value={1}>01 (No chemistry)</Radio>
            <Radio value={2}>2</Radio>
            <Radio value={3}>3</Radio>
            <Radio value={4}>4</Radio>
            <Radio value={5}>5 (Strong chemistry)</Radio>
          </Radio.Group>
        </div>
        {/* Question 2: Comfort Level */}
        <div className="mb-4">
          <p>Did you encounter any issues with scheduling or communicating through the app? </p>
          <Radio.Group className='flex flex-col' value={getSurvey?.data?.fifteen} >
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </div>
      
        {/* Question 3: Additional Feedback */}
        <div className="mb-4">
          <p>If yes, please describe the issue you experienced.</p>
          <textarea 
            value={getSurvey?.data?.sixteen}
            readOnly
            className="w-full p-2 border rounded border-[#FFA175]"
            rows="4"
          />
        </div>
        {/* Question section 6 */}

        <Title level={5}>6. Future Improvements</Title>

      
        
      
        <div className="mb-4">
          <p>Do you have any suggestions for improving the matching process or date experience? *</p>
          <textarea 
            value={getSurvey?.data?.seventeen}
            readOnly
            className="w-full p-2 border rounded border-[#FFA175]"
            rows="4"
          />
        </div>
      
        <div className="mb-4">
          <p>How can we make future dates more comfortable and enjoyable for you?</p>
          <textarea 
            value={getSurvey?.data?.eighteen}
            readOnly
            className="w-full p-2 border rounded border-[#FFA175]"
            rows="4"
          />
        </div>
        {/* Question section 7 */}

        <Title level={5}>7. Optional Additional Feedback</Title>

      
      
        <div className="mb-4">
          <p>How can we make future dates more comfortable and enjoyable for you?</p>
          <textarea 
            value={getSurvey?.data?.nineteen}
            readOnly
            className="w-full p-2 border rounded border-[#FFA175]"
            rows="4"
          />
        </div>

      </div>
    </div>
  )
}

export default SurveyResponse