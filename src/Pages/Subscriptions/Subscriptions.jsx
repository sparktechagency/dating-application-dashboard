import { Form, Input, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  useGetAllSubscriptionQuery,
  useUpdateSubscriptionPlanMutation,
} from "../../redux/api/subscriptionApi";
import TextArea from "antd/es/input/TextArea";
import { toast } from "sonner";

const Subscriptions = () => {
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [description, setDescription] = useState("");
  const [openDescriptionModal, setOpenDescriptionModal] = useState(false);
  const [singlePlan, setSinglePlan] = useState();
  const { data: getAllSubscription } = useGetAllSubscriptionQuery();
  const [updatePlan] = useUpdateSubscriptionPlanMutation();

  const formattedData = getAllSubscription?.data?.map((sub, i) => {
    return {
      id: sub?._id,
      key: i + 1,
      name: sub?.name,
      fee: `${sub?.unitAmount}`,
      description: sub?.description,
      action: "Edit",
    };
  });

  const columns = [
    {
      title: "SL no.",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Subscription Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Subscription Fee",
      dataIndex: "fee",
      key: "fee",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (_, record) => (
        <div>
          <p
            onClick={() => {
              setDescription(record?.description);
              setOpenDescriptionModal(true);
            }}
            className="text-[#FFA175] cursor-pointer"
          >
            View
          </p>
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <div>
          <p
            onClick={() => {
              setOpenModal(true);
              setSinglePlan(record);
            }}
            className="text-[#FFA175] cursor-pointer"
          >
            {record?.action}
          </p>
        </div>
      ),
    },
  ];

  //  handle update plan
  const handleUpdatePlan = (values) => {
    updatePlan({ id: singlePlan?.id, data: values })
      .unwrap()
      .then((payload) => {
        toast.success(payload?.message)
        setOpenModal(false)
      })
      .catch((error) => toast.error(error?.data?.message));
  };

  useEffect(() => {
    const data = {
      name: singlePlan?.name,
      unitAmount: singlePlan?.fee,
      description: singlePlan?.description,
    };
    form.setFieldsValue(data);
  }, [singlePlan]);

  return (
    <div className="bg-white rounded-md p-4">
      <div className="flex items-center gap-2">
        <Link to={-1}>
          <FaArrowLeft size={18} className="text-[var(--primary-color)] " />
        </Link>
        <span className="font-semibold text-[20px]"> Subscriptions</span>
      </div>

      <div>
        <Table
          columns={columns}
          dataSource={formattedData}
          pagination={false}
        />
      </div>
      <Modal
        centered
        footer={false}
        open={openModal}
        onCancel={() => setOpenModal(false)}
      >
        <p className="text-center text-xl font-semibold mb-5">Edit</p>
        <Form layout="vertical" onFinish={handleUpdatePlan} form={form}>
          <Form.Item
            name={"name"}
            label={<p className="text-[18px]">Subscription Name</p>}
          >
            <Input className="border border-[#FFA175] hover:border-[#FFA175] py-2 rounded-sm" />
          </Form.Item>
          <Form.Item
            name={"unitAmount"}
            label={<p className="text-[18px]">Subscription Fee</p>}
          >
            <Input className="border border-[#FFA175] hover:border-[#FFA175] py-2 rounded-sm" />
          </Form.Item>
          <Form.Item
            name={"description"}
            label={<p className="text-[18px]">Description</p>}
          >
            <TextArea className="border border-[#FFA175] hover:border-[#FFA175] py-2 rounded-sm" />
          </Form.Item>
          <div className="flex justify-center items-center gap-2 w-full">
            <button type="button"  onClick={()=> setOpenModal(false)} className="border border-[#FFE2D4] text-[#FFA175] w-full rounded-sm py-1 text-[20px]">
              Cancel
            </button>
            <button className="w-full bg-[#FFA175] py-[5px] text-[18px] text-white rounded-sm">
              Update
            </button>
          </div>
        </Form>
      </Modal>
      <Modal
        centered
        footer={false}
        onCancel={() => setOpenDescriptionModal(false)}
        open={openDescriptionModal}
      >
        <p className="text-xl font-medium text-center">Description</p>
        <div className="my-2">
          <p>{description}</p>
        </div>
      </Modal>
    </div>
  );
};

export default Subscriptions;
