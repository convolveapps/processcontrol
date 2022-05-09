import {useState, useEffect} from 'react'
import PageHeader from '../PageHeader/PageHeader'
import HeatLossChart from './Charts/HeatlossChart';
import HotMetalChart from './Charts/HotMetalChart';
import TensileStrengthChart from './Charts/TensileStrengthChart';
import ElongationChart from './Charts/ElongationChart';
import ReadXlsx from '../../helpers/ReadXlsx';
import ParameterTable, {ParameterList} from './Charts/ParameterTable';
import {setHeatLossDataSet, setHotMetalDataSet,setTensileStrengthDataSet, setElongationDataSet, setParametersDataSet} from '../../helpers/DataSetOperations';
import ParameterChart from './Charts/ParameterChart';
import PopUp from '../../helpers/PopUp';

import './dashboard.scss';


const Dashboard = () => {
  const [pageName, setPageName] = useState("Process control dashboard");
  const [pageSummary, setPageSummary] = useState();

  const [heatLossData, setHeatLossData] = useState([]);
  const [heatLossChartData, setHeatLossChartData] = useState();

  const [hotMetalData, setHotMetalData] = useState([]);
  const [hotMetalChartData, setHotMetalChartData] = useState([]);
  

  const [tensileStrengthData, setTensileStrengthData] = useState([]);
  const [tensileStrengthChartData, setTensileStrengthChartData] = useState([]);

  const [elongationData, setElongationData] = useState([]);
  const [elongationChartData, setElongationChartData] = useState([]);


  const [dataSetName, setDataSetName] = useState();
  const [parameterName, setParameterName] = useState();
  const [parameterTableData, setParameterTableData] = useState();
  const [parameterChartData, setParameterChartData] = useState();

  const [activatePopUp, setActivatePopup] = useState(false);
  const [popUpContent, setPopUpContent] = useState("");
  const [popUpHeaderContent, setPopUpHeaderContent] = useState("");

  const [constraintData, setConstraintData] = useState([]);

  const reportPath = import.meta.env.VITE_REPORT_FILE_PATH;


  useEffect(()=>{
    ReadXlsx(setHeatLossData, 0);
    ReadXlsx(setHotMetalData, 1);
    ReadXlsx(setTensileStrengthData, 2);
    ReadXlsx(setElongationData, 3);
    ReadXlsx(setConstraintData, 5);
  },[]);

  useEffect(()=>{

    if(heatLossData.length>0 && hotMetalData.length>0 && tensileStrengthData.length>0 && elongationData.length>0){
      setHeatLossDataSet(heatLossData, setHeatLossChartData);
      setHotMetalDataSet(hotMetalData, setHotMetalChartData);
      setTensileStrengthDataSet(tensileStrengthData, setTensileStrengthChartData);
      setElongationDataSet(elongationData, setElongationChartData);
    }

  },[heatLossData, hotMetalData, tensileStrengthData, elongationData]);

  useEffect(()=>{
    if(heatLossChartData && hotMetalChartData && tensileStrengthChartData && elongationChartData){
      // Build heat loss visuals
      setDataSetName("Heat loss");
      setParameterTableData(heatLossChartData.lastActual);
      setParameterName("Fuel Rate");
      setParameterChartData(setParametersDataSet(heatLossData,"Fuel Rate"));
    }
  },[heatLossChartData,hotMetalChartData,tensileStrengthChartData,elongationChartData])

  useEffect(()=>{
    handelParameterChange(parameterName);
  },[parameterName]);


  const handelDataSetChange = (type) =>{
    setDataSetName(type);
    if(type == "Heat loss"){
      const parameter = heatLossChartData.lastActual[0].parameter;
      setParameterName(parameter);
      setParameterTableData(heatLossChartData.lastActual);
      setParameterChartData(setParametersDataSet(heatLossData,parameter));
    }
    else if(type == "Hot metal"){
      const parameter = hotMetalChartData.lastActual[0].parameter;
      setParameterName(parameter);
      setParameterTableData(hotMetalChartData.lastActual);
      setParameterChartData(setParametersDataSet(hotMetalData,parameter));
    }
    else if(type == "Tensile strength"){
      const parameter = tensileStrengthChartData.lastActual[0].parameter;
      setParameterName(parameter);
      setParameterTableData(tensileStrengthChartData.lastActual);
      setParameterChartData(setParametersDataSet(tensileStrengthData,parameter));
    }
    else{
      const parameter = elongationChartData.lastActual[0].parameter;
      setParameterName(parameter);
      setParameterTableData(elongationChartData.lastActual);
      setParameterChartData(setParametersDataSet(elongationData,parameter));
    }
  }

  const handelParameterChange = (paramaterSelected) =>{
    if(dataSetName == "Heat loss"){
      setParameterChartData(setParametersDataSet(heatLossData,paramaterSelected));
    }
    else if (dataSetName == "Hot metal"){
      setParameterChartData(setParametersDataSet(hotMetalData,paramaterSelected));
    }
    else if (dataSetName == "Tensile strength"){
      setParameterChartData(setParametersDataSet(tensileStrengthData,paramaterSelected));
    }
    else{
      setParameterChartData(setParametersDataSet(elongationData,paramaterSelected));
    }
  }

  const editConstraints = () =>{
    const selectedConstraint = constraintData.filter(d => d.Constraint.toLowerCase() == dataSetName.toLowerCase());
    
    const content = <table className='tbl tbl-bordered'>
      <thead>
        <tr>
          <th>Parameter</th>
          <th>High</th>
          <th>Low</th>          
        </tr>
      </thead>
      <tbody>
        {selectedConstraint.map((x, index) => (
          <tr key={index}>
            <td>{x.Parameter}</td>
            <td contentEditable='true'>{x.High}</td>
            <td contentEditable='true'>{x.Low}</td>
          </tr>
        ))}
      </tbody>
    </table>;

    setActivatePopup(true);
    setPopUpHeaderContent("Constraint action");
    setPopUpContent(content);
  }

  // const generateReport = () => {

  // }

  const handelParameterAction = (actionType) =>{
    setActivatePopup(true);
    setPopUpHeaderContent("Recommended action");
    if(actionType){
      const content = <>
                        <label>You have accepted the recommendation</label>
                        <textarea rows={2} placeholder="Please provide comment"></textarea>
                      </>
      setPopUpContent(content);
    }
    else{
      const content = <>
                        <label>You have rejected the recommendation</label>
                        <textarea rows={2} placeholder="Please provide comment"></textarea>
                      </>
      setPopUpContent(content);
    }
  }

  const closePopUp = () =>{
    setActivatePopup(false);
  }

  return (
    <>
      <div className='page-details'>
        <PageHeader pageName={pageName} pageSummary={pageSummary}/>
        <div className="header-actions bg-shadow">
              <div className="status">
                <i className="fa-solid fa-shield text-danger fs-20"></i>
                <p>Heat loss &amp; Tensile strength predicted are critical!</p>
              </div>
              <div className="action-container">
                  <div className="btn btn-bold btn-primary-outline" onClick={()=>editConstraints()}>Edit constraints</div>
                  <a className="btn btn-bold btn-primary-outline" href={reportPath} download>Report</a>
              </div>
        </div>
        <div className="report-container">
          {
            heatLossChartData && hotMetalChartData && tensileStrengthChartData && elongationChartData
            ?
            <>
              <div className='pc_component-reports'>
                <div className="pc_component-report bg-shadow bg-danger-fade" onClick={() => handelDataSetChange("Heat loss")}>
                  <div className="card-heading">
                    <h4>Heat loss</h4>
                  </div>
                  <div className="card-chart">
                      <HeatLossChart heatLossChartData={heatLossChartData} />
                  </div>
                </div>
                <div className="pc_component-report bg-shadow" onClick={() => handelDataSetChange("Hot metal")}>
                  <div className="card-heading">
                    <h4>Hot metal temperature</h4>
                  </div>
                  <div className="card-chart">
                      <HotMetalChart hotMetalChartData={hotMetalChartData} />
                  </div>
                </div>
                <div className="pc_component-report bg-shadow bg-danger-fade" onClick={() => handelDataSetChange("Tensile strength")}>
                  <div className="card-heading">
                    <h4>Tensile strength</h4>
                  </div>
                  <div className="card-chart">
                      <TensileStrengthChart tensileStrengthChartData={tensileStrengthChartData} />
                  </div>
                </div>
                <div className="pc_component-report bg-shadow" onClick={() => handelDataSetChange("Elongation")}>
                  <div className="card-heading">
                    <h4>Elongation</h4>
                  </div>
                  <div className="card-chart">
                      <ElongationChart elongationChartData={elongationChartData} />
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
                        <ParameterTable data={parameterTableData} handelParameterAction={handelParameterAction}/>
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
            </>
            :
            <></>
          }
        </div>
      </div>
      <PopUp headerContent={popUpHeaderContent} isActive={activatePopUp} closePopUp={closePopUp}>
        {popUpContent}
      </PopUp>
    </>
  );
}

export default Dashboard