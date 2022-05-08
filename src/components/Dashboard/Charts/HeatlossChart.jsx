import DataSetChart from './DataSetChart';

const HeatlossChart = ({heatLossChartData}) =>  {
  
    return (
      heatLossChartData ?

        <DataSetChart data={heatLossChartData} />
     :
     <></>
    );
}

export default HeatlossChart