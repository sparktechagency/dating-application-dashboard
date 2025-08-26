import { Button, Form, Input, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  useGetAllSubscriptionQuery,
  useUpdateSubscriptionPlanMutation,
  useCreateSubscriptionPlanMutation,
  useDeleteSubscriptionPlanMutation,
} from "../../redux/api/subscriptionApi";
import { toast } from "sonner";
import { Popconfirm } from 'antd';
import SubscriptionDeleteButton from "../../Components/Button/SubscriptionDeleteButton";

const Subscriptions = () => {
  const [form] = Form.useForm();
  const [addForm] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [description, setDescription] = useState("");
  const [planName, setPlanName] = useState("");
  const [openDescriptionModal, setOpenDescriptionModal] = useState(false);
  const [singlePlan, setSinglePlan] = useState();
  const { data: getAllSubscription } = useGetAllSubscriptionQuery();
  const [updatePlan, { isLoading: isUpdating }] = useUpdateSubscriptionPlanMutation();
  const [createPlan, { isLoading: isCreating }] = useCreateSubscriptionPlanMutation();
  // const [deletePlan, { isLoading: isDeleting }] = useDeleteSubscriptionPlanMutation();

  const formattedData = Array.isArray(getAllSubscription?.data)
    ? getAllSubscription.data.filter(Boolean).map((sub, i) => ({
      id: sub?._id,
      key: i + 1,
      name: sub?.name,
      fee: `${sub?.unitAmount}`,
      description: sub?.description,
      action: "Edit",
    }))
    : [];

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
              console.log("Clicked record description:", record?.description);
              setDescription(record?.description);
              setPlanName(record?.name); // Set the plan name
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
    {
      title: "Delete",
      key: "delete",
      render: (_, record) => (
       <SubscriptionDeleteButton record={record} />
      ),
    },
  ];

  const handleUpdatePlan = (values) => {
    const data = {
      ...values,
      interval: singlePlan?.interval, // Add interval from singlePlan
    };
    updatePlan({ id: singlePlan?.id, data })
      .unwrap()
      .then((payload) => {
        toast.success(payload?.message);
        setOpenModal(false);
      })
      .catch((error) => toast.error(error?.data?.message));
  };

  const handleCreatePlan = (values) => {
    createPlan(values)
      .unwrap()
      .then((payload) => {
        toast.success(payload?.message);
        setOpenAddModal(false);
        addForm.resetFields();
      })
      .catch((error) => toast.error(error?.data?.message));
  };

  // const handleDeletePlan = (id) => {
  //   deletePlan(id)
  //     .unwrap()
  //     .then((payload) => {
  //       toast.success(payload?.message);
  //     })
  //     .catch((error) => {
  //       toast.error(error?.data?.message);
  //     });
  // };

  const handleCancel = () => {
    setOpenModal(false);
    form.resetFields();
  };

  useEffect(() => {
    if (singlePlan) {
      const { name, fee, description } = singlePlan;
      let descriptionForForm = description;

      if (typeof descriptionForForm === 'string') {
        try {
          descriptionForForm = JSON.parse(descriptionForForm);
        } catch (e) {
          descriptionForForm = [];
        }
      }

      const data = {
        name: name,
        unitAmount: fee,
        description: descriptionForForm,
      };
      form.setFieldsValue(data);
    }
  }, [singlePlan, form]);

  return (
    <div className="bg-white rounded-md p-4">
      <div className="flex justify-between items-center gap-2 mb-6">
        <div className="flex items-center gap-2">
          <Link to={-1}>
            <FaArrowLeft size={18} className="text-[var(--primary-color)] " />
          </Link>
          <span className="font-semibold text-[20px]"> Subscriptions</span>
        </div>
        <div>
          <button
            onClick={() => setOpenAddModal(true)}
            className="bg-[var(--primary-color)] text-white py-1 px-2 rounded-md"
          >
            + Add Subscription
          </button>
        </div>
      </div>

      <div>
        <Table
          columns={columns}
          dataSource={formattedData}
          pagination={false}
        />
      </div>
      {/* edit modal */}
      <Modal
        centered
        footer={false}
        open={openModal}
        onCancel={handleCancel}
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
          <Form.Item label={<p className="text-[18px]">Description</p>}>
            <Form.List name="description">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <div key={key} style={{ display: 'flex', marginBottom: 8, gap: '8px' }}>
                      <Form.Item
                        {...restField}
                        name={[name, 'key']}
                        rules={[{ required: true, message: 'Missing key' }]}
                        style={{ flex: 1 }}
                      >
                        <Input placeholder="Key" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'details']}
                        rules={[{ required: true, message: 'Missing details' }]}
                        style={{ flex: 2 }}
                      >
                        <Input placeholder="Details" />
                      </Form.Item>
                      <Button type="dashed" onClick={() => remove(name)} >Remove</Button>
                    </div>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block>
                      Add Description Field
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form.Item>
          <div className="flex justify-center items-center gap-2 w-full">
            <button type="button" onClick={() => setOpenModal(false)} className="border border-[#FFE2D4] text-[#FFA175] w-full rounded-sm py-1 text-[20px]">
              Cancel
            </button>
            <button className="w-full bg-[#FFA175] py-[5px] text-[18px] text-white rounded-sm" disabled={isUpdating}>
              {isUpdating ? "Updating..." : "Update"}
            </button>
          </div>
        </Form>
      </Modal>

      {/* add modal */}
      <Modal
        centered
        footer={false}
        open={openAddModal}
        onCancel={() => {
          setOpenAddModal(false);
          addForm.resetFields();
        }}
      >
        <p className="text-center text-xl font-semibold mb-5">Add Subscription</p>
        <Form
          layout="vertical"
          onFinish={handleCreatePlan}
          form={addForm}
        >
          <Form.Item
            name={"name"}
            label={<p className="text-[18px]">Subscription Name</p>}
          >
            <Input placeholder="E.g. Premium Plan" className="border border-[#FFA175] hover:border-[#FFA175] py-2 rounded-sm" />
          </Form.Item>
          <Form.Item
            name={"unitAmount"}
            label={<p className="text-[18px]">Subscription Fee</p>}
          >
            <Input placeholder="E.g. 9.99" type="number" className="border border-[#FFA175] hover:border-[#FFA175] py-2 rounded-sm" />
          </Form.Item>
          <Form.Item
            name={"interval"}
            label={<p className="text-[18px]">Interval</p>}
          >
            <Input placeholder="E.g. month" className="border border-[#FFA175] hover:border-[#FFA175] py-2 rounded-sm" />
          </Form.Item>
          <Form.Item label={<p className="text-[18px]">Description</p>}>
            <Form.List name="description">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <div key={key} style={{ display: 'flex', marginBottom: 8, gap: '8px' }}>
                      <Form.Item
                        {...restField}
                        name={[name, 'key']}
                        rules={[{ required: true, message: 'Missing key' }]}
                        style={{ flex: 1 }}
                      >
                        <Input placeholder="E.g. More Matches" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'details']}
                        rules={[{ required: true, message: 'Missing details' }]}
                        style={{ flex: 2 }}
                      >
                        <Input placeholder="E.g. Get 5 matches daily" />
                      </Form.Item>
                      <Button type="dashed" onClick={() => remove(name)} >Remove</Button>
                    </div>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block>
                      Add Description Field
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form.Item>
          <div className="flex justify-center items-center gap-2 w-full">
            <button type="button" onClick={() => { setOpenAddModal(false); addForm.resetFields(); }} className="border border-[#FFE2D4] text-[#FFA175] w-full rounded-sm py-1 text-[20px]">
              Cancel
            </button>
            <button className="w-full bg-[#FFA175] py-[5px] text-[18px] text-white rounded-sm" disabled={isCreating}>
              {isCreating ? "Creating..." : "Create"}
            </button>
          </div>
        </Form>
      </Modal>

      {/* description modal */}
      <Modal
        centered
        footer={false}
        onCancel={() => setOpenDescriptionModal(false)}
        open={openDescriptionModal}
      >
        <p className="text-xl font-medium text-center mb-4">{planName}</p>
        <div className="my-2">
          {Array.isArray(description) ? (
            <ul className="list-disc list-inside">
              {description.map((item, i) => (
                <li key={i} className="mb-2">
                  <span className="font-semibold">{item.key}:</span> {item.details}
                </li>
              ))}
            </ul>
          ) : (
            <p>{description}</p>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Subscriptions;