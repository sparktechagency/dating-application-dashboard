import { Table, Popconfirm } from "antd";
import { useState } from "react";
import { LuCalendarClock } from "react-icons/lu";
import { IoCheckmarkCircle } from "react-icons/io5";
import { IoCloseCircleOutline } from "react-icons/io5";
import ScheduleModal from "../ScheduleModal/ScheduleModal";
import { imageUrl, place } from "../../redux/api/baseApi";
import SheduleDoneButton from "../Button/SheduleDoneButton";

const ScheduleUpdateRequest = ({ dataSource, onRemoveParticipant = () => {} }) => {
  const [openScheduleModal, setScheduleModal] = useState(false);
  const [podCastId, setPodCastId] = useState("");

  const maxParticipants = dataSource
    ? Math.max(
        ...dataSource.map((d) =>
          Object.keys(d).filter((key) => /^perticipant\d+$/.test(key)).length
        )
      )
    : 0;

  const participantColumns = [];
  for (let i = 1; i <= maxParticipants; i++) {
    participantColumns.push({
      title: i === 1 ? "Spotlight" : `Spark-${i - 1}`,
      dataIndex: `perticipant${i}`,
      key: `perticipant${i}`,
      width: 220,
      render: (_, record) => (
        <div className="group flex items-center gap-2 min-w-[300px]">
          {!!record[`perticipant${i}Img`] ? (
            <img className="w-12 h-12 rounded-full" src={`${imageUrl}${record[`perticipant${i}Img`]}`} alt="" />
          ) : (
            <img className="w-12 h-12" src={place} alt="" />
          )}

          <div className="flex items-center gap-1 max-w-[140px]">
            <p className="font-medium truncate max-w-[120px]">{record[`perticipant${i}`]}</p>
            {record[`perticipant${i}Req`] && (
              <IoCheckmarkCircle className="text-blue-500 min-w-4" size={14} title="Requested" />
            )}
            {record[`perticipant${i}Id`] && (
              <Popconfirm
                title="Remove participant?"
                description={`Remove ${record[`perticipant${i}`]} from this podcast?`}
                okText="Remove"
                okType="danger"
                cancelText="Cancel"
                onConfirm={() => onRemoveParticipant({ participantId: record[`perticipant${i}Id`] })}
              >
                <button
                  type="button"
                  title="Remove participant"
                  className="opacity-0 group-hover:opacity-100 transition-opacity ml-1 shrink-0"
                >
                  <IoCloseCircleOutline className="text-red-500" size={16} />
                </button>
              </Popconfirm>
            )}
          </div>
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
    // {
    //   title: "Primary Participant",
    //   dataIndex: "PrimaryParticipant",
    //   key: "PrimaryParticipant",
    //   responsive: ['sm'],
    //   width: 240,
    //   render: (_, record) => (
    //     <div className="flex items-center gap-2 min-w-[220px]">
    //       {!!record?.PrimaryParticipant ? (
    //         <img className="w-12 h-12 rounded-lg" src={`${imageUrl}${record?.PrimaryParticipant}`} alt="" /> 
    //       ) : (
    //         <img className="w-12 h-12" src={place} alt="" />
    //       )}

    //       <p className="font-medium truncate max-w-[140px]">{record?.PrimaryParticipantName}</p>
    //     </div>
    //   ),
    // },
    ...participantColumns,
    {
      title: "Schedule Date & Time",
      dataIndex: "datetime",
      key: "datetime",
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
      <div className="overflow-x-auto">
        <Table
          dataSource={dataSource}
          columns={columns}
          className="custom-pagination"
          pagination={false}
          scroll={{ x: 'max-content' }}
          size="small"
        />
      </div>
      <ScheduleModal
        openScheduleModal={openScheduleModal}
        setScheduleModal={setScheduleModal}
        podCastId={podCastId}
      />
    </div>
  );
};

export default ScheduleUpdateRequest;
