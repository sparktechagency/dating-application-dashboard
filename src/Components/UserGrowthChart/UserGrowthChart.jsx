import { Select, Tooltip } from 'antd'
import React from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from 'recharts'

const UserGrowthChart = () => {
    const chartData =[
        {
         name : "jan",active:8,cancel: 10},
        { name : "feb",active:7,cancel: 8},
        { name : "mar",active:5,cancel: 1},
        { name : "apr",active:7,cancel: 9},
        { name : "may",active:4,cancel: 8},
        { name : "jun",active:3,cancel: 6},
        { name : "jul",active:8,cancel: 11},
        { name : "aug",active:9,cancel: 10},
        { name : "sep",active:6,cancel: 11},
        { name : "oct",active:5,cancel: 8},
        { name : "nov",active:4,cancel: 7},
        { name : "dec",active:2,cancel: 6},
    ]
    return (
        <>
            <div className='flex justify-between items-center'>
                <p className='text-xl font-medium'>User Growth</p>
                <Select
                    defaultValue="2024"
                    style={{ width: 120 }}
                />
            </div>
            <div className='w-full h-[400px]'>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={400}
                        height={500}
                        data={chartData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        barSize={12}
                    >
                        <CartesianGrid strokeDasharray="1 1" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="active" fill="#FFA175" radius={[25, 25, 0, 0]} />
                        <Bar dataKey="cancel" fill="#6E8EC3" radius={[25, 25, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}

export default UserGrowthChart