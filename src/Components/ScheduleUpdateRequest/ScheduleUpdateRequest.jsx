import { Table } from "antd";
import React, { useState } from "react";
import { LuCalendarClock } from "react-icons/lu";
import ScheduleModal from "../ScheduleModal/ScheduleModal";
import { imageUrl, place } from "../../redux/api/baseApi";
import { usePodcastDoneMutation } from "../../redux/api/podcastManagementApi";
import { toast } from "sonner";

const ScheduleUpdateRequest = ({ dataSource }) => {
  const [openScheduleModal, setScheduleModal] = useState(false);
  const [podCastId, setPodCastId] = useState("");
  //
  const [podCastDone] = usePodcastDoneMutation();

  const handleDonePodcast = (id) => {
    const data = {
      podcastId: id,
    };
    podCastDone(data)
      .unwrap()
      .then((payload) => {
        toast.success(payload?.message)
      })
      .catch((error) => toast.error(error?.data?.message));
  };

  const handleSetSchedule = (id) => {
    
  };

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
    {
      title: "Perticipant-1",
      dataIndex: "perticipant1",
      key: "perticipant1",
      render: (_, record) => (
        <div className="flex  items-center gap-2">
          {!!record?.perticipant2Img ? (
            <img className="h-12 w-12 rounded-lg" src={`${imageUrl}${record?.perticipant2Img}`} alt="" />
          ) : (
            <img className="h-12 w-12" src={place} alt="" />
          )}

          <p className="font-medium">{record?.perticipant2}</p>
        </div>
      ),
    },
    {
      title: "Perticipant-2",
      dataIndex: "perticipant2", 
      key: "perticipant2",
      render: (_, record) => (
        <div className="flex  items-center gap-2">
          {!!record?.perticipant3Img ? (
            <img className="h-12 w-12 rounded-lg" src={`${imageUrl}${record?.perticipant3Img}`} alt="" />
          ) : (
            <img className="h-12 w-12" src={place} alt="" />
          )}
          <p className="font-medium">{record?.perticipant3}</p>
        </div>
      ),
    },

    {
      title: "Perticipant-3",
      dataIndex: "perticipant3",
      key: "perticipant3",
      render: (_, record) => (
        <div className="flex  items-center gap-2">
          {!!record?.perticipant4Img ? (
            <img className="h-12 w-12 rounded-lg" src={`${imageUrl}${record?.perticipant4Img}`} alt="" />
          ) : (
            <img className="h-12 w-12" src={place} alt="" />
          )}
          <p className="font-medium">{record?.perticipant4}</p>
        </div>
      ),
    },
    {
      title: "Perticipant-4",
      dataIndex: "perticipant4",
      key: "perticipant4",
      render: (_, record) => (
        <div className="flex  items-center gap-2">
          {!!record?.perticipant1Img ? (
            <img className="h-12 w-12 rounded-lg" src={`${imageUrl}${record?.perticipant1Img}`} alt="" />
          ) : (
            <img className="h-12 w-12" src={place} alt="" />
          )}

          <p className="font-medium">{record?.perticipant1}</p>
        </div>
      ),
    },
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
        <button
          onClick={() => {
            handleDonePodcast(record?.id);
          }}
          className="bg-[#FFA175] text-white px-2 py-1 rounded-md"
        >
          Done
        </button>
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
