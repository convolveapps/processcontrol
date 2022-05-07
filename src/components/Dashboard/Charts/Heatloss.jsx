import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

const Heatloss = ({heatLossChartData,heatLossMax,heatLossMin,heatLossAvg}) =>  {
  
    return (
      heatLossChartData ?

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={heatLossChartData}
            margin={{
              top: 5,
              right:30,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis interval="preserveEnd" />
            <Tooltip />
            <Legend />
            <ReferenceLine y={heatLossMax} label="Max" stroke="#40c234" strokeWidth={2} />
            <ReferenceLine y={heatLossMin} label="Min" stroke="#40c234" strokeWidth={2} />
            <ReferenceLine y={heatLossAvg} label="Avg" stroke="#40c234" strokeWidth={2} />
            <Line type="monotone" dataKey="actual" stroke="#4e37b3" strokeWidth={2} fill="#4e37b3" activeDot={{ r: 5 }} />
            <Line type="monotone" dataKey="predicted" stroke="#ff7752" strokeWidth={2} fill="#ff7752" activeDot={{ r: 5 }} />
          </LineChart>
      </ResponsiveContainer>
     :
     <></>
    );
}

export default Heatloss