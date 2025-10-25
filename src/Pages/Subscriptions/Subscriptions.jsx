import { Button, Form, Input, Modal, Table, Select } from "antd";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  useGetAllSubscriptionQuery,
  useUpdateSubscriptionPlanMutation,
  useCreateSubscriptionPlanMutation,
} from "../../redux/api/subscriptionApi";
import { toast } from "sonner";
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
              setPlanName(record?.name);
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
      unitAmount: Number(values.unitAmount),
      interval: singlePlan?.interval,
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
    const planData = { ...values, unitAmount: Number(values.unitAmount) };
    createPlan(planData)
      .unwrap()
      .then((payload) => {
        toast.success(payload?.message);
        setOpenAddModal(false);
        addForm.resetFields();
      })
      .catch((error) => toast.error(error?.data?.message));
  };

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
        } catch {
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
    <div className="p-4 bg-white rounded-md">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex gap-2 items-center">
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
          className="custom-pagination"
          scroll={{ x: 700 }}
          size="small"
        />
      </div>
      {/* edit modal */}
      <Modal
        centered
        footer={false}
        open={openModal}
        onCancel={handleCancel}
      >
        <p className="mb-5 text-xl font-semibold text-center">Edit</p>
        <Form layout="vertical" onFinish={handleUpdatePlan} form={form}>
          <Form.Item
            name={"name"}
            label={<p className="text-[18px]">Subscription Name</p>}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            name={"unitAmount"}
            label={<p className="text-[18px]">Subscription Fee</p>}
            rules={[{ required: true, message: 'Please select a subscription fee!' }]}
          >
            <Select placeholder="Select a fee">
              <Select.Option value="0">Free</Select.Option>
              <Select.Option value="14.99">14.99</Select.Option>
              <Select.Option value="29.99">29.99</Select.Option>
            </Select>
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
          <div className="flex gap-2 justify-center items-center w-full">
            <button type="button" onClick={() => setOpenModal(false)} className="border border-[#FFE2D4] text-[#FFA175] w-full rounded-md py-1 text-[16px]">
              Cancel
            </button>
            <button className="w-full bg-[#FFA175] py-[5px] text-[16px] text-white rounded-md" disabled={isUpdating}>
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
        <p className="mb-5 text-xl font-semibold text-center">Add Subscription</p>
        <Form
          layout="vertical"
          onFinish={handleCreatePlan}
          form={addForm}
        >
          <Form.Item
            name={"name"}
            label={<p className="text-[18px]">Subscription Name</p>}
          >
            <Input placeholder="E.g. Premium Plan" />
          </Form.Item>
          <Form.Item
            name={"unitAmount"}
            label={<p className="text-[18px]">Subscription Fee</p>}
            rules={[{ required: true, message: 'Please select a subscription fee!' }]}
          >
            <Select placeholder="Select a fee">
              <Select.Option value="0">Free</Select.Option>
              <Select.Option value="14.99">14.99</Select.Option>
              <Select.Option value="29.99">29.99</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name={"interval"}
            label={<p className="text-[18px]">Interval</p>}
          >
            <Input placeholder="E.g. month" />
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
          <div className="flex gap-2 justify-center items-center w-full">
            <Button type="button" onClick={() => { setOpenAddModal(false); addForm.resetFields(); }} className="border border-[#FFE2D4] text-[#FFA175] w-full py-1 rounded-md">
              Cancel
            </Button>
            <Button className="w-full bg-[#FFA175] py-[5px] text-white rounded-md" disabled={isCreating}>
              {isCreating ? "Creating..." : "Create"}
            </Button>
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
        <p className="mb-4 text-xl font-medium text-center">{planName}</p>
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