import { Table } from 'antd';
import { IoArrowBackSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useGetNotificationsQuery } from '../../redux/api/notificationApi';

const Notification = () => {
    const { data: notificationData, isLoading, isError } = useGetNotificationsQuery();
    const navigate = useNavigate();

    const columns = [
        {
            dataIndex: 'notification',
            key: 'notification',
            render: (text, record) => <span>{record.message.title} - {record.message.description}</span>,
        },
    ];

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching notifications.</div>;
    }

    const data = Array.isArray(notificationData?.data?.notification) && notificationData?.data?.notification.map((item, index) => ({
        ...item,
        key: index + 1,
    }));

    return (
        <div>
            <div className="flex justify-between items-center gap-4">
                <h3 className="text-[#242424] text-[20px] font-semibold flex items-center gap-2"> <IoArrowBackSharp className='text-[#FFA175] cursor-pointer' onClick={() => navigate(-1)} />Notifications</h3>
            </div>
            <div>
                <h2 className='text-[18px] font-semibold py-2'>Total {data?.length} Notifications</h2>
                <Table columns={columns} dataSource={data} pagination={false}
                    className="custom-pagination" />
            </div>
        </div>
    );
}

export default Notification;
