import { Form, Input, Modal } from "antd";
import React, { useState } from "react";
import { GoPlus } from "react-icons/go";
import { IoArrowBackSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import {
  useCreateFaqMutation,
  useDeleteFaqMutation,
  useGetAllFaqQuery,
} from "../../redux/api/SettingApi";
import { toast } from "sonner";
import { RiDeleteBin5Line } from "react-icons/ri";
const { TextArea } = Input;
const FAQ = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: getAllFaq } = useGetAllFaqQuery();
  const [createFaq] = useCreateFaqMutation();
  const [deleteFaq] = useDeleteFaqMutation();


  // add question and answer modal function
  const handleAddFaq = () => {
    setIsModalOpen(true);
  };

  const handleSubmitFAQ = (values) => {
    console.log(values);
    createFaq(values)
      .unwrap()
      .then((payload) => {
        toast.success(payload?.message);
        setIsModalOpen(false);
      })
      .catch((error) => toast.error(error?.data?.message));
  };

  const handleDeleteFaq = (id) => {
    console.log(id);
    deleteFaq(id)
      .unwrap()
      .then((payload) => toast.success(payload?.message))
      .catch((error) => toast.error(error?.data?.message));
  };
  return (
    <div className="bg-white rounded-md p-5">
      <div className="flex">
        <Link
          to={-1}
          className="py-1 px-2 rounded-md flex justify-start items-center gap-1  "
        >
          <IoArrowBackSharp className="text-[var(--primary-color)]" />
        </Link>{" "}
        <p className="font-semibold text-[18px]">FAQ</p>
      </div>

      {/* all question and answer */}

      <div className="grid grid-cols-2 gap-5 mt-2">
        {Array.isArray(getAllFaq?.data) && getAllFaq?.data?.map((que, i) => (
          <div key={i} className="p-2 ">
            <div className="flex items-center justify-between px-2">
              <p className="pb-3">Question no: {i + 1}</p>
              <p
                className="cursor-pointer"
                onClick={() => handleDeleteFaq(que?._id)}
              >
                <RiDeleteBin5Line color="red" size={20} />
              </p>
            </div>
            <div className="bg-[#F2F2F2] p-2 rounded-md">
              <p>{que?.question}</p>
            </div>
            <p className="py-2">Answer</p>
            <p className="bg-[#F2F2F2] p-2 rounded-md">{que?.answer}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center mt-20">
        <button
          onClick={() => handleAddFaq()}
          className="flex items-center gap-2 bg-[var(--primary-color)] text-white px-10 py-2 rounded-3xl"
        >
          <GoPlus size={20} />
          <span> Add FAQ</span>
        </button>
      </div>

      {/* Modal  */}

      <Modal
        centered
        open={isModalOpen}
        footer={false}
        onCancel={() => setIsModalOpen(false)}
      >
        <p className="text-center font-semibold pb-5 text-xl">Add FAQ</p>
        <Form onFinish={handleSubmitFAQ}>
          <Form.Item name={"question"}>
            <Input placeholder="Type Answer Here.." variant="filled" />
          </Form.Item>
          <Form.Item name={"answer"}>
            <TextArea
              rows={4}
              placeholder="Type question here.."
              variant="filled"
            />
          </Form.Item>
          <div className="flex items-center justify-center mt-2">
            <button className="flex w-full items-center justify-center gap-2 bg-[var(--primary-color)] text-white px-10 py-2 text-xl rounded-3xl">
              {" "}
              Save
            </button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default FAQ;
