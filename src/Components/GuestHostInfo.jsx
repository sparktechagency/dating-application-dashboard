import { Form, Input, Modal, Radio, Select, Table } from "antd";
import React, { useState } from "react";
import { MdBlock, MdOutlineMessage } from "react-icons/md";
import { RiBarChartFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { imageUrl, place } from "../redux/api/baseApi";
import {
  useBlockUnblockUserMutation,
  useSendMessageMutation,
} from "../redux/api/userManagement";
import { toast } from "sonner";
const { TextArea } = Input;
const GuestHostInfo = ({ dataSource }) => {
  const [openModal, setOpenModal] = useState(false);
  const [userId, setUserId] = useState("");
  // ALL APIs
  const [sendMessage] = useSendMessageMutation();
  const [blockUnblockUser] = useBlockUnblockUserMutation();


  const [form] = Form.useForm();

  const columns = [
    {
      title: "SL no",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Full Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => {
        return (
          <div className="flex items-center gap-2">
            {!!record?.img ? (
              <img
                src={`${imageUrl}${record?.img}`}
                className="w-[40px] h-[40px] rounded-md"
                alt=""
              />
            ) : (
              <img
                src={place}
                className="w-[40px] h-[40px] rounded-md"
                alt=""
              />
            )}
            <p className="font-medium">{record?.name}</p>
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
      title: "Phone Number",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    // {
    //   title: 'Ethnicity',
    //   dataSource: "ethnicity",
    //   key: "ethnicity",
    //   render: (_, record) => {
    //     return (
    //       <p>{record?.ethnicity}</p>
    //     )
    //   }
    // },
    {
      title: 'Body Type',
      dataSource: "bodyType",
      key: "bodyType",
      render: (_, record) => {
        return (
          <p>{record?.bodyType}</p>
        )
      }
    },
    {
      title: "City",
      dataIndex: "address",
      key: "address",
    },

    {
      title: <p className="flex justify-center">Survey Response</p>,
      dataIndex: "survey",
      key: "survey",
      render: (_, record) => (
        <div className="flex justify-center">
          <Link
            to={`/survey-response/${record?.id}`}
            className="bg-[#2757A6] inline-block text-white p-1 rounded-sm "
          >
            <RiBarChartFill size={22} />
          </Link>
        </div>
      ),
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      render: (_, record) => (
        <div
          onClick={() => {
            setOpenModal(true);
            setUserId(record?.id);
          }}
          className="bg-[#FFA175] cursor-pointer inline-block text-white p-1 rounded-sm "
        >
          <MdOutlineMessage size={22} />
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",

      render: (_, record) => {
        return (
          <div className="flex items-center justify-center gap-1">
            <button
              onClick={() => {
                blockUnblockUser(record?.authId)
                  .unwrap()
                  .then((payload) => toast.success(payload?.message))
                  .catch((error) => toast.error(error?.data?.message));
              }}
              className={` text-white p-2 rounded-md  ${record?.isBlocked ? "bg-gray-400" : "bg-red-600"}`}
            >
              <MdBlock size={20} />
            </button>
          </div>
        );
      },
      align: "center",
    },
  ];

  // Handle toggle send message status

  const handleSendMessage = (values) => {
    const data = {
      message: values?.message,
      medium: [values?.send],
    };
    if (values?.sendTo === "allUser") {
      data.isAll = true;
    } else {
      data.isAll = false;
      data.userId = userId;
    }

    sendMessage(data)
      .unwrap()
      .then((payload) => {
        toast.success(payload?.message);
        setOpenModal(false);
        form.resetFields();
      })
      .catch((error) => toast.error(error?.data?.message));
  };

  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        className="custom-pagination"
        pagination={false}
      />
      <Modal
        centered
        footer={false}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        form={form}
      >
        <p className="text-xl font-medium text-center pb-8">Message</p>
        <Form layout="vertical" onFinish={handleSendMessage}>
          <Form.Item label="Send To" name={"sendTo"}>
            <Select
              placeholder="Please select"
              name="sendTo"
              defaultValue={"OnlyToUser"}
              style={{
                width: "100%",
              }}
              options={[
                { value: "OnlyToUser", label: "Only to user" },
                { value: "allUser", label: "all user" },
              ]}
            />
          </Form.Item>
          <Form.Item name={"message"} label="Message">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item name={"send"} label="Send : ">
            <Radio.Group>
              <Radio value={"Notification"}>Notification</Radio>
              <Radio value={"Email"}>Email</Radio>
            </Radio.Group>
          </Form.Item>
          <div className="flex items-center gap-4 justify-center">
            <button
              onClick={() => {
                setOpenModal(false);
                form.resetFields();
              }}
              type="button"
              className="border border-[#FFE2D4] px-5 py-2 text-[#FFA175] rounded-sm w-full"
            >
              cancel
            </button>
            <button className="bg-[#FFA175] px-5 py-2 text-white rounded-sm w-full">
              Send
            </button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default GuestHostInfo;
