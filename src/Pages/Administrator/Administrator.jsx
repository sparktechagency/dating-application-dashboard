import {
  Form,
  Input,
  Modal,
  Pagination,
  Radio,
  Table,
} from "antd";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import {
  useCreateAdministratorMutation,
  useDeleteAdministrationMutation,
  useGetAllAdministratorQuery,
  useUpdateAdministratorMutation,
} from "../../redux/api/administratorApi";
import { place } from "../../redux/api/baseApi";
import { toast } from "sonner";
const Administrator = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const { data: getAllAdministrator } = useGetAllAdministratorQuery({ 
    page,
    search,
  });
  const [createAdministrator] = useCreateAdministratorMutation();
  const [deleteAdmin] = useDeleteAdministrationMutation();
  const [updateAdministrator] = useUpdateAdministratorMutation();
  const [singleAdmin, setSingleAdmin] = useState({}); 

  const options = [
    "All",
    "Dashboard",
    "User Management",
    "Podcast Management",
    "Subscriptions",
    "Support",
    "Settings",
  ];
  const values = [
    "ALL",
    "DASHBOARD",
    "USER_MANAGEMENT",
    "PODCAST_MANAGEMENT",
    "SUBSCRIPTIONS",
    "SUPPORT",
    "SETTINGS",
  ];

  useEffect(() => {
    const data = {
      name: singleAdmin?.name,
      email: singleAdmin?.email,
      contact: singleAdmin?.contact,
      access: singleAdmin?.access,
    };
    form.setFieldsValue(data);
  }, [singleAdmin, form]);

  const columns = [
    {
      title: "SL No",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => {
        return (
          <div className="flex gap-2 items-center">
            {/* {
              !!record?.img ? (
                <img
                  className="w-12 h-12 rounded-lg"
                  src={`${imageUrl}/${record?.img}` || `${imageUrl}${record?.img}`}
                  alt=""
                />
              ) : (
                <img className="w-12 h-12" src={place} />
              )
            } */}
            <p>{record?.name}</p>
          </div>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Contact Number",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Has Access to",
      dataIndex: "access",
      key: "access",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2 items-center">
          <button
            onClick={() => {
              setOpenEditModal(true);
              setSingleAdmin(record);
            }}
            className="bg-[#2757A6] text-white p-2 rounded-md"
          >
            <MdOutlineEdit size={22} />
          </button>
          <button
            onClick={() => handleDeleteAdministrator(record?.id)}
            className="bg-[#DC4600] text-white p-2 rounded-md"
          >
            <RiDeleteBinLine size={25} />
          </button>
        </div>
      ),
    },
  ];


  const formattedTableDate = Array.isArray(getAllAdministrator?.data?.admins) && getAllAdministrator?.data?.admins?.map(
    (admin, i) => {
      // console.log(admin);
      return {
        id: admin?._id,
        key: i + 1,
        name: admin?.name,
        email: admin?.email,
        img: admin?.avatar ? admin?.avatar : place,
        contact: admin?.contact,
        access: admin?.access,
      };
    }
  );

  const handleSubmitAdministrator = (value) => {
    console.log(value);
    createAdministrator(value)
      .unwrap()
      .then((payload) => {
        toast.success(payload?.message);
        setOpenModal(false);
      })
      .catch((error) => {
        if (error?.data?.message?.includes("E11000")) {
          toast.error("This email is already registered.");
        } else {
          toast.error(error?.data?.message);
        }
      });
  };

  const handleDeleteAdministrator = (id) => {
    deleteAdmin(id)
      .unwrap()
      .then((payload) => {
        (payload?.message)
      })
      .catch((error) => toast.error(error?.data?.message));
  };

  const handleEditAdministrator = (values) => {
    const data = {
      ...values,
    };
    const id = singleAdmin?.id;
    updateAdministrator({ id, data })
      .unwrap()
      .then((payload) => {
        toast.success(payload?.message)
        setOpenEditModal(false)
      })
      .catch((error) => {
        if (error?.data?.message?.includes("E11000")) {
          toast.error("This email is already registered.");
        } else {
          toast.error(error?.data?.message);
        }
      });
  };

  return (
    <div className="p-4 bg-white rounded-md">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2 items-center">
          <Link to={-1}>
            <FaArrowLeft size={18} className="text-[var(--primary-color)] " />
          </Link>
          <span className="font-semibold text-[20px]">Administrator</span>
        </div>
        <div className="sm:w-[280px]">
          <div className="relative">
            <input
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              type="text"
              placeholder="Search here..."
              className="w-full pl-10 pr-4 py-1 rounded-md border border-[#FFA175] focus:border-[#FFA175] focus:outline-none "
            />
            <span className="absolute left-3 top-2.5 text-gray-400">
              <CiSearch className="text-[#FFA175]" />
            </span>
          </div>
        </div>
      </div>
      <button
        onClick={() => setOpenModal(true)}
        className="flex  items-center gap-2 bg-[#FFA175] text-white px-4 py-1 rounded mt-5"
      >
        {" "}
        <FiPlus /> New
      </button>

      <div className="mt-5">
        <Table
          columns={columns}
          dataSource={formattedTableDate}
          pagination={false}
          className="custom-pagination"
          scroll={{ x: 900 }}
          size="small"
        />
        <div className="flex justify-center items-center">
          <Pagination
            current={page}
            total={getAllAdministrator?.data?.pagination?.totalAdmins}
            pageSize={10}
            onChange={(page) => setPage(page)}
          />
        </div>
      </div>
      <Modal
        centered
        footer={false}
        open={openModal}
        onCancel={() => {
          setOpenModal(false);
          form.resetFields();
        }}
      >
        <p className="mb-5 text-xl font-medium text-center"> New</p>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmitAdministrator}
        >
          <Form.Item name="name" label={<p className="">Name</p>}>
            <Input className="py-1 border-[#FFA175] hover:border-[#FFA175]" />
          </Form.Item>
          <Form.Item name="email" label={<p className="">Email</p>}>
            <Input className="py-1 border-[#FFA175] hover:border-[#FFA175]" />
          </Form.Item>
          <Form.Item name="contact" label={<p className="">Contact Number</p>}>
            <Input className="py-1 border-[#FFA175] hover:border-[#FFA175]" />
          </Form.Item>
          <Form.Item name="password" label={<p className="">Password</p>}>
            <Input.Password className="py-1 border-[#FFA175] hover:border-[#FFA175]" />
          </Form.Item>

          <div className="mx-auto max-w-md">
            <h3 className="mb-2 text-lg font-semibold">Give Access To</h3>
            <Form.Item
              name="access"
              rules={[{ required: true, message: "Please select one option!" }]}
            >
              <Radio.Group className="flex flex-col gap-2">
                {options.map((option, index) => (
                  <Radio key={values[index]} value={values[index]}>
                    {option}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
          </div>
          <button className="bg-[#FFA175] w-full mt-2 rounded-sm text-white py-2">
            Save
          </button>
        </Form>
      </Modal>

      <Modal
        centered
        footer={false}
        open={openEditModal}
        onCancel={() => {
          setOpenEditModal(false);
          form.resetFields();
        }}
      >
        <p className="mb-5 text-xl font-medium text-center">Edit</p>

        <Form form={form} layout="vertical" onFinish={handleEditAdministrator}>
          <Form.Item name="name" label={<p className="">Name</p>}>
            <Input className="py-1 border-[#FFA175] hover:border-[#FFA175]" />
          </Form.Item>
          <Form.Item name="email" label={<p className="">Email</p>}>
            <Input className="py-1 border-[#FFA175] hover:border-[#FFA175]" />
          </Form.Item>
          <Form.Item name="contact" label={<p className="">Contact Number</p>}>
            <Input className="py-1 border-[#FFA175] hover:border-[#FFA175]" />
          </Form.Item>

          <div className="mx-auto max-w-md">
            <h3 className="mb-2 text-lg font-semibold">Give Access To</h3>
            <Form.Item
              name="access"
              rules={[{ required: true, message: "Please select one option!" }]}
            >
              <Radio.Group className="flex flex-col gap-2">
                {options.map((option, index) => (
                  <Radio key={values[index]} value={values[index]}>
                    {option}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
          </div>
          <button className="bg-[#FFA175] w-full mt-2 rounded-sm text-white py-2">
            Save
          </button>
        </Form>
      </Modal>
    </div>
  );
};

export default Administrator;
