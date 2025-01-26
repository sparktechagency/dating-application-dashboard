
import { Select } from 'antd';
import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useIncomeGrowthQuery } from '../../redux/api/DahsboardHomeApi';

const IncomeOverview = () => {
    const [year , setYear] = useState("2025")
    const {data : incomeGrowth} = useIncomeGrowthQuery(year)
    


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

    const dataMonth = incomeGrowth?.data?.map((mon , i)=>{
        return (
            {
                name : mon?.month,
                uv: mon?.income
            }
        )
    })
 
    const handleChange = (value) => {
        setYear(value)
    };
    return (
        <>
            <div className='flex justify-between items-center'>
                <div className='ml-6'>
                    <p className='text-xl font-semibold mb-2 '>Income Growth</p>
                   
                </div>
                <Select
                    defaultValue="2025"
                    style={{ width: 120 }}
                    onChange={handleChange}
                    options={items}
                />
            </div>
            <div className='w-full h-[400px]'>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        width={400}
                        height={400}
                        data={dataMonth}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="uv" stroke="#FFA175" opacity={1} fillOpacity={1} fill="#FFA175" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}

export default IncomeOverview