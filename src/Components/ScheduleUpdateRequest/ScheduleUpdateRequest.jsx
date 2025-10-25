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
      responsive: i === 1 ? ['sm'] : ['lg'],
      width: 220,
      render: (_, record) => (
        <div className="flex items-center gap-2 min-w-[200px]">
          {!!record[`perticipant${i}Img`] ? (
            <img className="w-12 h-12 rounded-lg" src={`${imageUrl}${record[`perticipant${i}Img`]}`} alt="" />
          ) : (
            <img className="w-12 h-12" src={place} alt="" />
          )}

          <p className="font-medium truncate max-w-[120px]">{record[`perticipant${i}`]}</p>
        </div>
      ),
    });
  }

  const columns = [
    {
      title: "Podcast ID",
      dataIndex: "key",
      key: "key",
      width: 110,
    },
    {
      title: "Primary Participant",
      dataIndex: "PrimaryParticipant",
      key: "PrimaryParticipant",
      responsive: ['sm'],
      width: 240,
      render: (_, record) => (
        <div className="flex items-center gap-2 min-w-[220px]">
          {!!record?.PrimaryParticipant ? (
            <img className="w-12 h-12 rounded-lg" src={`${imageUrl}${record?.PrimaryParticipant}`} alt="" /> 
          ) : (
            <img className="w-12 h-12" src={place} alt="" />
          )}

          <p className="font-medium truncate max-w-[140px]">{record?.PrimaryParticipantName}</p>
        </div>
      ),
    },
    ...participantColumns,
    {
      title: "Schedule Date & Time",
      dataIndex: "datetime",
      key: "datetime",
      responsive: ['md'],
      width: 220,
      render: (_, record) => (
        <p className="truncate max-w-[200px]">
          {record?.scheduleDate || "Not Schedule"} : {record?.scheduleTime} :{" "}
          {record?.scheduleDay}
        </p>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 140,
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
      width: 120,
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
      width: 120,
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
        scroll={{ x: 900 }}
        size="small"
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
