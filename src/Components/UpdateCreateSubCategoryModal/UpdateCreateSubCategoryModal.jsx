import { Form, Input, Modal } from 'antd'
import React from 'react'

const UpdateCreateSubCategoryModal = ({openSubCategory, setOpenSunCategory , title}) => {
  return (
    <Modal open={openSubCategory} onCancel={() => setOpenSunCategory(false)} footer={false} centered >
    <p className='text-center text-xl font-medium'>{title}</p>
    <Form layout='vertical'>
      <Form.Item label="Category Name">
        <Input placeholder="Enter Category" />
      </Form.Item>
      <Form.Item label="Subcategory Name">
        <Input placeholder="Enter Subcategory" />
      </Form.Item>
      <Form.Item className='flex justify-center'>
        <button className='bg-[#020123] text-white  px-5 py-2 rounded-md'>Save</button>
      </Form.Item>
    </Form>
  </Modal>
  )
}

export default UpdateCreateSubCategoryModal