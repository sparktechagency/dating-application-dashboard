import { Form, DatePicker, Modal } from "antd";
import dayjs from "dayjs";
import React from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useSchedulePodCastMutation } from "../../redux/api/podcastManagementApi";
import { toast } from "sonner";

const ScheduleModal = ({ openScheduleModal, setScheduleModal, podCastId }) => {
  const [form] = Form.useForm();
  const [schedulePodCast] = useSchedulePodCastMutation();
  const onFinish = (values) => {
    const selectedDateTime = values.scheduleDateTime;
    const formattedDate = dayjs(selectedDateTime).format("MM/DD/YYYY");

    // Format the time in AM/PM
    const formattedTime = dayjs(selectedDateTime).format("hh:mm A");
    const dayName = dayjs(selectedDateTime).format("dddd");

    const data = {
      podcastId: podCastId,
      status: "Scheduled",
      date: formattedDate,
      time: formattedTime,
      day : dayName
    };


    schedulePodCast(data)
      .unwrap()
      .then((payload) => {
        toast.success(payload?.message)
        setScheduleModal(false)
      })
      .catch((error) => toast.error(error?.data?.message));
  };

  return (
    <div>
      <Modal
        open={openScheduleModal}
        centered
        footer={false}
        onCancel={() => setScheduleModal(false)}
      >
        <p className="text-center text-xl font-semibold mb-5">Set Schedule</p>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="scheduleDateTime"
            label={<p className="text-xl">Schedule Date & Time</p>}
            rules={[
              {
                required: true,
                message: "Please select a schedule date and time!",
              },
            ]}
          >
            <DatePicker
              className="w-full py-2 border-[#FFA175] hover:border-[#FFA175]"
              showTime // Enables time picker
              format="YYYY-MM-DD HH:mm" // Date and time format
              suffixIcon={
                <FaRegCalendarAlt className="text-[#FFA175] cursor-pointer" />
              }
            />
          </Form.Item>
          <div className="flex justify-center items-center gap-2 w-full">
            <button
              type="button"
              className="border border-[#FFA175] text-[#FFA175] w-full rounded-sm py-1 text-[20px]"
              onClick={() => setScheduleModal(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full bg-[#FFA175] py-[5px] text-[18px] text-white rounded-sm"
            >
              Confirm
            </button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ScheduleModal;
