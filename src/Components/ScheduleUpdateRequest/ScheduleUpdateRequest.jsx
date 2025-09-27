import { Table } from "antd";
import React, { useState } from "react";
import { LuCalendarClock } from "react-icons/lu";
import ScheduleModal from "../ScheduleModal/ScheduleModal";
import { imageUrl, place } from "../../redux/api/baseApi";
import SheduleDoneButton from "../Button/SheduleDoneButton";

const ScheduleUpdateRequest = ({ dataSource }) => {
  const [openScheduleModal, setScheduleModal] = useState(false);
  const [podCastId, setPodCastId] = useState("");

  const maxParticipants = dataSource ? Math.max(...dataSource.map(d => 
    Object.keys(d).filter(key => key.startsWith('perticipant') && !key.endsWith('Img')).length
  )) : 0;

  const participantColumns = [];
  for (let i = 1; i <= maxParticipants; i++) {
    participantColumns.push({
      title: `Participant-${i}`,
      dataIndex: `perticipant${i}`,
      key: `perticipant${i}`,
      render: (_, record) => (
        <div className="flex  items-center gap-2">
          {!!record[`perticipant${i}Img`] ? (
            <img className="h-12 w-12 rounded-lg" src={`${imageUrl}${record[`perticipant${i}Img`]}`} alt="" />
          ) : (
            <img className="h-12 w-12" src={place} alt="" />
          )}

          <p className="font-medium">{record[`perticipant${i}`]}</p>
        </div>
      ),
    });
  }

  const columns = [
    {
      title: "Podcast ID",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Primary Participant",
      dataIndex: "PrimaryParticipant",
      key: "PrimaryParticipant",
      render: (_, record) => (
        <div className="flex  items-center gap-2">
          {!!record?.PrimaryParticipant ? (
            <img className="h-12 w-12 rounded-lg" src={`${imageUrl}${record?.PrimaryParticipant}`} alt="" /> 
          ) : (
            <img className="h-12 w-12" src={place} alt="" />
          )}

          <p className="font-medium">{record?.PrimaryParticipantName}</p>
        </div>
      ),
    },
    ...participantColumns,
    {
      title: "Schedule Date & Time",
      dataIndex: "datetime",
      key: "datetime",
      render: (_, record) => (
        <p>
          {record?.scheduleDate || "Not Schedule"} : {record?.scheduleTime} :{" "}
          {record?.scheduleDay}
        </p>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => {
        if (text === "ReqScheduled") {
          return "Req Scheduled";
        } else if (text === "NotScheduled") {
          return "Not Scheduled";
        } else {
          return text;
        }
      },
    },

    {
      title: "Set Schedule",
      dataIndex: "schedule",
      key: "schedule",
      render: (_, record) => (
        <div
          onClick={() => {
            setScheduleModal(true);
            setPodCastId(record?.id);
          }}
          className="bg-[#FFA175] text-white inline-block text-center p-1 rounded-md cursor-pointer"
        >
          <LuCalendarClock size={22} />
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "done",
      key: "done",
      render: (_, record) => (
        <SheduleDoneButton id={record?.id} />
      ),
    },
  ];
  return (
    <div className="">
      <Table
        dataSource={dataSource}
        columns={columns}
        className="custom-pagination"
        pagination={false}
      />
      <ScheduleModal
        openScheduleModal={openScheduleModal}
        setScheduleModal={setScheduleModal}
        podCastId={podCastId}
      />
    </div>
  );
};

export default ScheduleUpdateRequest;
