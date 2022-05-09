import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, Label } from 'recharts';

const renderMax = ({ viewBox: { x, y } }) => {
  const d = 10;
  const r = d / 2;

  const transform = `translate(${x-(d*3)} ${y-d})`;

  return (
      <g transform={transform}>
        <rect x="0" y="0" width="30" height="20" fill="#40c234"></rect>
        <text x="1" y="15"  fontSize="14" fill="white">Max</text>
      </g>
  );
};

const renderMin = ({ viewBox: { x, y } }) => {
  const d = 10;
  const r = d / 2;

  const transform = `translate(${x-(d*3)} ${y-d})`;

  return (
      <g transform={transform}>
        <rect x="0" y="0" width="30" height="20" fill="#40c234"></rect>
        <text x="1" y="15"  fontSize="14" fill="white">Min</text>
      </g>
  );
};

const renderAvg = ({ viewBox: { x, y } }) => {
  const d = 10;
  const r = d / 2;

  const transform = `translate(${x-(d*3)} ${y-d})`;

  return (
      <g transform={transform}>
        <rect x="0" y="0" width="30" height="20" fill="#40c234"></rect>
        <text x="1" y="15"  fontSize="14" fill="white">Avg</text>
      </g>
  );
};


const DataSetChart = ({data}) =>  {
  
    return (
        data ?

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data.chartData}
            margin={{
              top: 5,
              right:30,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis interval="preserveEnd" domain={[data.min-10, data.max+10]} />
            <Tooltip />
            <Legend />
            <ReferenceLine y={data.max} stroke="#40c234" strokeWidth={1} isFront={true} />
            <ReferenceLine y={data.min} stroke="#40c234" strokeWidth={1} isFront={true} />
            <ReferenceLine y={data.avg} stroke="#40c234" strokeWidth={1} isFront={true} />
            <Line type="monotone" dataKey="actual" stroke="#4e37b3" strokeWidth={2} fill="#4e37b3" activeDot={{ r: 5 }} />
            <Line type="monotone" dataKey="predicted" stroke="#ff7752" strokeWidth={2} fill="#ff7752" activeDot={{ r: 5 }} />
          </LineChart>
      </ResponsiveContainer>
     :
     <></>
    );
}

export default DataSetChart