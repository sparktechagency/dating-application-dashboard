import React, { useState } from 'react';
import { useGetVideoQuery, useDeleteVideoMutation, useUploadVideoMutation } from '../../redux/api/videoManagementApi';
import { Table, Button, Modal, Upload, message, Popconfirm, Spin } from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const VideoManagement = () => {
    const [page, setPage] = useState(1);
    const { data, isLoading, isError } = useGetVideoQuery(page);
    const [deleteVideo] = useDeleteVideoMutation();
    const [uploadVideo, { isLoading: isUploading }] = useUploadVideoMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fileList, setFileList] = useState([]);

    const handleDelete = async (id) => {
        try {
            await deleteVideo(id).unwrap();
            message.success('Video deleted successfully');
        } catch (error) {
            message.error('Error deleting video');
            console.error("Error deleting video:", error);
        }
    };

    const handleUpload = async () => {
        if (fileList.length === 0) {
            message.error('Please select a video to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('video', fileList[0].originFileObj);

        try {
            await uploadVideo(formData).unwrap();
            setFileList([]);
            setIsModalOpen(false);
            message.success('Video uploaded successfully');
        } catch (error) {
            message.error('Error uploading video');
            console.error('Error uploading video:', error);
        }
    };

    const columns = [
        {
            title: 'Video',
            dataIndex: 'presignedUrl',
            key: 'video',
            render: (url) => (
                <video width="320" height="240" controls>
                    <source src={url} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            ),
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date) => new Date(date).toLocaleDateString(),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Popconfirm
                    title="Are you sure to delete this video?"
                    onConfirm={() => handleDelete(record._id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type="primary" danger icon={<DeleteOutlined />} />
                </Popconfirm>
            ),
        },
    ];

    return (
        <div className="bg-white p-4 rounded-md">
            <div className="flex flex-col gap-3 mb-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                    <Link to={-1}>
                        <FaArrowLeft size={18} className="text-[var(--primary-color)] " />
                    </Link>
                    <span className="font-semibold text-[20px]">Video Management</span>
                </div>
                <Button type="primary" icon={<UploadOutlined />} onClick={() => setIsModalOpen(true)}>
                    Upload Video
                </Button>
            </div>
            <Spin spinning={isLoading}>
                {isError ? (
                    <p>Error fetching data</p>
                ) : (
                    <Table
                        dataSource={data?.data}
                        columns={columns}
                        rowKey="_id"
                        pagination={{
                            current: page,
                            onChange: (page) => setPage(page),
                        }}
                        scroll={{ x: 900 }}
                        size="small"
                    />
                )}
            </Spin>
            <Modal
                title="Upload Video"
                visible={isModalOpen}
                onOk={handleUpload}
                onCancel={() => setIsModalOpen(false)}
                confirmLoading={isUploading}
            >
                <Upload
                    beforeUpload={() => false} // Prevent auto upload
                    onChange={({ fileList }) => setFileList(fileList)}
                    fileList={fileList}
                    maxCount={1}
                >
                    <Button icon={<UploadOutlined />}>Select Video</Button>
                </Upload>
            </Modal>
        </div>
    );
};

export default VideoManagement;