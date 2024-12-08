import React, { useState } from 'react'
import Tab from '../../Components/Tab/Tab'
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaEdit, FaPlus } from 'react-icons/fa';
import { CiSearch } from 'react-icons/ci';
import { Table } from 'antd';
import UpdateAndEditModal from '../UpdateAndEditModal/UpdateAndEditModal';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MdOutlineEdit } from 'react-icons/md';
import UpdateCreateSubCategoryModal from '../UpdateCreateSubCategoryModal/UpdateCreateSubCategoryModal';


const Category = () => {
  const [tab, setTab] = useState(true)
  const [openModal, setOpenModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false)
  const [openSubCategory, setOpenSunCategory] = useState(false)
  const [openEditSubCategory, setOpenEditSunCategory] = useState(false)

  const columns = [
    {
      title: "Sl No.", dataIndex: 'id', key: 'id',
    },
    {
      title: "Category", dataIndex: "category", key: 'category'
    },
    {
      title: <div className='flex justify-center'>Action</div>,
      dataIndex: 'action',
      key: 'action',
      render: (_, render) =>
        <div className='flex gap-2 justify-center'>
          <button onClick={() => setOpenUpdateModal(true)} className='bg-[#020123] text-white p-2 rounded-md'><MdOutlineEdit size={25} /></button>
          <button className='bg-red-600 text-white p-2 rounded-md'><RiDeleteBin6Line size={25} /></button>
        </div>

    }
  ]
  const SubColumns = [
    {
      title: "Sl No.", dataIndex: 'id', key: 'id',
    },
    {
      title: "Category", dataIndex: "category", key: 'category'
    },
    {
      title: "Sub Category", dataIndex: "subCategory", key: 'subCategory'
    },
    {
      title: <div className='flex justify-center'>Action</div>,
      dataIndex: 'action',
      key: 'action',
      render: (_, render) =>
        <div className='flex gap-2 justify-center'>
          <button onClick={() => setOpenEditSunCategory(true)} className='bg-[#020123] text-white p-2 rounded-md'><MdOutlineEdit size={25} /></button>
          <button className='bg-red-600 text-white p-2 rounded-md'><RiDeleteBin6Line size={25} /></button>
        </div>

    }
  ]
  const dataSource = [
    {
      id: '1',
      category: 'Corporate Event'
    }
  ]
  const subDataSource = [
    {
      id: '1',
      category: 'Corporate Event', subCategory: "Corporate Event"
    }
  ]

  return (
    <div className='bg-white rounded-md p-4'>

      <div className="flex justify-between item-center pb-8">
        <div className="flex items-center gap-2">
          <Link to={-1}><FaArrowLeft size={18} className='text-[var(--primary-color)] ' /></Link>
          <span className=' text-[20px]'>Bartender Information</span></div>
        <div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search here..."
              className="w-full pl-10 pr-4 py-1 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 "
            />
            <span className="absolute left-3 top-2.5 text-gray-400">

              <CiSearch />
            </span>
          </div>
        </div>
      </div>
      <div className='flex items-center justify-between'>
        <Tab req={'Category'} info={'Sub category'} setTab={setTab} tab={tab} />
        {
          tab ? <button onClick={() => setOpenModal(true)} className='flex  items-center gap-2 bg-[#020123] text-white rounded-full px-8 py-2 '><FaPlus />Add</button> : <button onClick={() => setOpenSunCategory(true)} className='flex  items-center gap-2 bg-[#020123] text-white rounded-full px-8 py-2 '><FaPlus />Add Sub Category</button>
        }
      </div>
      <div className='mt-10'>
        {
          tab ? <div>
            <p className='text-2xl mb-5'>Show All Bartender Request</p>
          </div> : <div>
            <p className='text-2xl mb-5'>All Bartender Information</p>
          </div>
        }
      </div>

      <div>
        {
          tab ? <Table columns={columns} dataSource={dataSource} /> : <Table columns={SubColumns} dataSource={subDataSource} />
        }
      </div>

      <UpdateAndEditModal openModal={openUpdateModal} setOpenModal={setOpenUpdateModal} title={'Update Category'} />
      <UpdateAndEditModal openModal={openModal} setOpenModal={setOpenModal} title={'Add Category'} />
      <UpdateCreateSubCategoryModal openSubCategory={openSubCategory} setOpenSunCategory={setOpenSunCategory} title={"Add Subcategory"} />
      <UpdateCreateSubCategoryModal openSubCategory={openEditSubCategory} setOpenSunCategory={setOpenEditSunCategory} title={"Edit Subcategory"} />

    </div>
  );
}

export default Category;
