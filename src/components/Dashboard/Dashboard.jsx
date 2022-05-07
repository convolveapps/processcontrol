import {useState, useEffect} from 'react'
import PageHeader from '../PageHeader/PageHeader'
import HeatLoss from './Charts/Heatloss';
import ReadXlsx from '../../helpers/ReadXlsx';
import ParameterTable, {ParameterList} from './Charts/ParameterTable';
import {setHeatLossDataSet, setParametersDataSet} from '../../helpers/DataSetOperations';
import ParameterChart from './Charts/ParameterChart';

import './dashboard.scss';


const Dashboard = () => {
  const [pageName, setPageName] = useState("Process control dashboard");
  const [pageSummary, setPageSummary] = useState();

  const [heatLossData, setHeatLossData] = useState([]);
  const [heatLossChartData, setHeatLossChartData] = useState([]);
  const [heatLossMax,setHeatLossMax] = useState();
  const [heatLossMin,setHeatLossMin] = useState();
  const [heatLossAvg,setHeatLossAvg] = useState();
  const [heatLossParameterList,setHeatLossParameterList] = useState();
  const [heatLossDataIsAvailable, setHeatLossDataIsAvailable] = useState(false);


  const [dataSetName, setDataSetName] = useState();
  const [parameterName, setParameterName] = useState();
  const [parameterTableData, setParameterTableData] = useState();
  const [parameterChartData, setParameterChartData] = useState();


  useEffect(()=>{
    ReadXlsx(setHeatLossData, 0);
  },[]);

  useEffect(()=>{
    setHeatLossDataSet(heatLossData, setHeatLossChartData, setHeatLossMin, setHeatLossMax, setHeatLossAvg, setHeatLossParameterList)

  },[heatLossData]);

  useEffect(()=>{
    if(heatLossChartData && heatLossMax && heatLossMin && heatLossAvg){
      setHeatLossDataIsAvailable(true);
      setDataSetName("Heat Loss");
      setParameterTableData(heatLossParameterList);
      setParameterName("Fuel Rate");
      setParameterChartData(setParametersDataSet(heatLossData,"Fuel Rate"));
    }
  },[heatLossChartData,heatLossMax,heatLossMin,heatLossAvg]);

  useEffect(()=>{
    setParameterChartData(setParametersDataSet(heatLossData,parameterName));
  },[parameterName]);

  const editConstraints = () =>{

  }

  const generateReport = () => {

  }

  return (
    <div className='page-details'>
      <PageHeader pageName={pageName} pageSummary={pageSummary}/>
      <div className="header-actions bg-shadow">
            <div className="status">
              <i class="fa-solid fa-shield text-success fs-20"></i>
              <p>All systems are healthy</p>
            </div>
            <div className="action-container">
                <div className="btn btn-bold btn-primary-outline" onClick={()=>editConstraints()}>Edit constraints</div>
                <div className="btn btn-bold btn-primary-outline" onClick={()=>generateReport()}>Report</div>
            </div>
      </div>
      <div className="report-container">
        <div className='pc_component-reports'>
          <div className="pc_component-report bg-shadow" onClick={() => setParameterTableData(heatLossParameterList)}>
            {
              heatLossDataIsAvailable ?
              <>
                <div className="card-heading">
                  <h4>Heat loss</h4>
                </div>
                <div className="card-chart">
                    <HeatLoss heatLossChartData={heatLossChartData} heatLossMax={heatLossMax} heatLossMin={heatLossMin} heatLossAvg={heatLossAvg} />
                </div>
              </>
              :
              <></>
            }
          </div>
          <div className="pc_component-report bg-shadow">
            <div className="card-heading">
              <h4>Quality</h4>
            </div>
            <div className="card-chart">
                
            </div>
          </div>
          <div className="pc_component-report bg-shadow">
            <div className="card-heading">
              <h4>Gas emission</h4>
            </div>
            <div className="card-chart">
                
            </div>
          </div>
          <div className="pc_component-report bg-shadow">
            <div className="card-heading">
              <h4>Throughput</h4>
            </div>
            <div className="card-chart">
                
            </div>
          </div>
        </div>
        <div className='pc_component-parameters'>
          <div className="pc_component-parameter bg-shadow">
            <div className="card-heading">
                <h4>{dataSetName} parameters</h4>
            </div>
            <div className="table-detail tbl-responsive">
              {
                parameterTableData ? 
                <>
                  <ParameterTable data={parameterTableData}/>
                </>
                :
                <></>
              }
            </div>
          </div>
          <div className="pc_component-parameter bg-shadow">
            <div className="card-heading">
                <h4>Parameter chart for </h4>
                {
                  parameterTableData ? 
                  <>
                    <ParameterList data={parameterTableData} setParameterName={setParameterName}/>
                  </>
                  :
                  <></>
                }
            </div>
            <div className="card-chart">
                {
                  parameterChartData ?
                  <ParameterChart parameterChartData={parameterChartData} />
                  :
                  <></>
                }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard