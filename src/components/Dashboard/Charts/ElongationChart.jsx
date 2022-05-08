import DataSetChart from './DataSetChart';

const ElongationChart = ({elongationChartData}) => {
    return (
        elongationChartData ?
  
          <DataSetChart data={elongationChartData} />
       :
       <></>
      );
}

export default ElongationChart