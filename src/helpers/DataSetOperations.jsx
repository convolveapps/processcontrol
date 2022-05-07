export const setDataSet = (data, type) => {
    let sData = [];
    let minValue = 0;
    let maxValue = 0;
    let avgValue = 0;
    let count = 0;
  
    let parameterActual=`${type} Actual`;
    let parameterPredicted=`${type} Predicted`;
  
    for(let i=0; i< data.length; i++){
      
      sData.push({
        timestamp: data[i]["Timestamp"],
        actual: data[i][parameterActual],
        predicted: data[i][parameterPredicted]
      });
  
      if(count==0){
        minValue = data[i][parameterActual];
        maxValue = data[i][parameterActual];
      }
  
      if(data[i][parameterActual] < minValue){
        minValue = data[i][parameterActual];
      }
      if(data[i][parameterActual] > maxValue){
        maxValue = data[i][parameterActual];
      }
  
      count = data[i][parameterActual] ? ++count : count;
      avgValue = data[i][parameterActual] ? avgValue+data[i][parameterActual]: avgValue;
    }
    avgValue = Math.floor(avgValue/count);
  
    const lastActual = data.filter(d => d["Timestamp"] === "2022-04-27 00:00")[0];
  
    return {
      dataSet: sData,
      max: maxValue,
      min: minValue,
      avg: avgValue,
      lastActual: lastActual
    };
}

export const setParametersDataSet = (data, type) =>{
  let sData = [];
  let parameterActual=`${type} Actual`;
  let parameterRecommended=`${type} Recommended`;

  for(let i=0; i< data.length; i++){
    sData.push({
      timestamp: data[i]["Timestamp"],
      actual: data[i][parameterActual],
      recommended: data[i][parameterRecommended]
    });
  }

  return sData;
}

export const setHeatLossDataSet = (heatLossData, setHeatLossChartData, setHeatLossMin, setHeatLossMax, setHeatLossAvg, setHeatLossParameterList) =>{
  let data = setDataSet(heatLossData,"Heat Loss");
  

  setHeatLossChartData(data.dataSet);
  setHeatLossMin(data.min);
  setHeatLossMax(data.max);
  setHeatLossAvg(data.avg);
  if(data?.lastActual){

    setHeatLossParameterList([
      {
        parameter: "Fuel Rate",
        actual: data.lastActual["Fuel Rate Actual"],
        recommended: data.lastActual["Fuel Rate Recommended"]
      },
      {
        parameter: "Oxygen",
        actual: data.lastActual["Oxygen Actual"],
        recommended: data.lastActual["Oxygen Recommended"]
      },
      {
        parameter: "Raw Material",
        actual: data.lastActual["Raw Material Actual"],
        recommended: data.lastActual["Raw Material Recommended"]
      },
      {
        parameter: "Hot blast",
        actual: data.lastActual["Hot blast Actual"],
        recommended: data.lastActual["Hot blast Recommended"]
      }
    ]);
  }
}