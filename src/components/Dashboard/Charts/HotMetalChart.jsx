import DataSetChart from './DataSetChart';

const HotMetalChart = ({hotMetalChartData}) => {
    return (
        hotMetalChartData ?
  
          <DataSetChart data={hotMetalChartData} />
       :
       <></>
    );
}

export default HotMetalChart