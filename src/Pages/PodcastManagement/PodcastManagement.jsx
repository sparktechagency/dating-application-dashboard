import { Button, Checkbox, Modal, Pagination, Table } from "antd";
import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  useGetAllDonePodCastQuery,
  useSelectPodCastPartnerMutation
} from "../../redux/api/podcastManagementApi";
import { imageUrl, place } from "../../redux/api/baseApi";

import { toast } from "sonner";
import { BiCopy } from "react-icons/bi";
const PodcastManagement = () => {
  const [page, setPage] = useState(1)
  const [openModal, setOpenModal] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [selectedRecordings, setSelectedRecordings] = useState([]);
  const [chooseUser, setChooseUser] = useState();
  const [selectedParticipantId, setSelectedParticipantId] = useState([]);
  const [podCastId, setPodCastId] = useState("");

  const handleCheckboxChange = (participantId) => {
    setSelectedParticipantId((prevSelected) =>
      prevSelected.includes(participantId)
        ? prevSelected.filter((id) => id !== participantId)
        : [...prevSelected, participantId]
    );
  };
  const { data: getAllDonePodcast } = useGetAllDonePodCastQuery(page);
  const [selectedPartner, { isLoading }] = useSelectPodCastPartnerMutation();

  const formattedData = Array.isArray(getAllDonePodcast?.data?.podcasts) && getAllDonePodcast?.data?.podcasts?.map((pod, i) => {
    return {
      key: i + 1,
      id: pod?._id,
      primaryParticipantId: pod?.primaryUser?._id,
      primaryParticipantName: pod?.primaryUser?.name || "N/A",
      primaryParticipantImg: pod?.primaryUser?.avatar,
      perticipant1: pod?.participants[0]?.user?.name || "N/A",
      perticipant1Id: pod?.participants[0]?.user?._id,
      perticipant1Img: pod?.participants[0]?.user?.avatar,
      perticipant1IsAllowed: pod?.participants[0]?.isAllow,
      perticipant2: pod?.participants[1]?.user?.name || "N/A",
      participant2Id: pod?.participants[1]?.user?._id,
      perticipant2Img: pod?.participants[1]?.user?.avatar,
      perticipant2IsAllowed: pod?.participants[1]?.isAllow,
      participant3Id: pod?.participants[2]?.user?._id,
      perticipant3: pod?.participants[2]?.user?.name || "N/A",
      perticipant3Img: pod?.participants[2]?.user?.avatar,
      perticipant3IsAllowed: pod?.participants[2]?.isAllow,
      participant4Id: pod?.participants[3]?.user?._id,
      perticipant4Img: pod?.participants[3]?.user?.avatar,
      perticipant4: pod?.participants[3]?.user?.name || "N/A",
      perticipant4IsAllowed: pod?.participants[3]?.isAllow,
      date: pod?.schedule?.date?.split("T")[0] || "NO Date",
      status: pod?.status || "N/A",
      roomCode: pod?.roomCodes ? pod.roomCodes.filter((code) => code?.role === 'broadcaster')[0]?.code : "N/A",
      producerRoomCode: pod?.roomCodes ? pod.roomCodes.filter((code) => code?.role === 'producer')[0]?.code : "N/A"
    };
  });

  const participants = [
    {
      id: chooseUser?.perticipant1Id,
      name: chooseUser?.perticipant1,
      img: chooseUser?.perticipant1Img,
      isAllowed: chooseUser?.perticipant1IsAllowed,
    },
    {
      id: chooseUser?.participant2Id,
      name: chooseUser?.perticipant2,
      img: chooseUser?.perticipant2Img,
      isAllowed: chooseUser?.perticipant2IsAllowed,
    },
    {
      id: chooseUser?.participant3Id,
      name: chooseUser?.perticipant3,
      img: chooseUser?.perticipant3Img,
      isAllowed: chooseUser?.perticipant3IsAllowed,
    },
    {
      id: chooseUser?.participant4Id,
      name: chooseUser?.perticipant4,
      img: chooseUser?.perticipant4Img,
      isAllowed: chooseUser?.perticipant4IsAllowed,
    },
  ];

  const handleJoinPodcast = (record) => {
    const roomCode = record?.roomCode;
    if (!roomCode) return;
    window.open(`https://podlove.co/ms/?roomCode=${roomCode}`, "_blank");
  };

  const handleSelectedParticipant = () => {
    const data = {
      podcastId: podCastId,
      selectedUserId: selectedParticipantId.map(id => ({ user: id }))
    };

    selectedPartner(data)
      .unwrap()
      .then((payload) => {
        toast.success(payload?.message);
        setOpenModal(false);
      })
      .catch((error) => toast.error(error?.data?.message));
  };

  const handleOpenDownloadModal = async (id) => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      const headers = {
        'Authorization': `Bearer ${token}`,
      };
      const response = await fetch(`${imageUrl}/podcast/record-get-podcast/${id}`, { headers });
      const result = await response.json();

      if (result?.success && result?.data?.findPodcastId?.[0]?.recordingUrl) {
        setSelectedRecordings(result.data.findPodcastId[0].recordingUrl);
        setIsDownloadModalOpen(true);
      } else {
        toast.error("No recording found.");
        setSelectedRecordings([]);
        setIsDownloadModalOpen(true);
      }
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to fetch recording URLs.");
    }
  };

  const handleDownloadClick = async (videoUrl) => {
    const token = JSON.parse(localStorage.getItem('token'));
    try {
      const response = await fetch(`${imageUrl}/podcast/download`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ fileUrl: videoUrl }),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        const message = result?.message || `Failed to generate download link (status ${response.status})`;
        console.error(message, result);
        alert(message);
        return;
      }
      const signedUrl =
        result?.data?.signedUrl ??
        result?.data ??
        result?.signedUrl ??
        result?.url ??
        null;

      if (!signedUrl) {
        console.error("No signed URL in response:", result);
        alert("Download URL not provided by server.");
        return;
      }

      const urlObj = new URL(videoUrl);
      let filename = urlObj.pathname.split("/").pop() || "download";
      filename = filename.split("?")[0];
      try {
        filename = decodeURIComponent(filename);
      } catch {
        // keep original if decode fails
      }

      const link = document.createElement("a");
      link.href = signedUrl;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed:", error);
      alert(error?.message || "An error occurred while generating download link.");
    }
  };


  const columns = [
    {
      title: "Date & Time",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Primary Participant",
      dataIndex: "primaryParticipant",
      key: "primaryParticipant",
      render: (_, record) => (
        <div className="flex gap-2 items-center">
          {!!record?.primaryParticipantImg ? (
            <img className="w-10 h-10 rounded-lg" src={`${imageUrl}${record?.primaryParticipantImg}`} alt="" />
          ) : (
            <img className="w-10 h-10" src={place} alt="" />
          )}

          <p className="font-medium">{record?.primaryParticipantName}</p>
        </div>
      ),
    },
    {
      title: "Participant-1",
      dataIndex: "perticipant1",
      key: "perticipant1",
      render: (_, record) => (
        <div className="flex gap-2 items-center">
          {!!record?.perticipant1Img ? (
            <img className="w-10 h-10 rounded-lg" src={`${imageUrl}${record?.perticipant1Img}`} alt="" />
          ) : (
            <img className="w-10 h-10" src={place} alt="" />
          )}

          <p className="font-medium">{record?.perticipant1}</p>
          {record?.perticipant1IsAllowed && <FaCheckCircle className="ml-1 text-green-500" />}
        </div>
      ),
    },
    {
      title: "Participant-2",
      dataIndex: "perticipant2",
      key: "perticipant2",
      render: (_, record) => (
        <div className="flex gap-2 items-center">
          {!!record?.perticipant2Img ? (
            <img className="w-10 h-10 rounded-lg" src={`${imageUrl}${record?.perticipant2Img}`} alt="" />
          ) : (
            <img src={place} className="w-10 h-10" alt="" />
          )}
          <p className="font-medium">{record?.perticipant2}</p>
          {record?.perticipant2IsAllowed && <FaCheckCircle className="ml-1 text-green-500" />}
        </div>
      ),
    },

    {
      title: "Participant-3",
      dataIndex: "perticipant3",
      key: "perticipant3",
      render: (_, record) => (
        <div className="flex gap-2 items-center">
          {!!record?.perticipant3Img ? (
            <img src={`${imageUrl}${record?.perticipant3Img}`} className="w-10 h-10 rounded-lg" alt="" />
          ) : (
            <img src={place} className="w-10 h-10" alt="" />
          )}

          <p className="font-medium">{record?.perticipant3}</p>
          {record?.perticipant3IsAllowed && <FaCheckCircle className="ml-1 text-green-500" />}
        </div>
      ),
    },
    {
      title: "Participant-4",
      dataIndex: "perticipant4",
      key: "perticipant4",
      render: (_, record) => (
        <div className="flex gap-2 items-center">
          {!!record?.perticipant4Img ? (
            <img className="w-10 h-10 rounded-lg" src={`${imageUrl}${record?.perticipant4Img}`} alt="" />
          ) : (
            <img className="w-10 h-10" src={place} alt="" />
          )}

          <p className="font-medium">{record?.perticipant4}</p>
          {record?.perticipant4IsAllowed && <FaCheckCircle className="ml-1 text-green-500" />}
        </div>
      ),
    },
    {
      title: "Select for Date",
      dataIndex: "selectDate",
      key: "selectDate",
      render: (_, record) => (
        <div
          onClick={() => {
            setOpenModal(true);
            setChooseUser(record);
            setPodCastId(record?.id);
          }}
          className="text-[#FFA175]  inline-block text-center p-1 rounded-md cursor-pointer"
        >
          <p>Choose</p>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <p
          className={`${status === "Done" ? "text-green-500" : "text-red-500"} font-medium`}>
          {status}
        </p>
      ),
    },

    {
      title: "Action",
      dataIndex: "recording",
      key: "recording",
      render: (_, record) => {
        const isDownloadable = record.status === 'Done' || record.status === 'Finished';
        // const isFinished = record.status === 'Finished';
        const isEnableJoin = record.status === 'Playing' || record.status === 'StreamStart' || record.status === 'Done';
        return (
          <div className="text-[#FFA175] flex gap-2 flewr p-1 rounded-md text-end">
            <Button
              className={`px-3 py-1 text-white bg-green-500 rounded-md`}
              disabled={!isEnableJoin}
              onClick={() => handleJoinPodcast(record)}
            >
              Join
            </Button>

            <Button
              onClick={() => handleOpenDownloadModal(record.id)}
              disabled={!isDownloadable}
              className={`text-white px-3 py-1 rounded-md ${isDownloadable ? 'bg-blue-500 cursor-pointer' : 'bg-gray-400 cursor-not-allowed'}`}>
              Download
            </Button>
          </div>
        );
      },
    },

    {
      title: "Producer Link",
      dataIndex: "producerLink",
      key: "producerLink",
      render: (_, record) => {
        // const producerCode = record?.producerRoomCode;
        const isEnableJoin = record.status === 'Playing' || record.status === 'StreamStart' || record.status === 'Done';
        const handleCopy = async (producerCode) => {
          if (producerCode && producerCode !== "N/A") {
            const textToCopy = `https://podlove.co/ms/?roomCode=${producerCode}`;
            try {
              if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(textToCopy);
              } else {
                // fallback
                const textArea = document.createElement("textarea");
                textArea.value = textToCopy;
                textArea.style.position = "fixed";
                textArea.style.left = "-9999px";
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand("copy");
                document.body.removeChild(textArea);
              }
              toast.success("Producer link copied to clipboard");
            } catch (err) {
              console.error("Clipboard copy failed:", err);
              toast.error("Failed to copy producer link");
            }
          } else {
            toast.error("No producer link found");
          }
        };

        return (
          <Button
            onClick={() => handleCopy(record?.producerRoomCode)}
            disabled= {!isEnableJoin}
            className="bg-[#2757A6] inline-block text-white p-1 rounded-md cursor-pointer"
          >
            <BiCopy size={22} />
          </Button>
        );
      },
    }
  ];


  return (
    <div className="p-4 bg-white rounded-md">
      <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2 items-center">
          <Link to={-1}>
            <FaArrowLeft size={18} className="text-[var(--primary-color)] " />
          </Link>
          <span className="font-semibold text-[20px]">Podcast Management</span>
        </div>
      </div>

      <Table
        dataSource={formattedData}
        columns={columns}
        className="custom-pagination"
        pagination={false}
        scroll={{ x: 1200 }}
        size="small"
      />
      <div className="flex justify-center mt-5">
        <Pagination
          current={getAllDonePodcast?.data?.pagination?.page}
          total={getAllDonePodcast?.data?.pagination?.total}
          pageSize={getAllDonePodcast?.data?.pagination?.limit}
          onChange={(page) => setPage(page)}
        />
      </div>
      <Modal
        open={openModal}
        centered
        footer={false}
        onCancel={() => setOpenModal(false)}
      >
        <p className="mb-10 text-xl font-medium text-center">Choose for Date</p>

        <div>
          {participants.filter((participant) => participant.id !== undefined)?.map((participant) => (
            <div
              key={participant?.id}
              className="flex gap-4 items-center px-4 mb-4 sm:px-24"
            >
              <Checkbox
                checked={selectedParticipantId.includes(participant?.id)}
                onChange={() => handleCheckboxChange(participant?.id)}
                disabled={participant.isAllowed}
              />
              {!!participant?.img ? (
                <img
                  src={`${imageUrl}${participant?.img}`}
                  alt={participant?.name}
                  className="w-10 h-10 rounded-lg"
                />
              ) : (
                <img src={place} alt="default" className="w-10 h-10" />
              )}
              <p>{participant?.name}</p>
              {participant.isAllowed && <p className="ml-2 text-xs text-green-500">(Choosed)</p>}
            </div>
          ))}
        </div>
        <Button
          loading={isLoading}
          onClick={() => handleSelectedParticipant()}
          className="bg-[#FFA175] flex w-full justify-center items-center text-white py-2 rounded-sm"
          disabled={selectedParticipantId?.length === 0}
        >
          Choose
        </Button>
      </Modal>

      <Modal
        title="Download Recordings"
        open={isDownloadModalOpen}
        onCancel={() => setIsDownloadModalOpen(false)}
        footer={[
          <button key="close" onClick={() => setIsDownloadModalOpen(false)} className="px-4 py-2 font-bold text-gray-800 bg-gray-300 rounded hover:bg-gray-400">
            Close
          </button>
        ]}
      >
        {selectedRecordings.length > 0 ? (
          selectedRecordings.map((rec, index) => (
            <div key={index} className="flex justify-between items-center p-2 mb-4 rounded border">
              <div className="flex flex-col">
                <p className="font-semibold bg-gray-200 px-2 rounded-md text-[10px]">{rec?.sessionId}</p>
                <p className="font-semibold">Recording {index + 1}</p>
              </div>
              <button
                onClick={() => handleDownloadClick(rec.video)}
                className="px-3 py-1 mt-2 ml-2 text-white bg-green-500 rounded-md"
              >
                Download
              </button>
            </div>
          ))
        ) : (
          <p>No recordings found for this podcast.</p>
        )}
      </Modal>
    </div>
  );
};

export default PodcastManagement;