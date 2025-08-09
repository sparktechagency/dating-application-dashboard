import { Select, Tooltip } from 'antd'
import React, { useState } from 'react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { useSubscriptionGrowthQuery } from '../../redux/api/DahsboardHomeApi';

const UserGrowthChart = () => {
    const [year, setYear] = useState('2025');
    // All API
    const { data: getSubscription } = useSubscriptionGrowthQuery(year)

    const items = [

        {
            label: 2024,
            value: "2024",
        },
        {
            label: 2025,
            value: "2025",
        },
        {
            label: 2026,
            value: "2026",
        },
        {
            label: 2027,
            value: "2027",
        },
    ];

    const chartData = getSubscription?.data || [];
    const data = Array.isArray(chartData) ? chartData.map(item => {
        return (
            {
                name: item?.month,
                count: item?.count
            }
        )
    }) : []


    const handleYearChange = (value) => {
        setYear(value)
    }
    return (
        <>
            <div>
                <div className='flex justify-between items-center mb-4'>
                    <p className='text-xl font-medium'>Subscription Growth</p>
                    <Select
                        defaultValue="2025"
                        style={{ width: 120 }}
                        options={items}
                        onChange={handleYearChange}
                    />
                </div>
                <div className='w-full h-[300px]'>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            width={400}
                            height={300}
                            data={data}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            barSize={12}
                        >
                            <CartesianGrid strokeDasharray="1 1" vertical={false} /> 
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="count" fill="#FFA175" radius={[25, 25, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    )
}

export default UserGrowthChart