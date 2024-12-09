import { Select, Tooltip } from 'antd'
import React from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from 'recharts'

const UserGrowthChart = () => {
    const chartData =[
        {
            name : "jan",uv:12,  
        },
        { name : "feb",uv:8},
        { name : "mar",uv:5},
        { name : "apr",uv:9},
        { name : "may",uv:11},
        { name : "jun",uv:8},
        { name : "jul",uv:6},
        { name : "aug",uv:4},
        { name : "sep",uv:5},
        { name : "oct",uv:5},
        { name : "nov",uv:2},
        { name : "dec",uv:8},
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
                        barSize={20}
                    >
                        <CartesianGrid strokeDasharray="1 1" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {/* <Bar dataKey="pv" stackId="a" fill="#8884d8" /> */}
                        <Bar dataKey="uv" stackId="a" fill="#FFA175" radius={[25, 25, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}

export default UserGrowthChart