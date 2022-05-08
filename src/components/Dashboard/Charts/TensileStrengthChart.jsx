import DataSetChart from './DataSetChart';

const TensileStrengthChart = ({tensileStrengthChartData}) => {
    return (
        tensileStrengthChartData ?
  
          <DataSetChart data={tensileStrengthChartData} />
       :
       <></>
    );
}

export default TensileStrengthChart