import { Form, Input, Modal } from 'antd'
import React from 'react'
import { FaRegCalendarAlt } from 'react-icons/fa'

const ScheduleModal = ({ openScheduleModal, setScheduleModal }) => {
  return (
    <div>
      <Modal open={openScheduleModal} centered footer={false} onCancel={() => setScheduleModal(false)} >
        <p className='text-center text-xl font-semibold mb-5'>Set Schedule</p>
        <Form
        layout='vertical'
        >
          <Form.Item
            name="Schedule Date & Time" label={<p className='text-xl'>Schedule Date & Time</p>}
          >
            <Input className='py-2 border-[#FFA175] hover:border-[#FFA175]' suffix={
              <FaRegCalendarAlt className='text-[#FFA175] cursor-pointer' />
            }  />
          </Form.Item>
          <div className='flex justify-center items-center gap-2 w-full'>
            <button className='border border-[#FFA175] text-[#FFA175] w-full rounded-sm py-1 text-[20px]'>Cancel</button>
            <button  className='w-full bg-[#FFA175] py-[5px] text-[18px] text-white rounded-sm'>Confirm</button>
          </div>
        </Form>
      </Modal>
    </div>
  )
}

export default ScheduleModal