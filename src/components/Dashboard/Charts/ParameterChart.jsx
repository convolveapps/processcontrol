import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

const ParameterChart = ({parameterChartData}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
        <LineChart
        data={parameterChartData}
        margin={{
            top: 5,
            right:30,
            left: 0,
            bottom: 5,
        }}
        >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="actual" stroke="#4e37b3" strokeWidth={2} fill="#4e37b3" activeDot={{ r: 5 }} />
        <Line type="monotone" dataKey="recommended" stroke="#ff7752" strokeWidth={2} fill="#ff7752" activeDot={{ r: 5 }} />
        </LineChart>
    </ResponsiveContainer>
  )
}

export default ParameterChart