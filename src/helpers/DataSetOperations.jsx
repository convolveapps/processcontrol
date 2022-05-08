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

export const setHeatLossDataSet = (heatLossData, setHeatLossChartData) =>{
  let data = setDataSet(heatLossData,"Heat Loss");
  

  setHeatLossChartData({
    chartData: data.dataSet,
    min: data.min,
    max: data.max,
    avg: data.avg,
    lastActual: [
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
    ]

  });
}

export const setHotMetalDataSet = (hotMetalData, setHotMetalChartData) =>{
  let data = setDataSet(hotMetalData,"Hot Metal Temperature");
  

  setHotMetalChartData({
    chartData: data.dataSet,
    min: data.min,
    max: data.max,
    avg: data.avg,
    lastActual: [
      {
        parameter: "Silicon",
        actual: data.lastActual["Silicon Actual"],
        recommended: data.lastActual["Silicon Recommended"]
      },
      {
        parameter: "Phosphorous",
        actual: data.lastActual["Phosphorous Actual"],
        recommended: data.lastActual["Phosphorous Recommended"]
      },
      {
        parameter: "Slag",
        actual: data.lastActual["Slag Actual"],
        recommended: data.lastActual["Slag Recommended"]
      }
    ]
  });
}

export const setTensileStrengthDataSet = (tensileStrengthData, setTensileStrengthChartData) =>{
  let data = setDataSet(tensileStrengthData,"Tensile Strength");
  

  setTensileStrengthChartData({
    chartData: data.dataSet,
    min: data.min,
    max: data.max,
    avg: data.avg,
    lastActual: [
      {
        parameter: "Carbon",
        actual: data.lastActual["Carbon Actual"],
        recommended: data.lastActual["Carbon Recommended"]
      },
      {
        parameter: "Manganese",
        actual: data.lastActual["Manganese Actual"],
        recommended: data.lastActual["Manganese Recommended"]
      },
      {
        parameter: "Niobium",
        actual: data.lastActual["Niobium Actual"],
        recommended: data.lastActual["Niobium Recommended"]
      },
      {
        parameter: "Coiling Temperature",
        actual: data.lastActual["Coiling Temperature Actual"],
        recommended: data.lastActual["Coiling Temperature Recommended"]
      }
    ]
  });
}

export const setElongationDataSet = (elongationData, setElongationChartData) =>{
  let data = setDataSet(elongationData,"Elongation");
  

  setElongationChartData({
    chartData: data.dataSet,
    min: data.min,
    max: data.max,
    avg: data.avg,
    lastActual: [
      {
        parameter: "Tension",
        actual: data.lastActual["Tension Actual"],
        recommended: data.lastActual["Tension Recommended"]
      },
      {
        parameter: "Force",
        actual: data.lastActual["Force Actual"],
        recommended: data.lastActual["Force Recommended"]
      },
      {
        parameter: "Zinc Pot Temp",
        actual: data.lastActual["Zinc Pot Temp Actual"],
        recommended: data.lastActual["Zinc Pot Temp Recommended"]
      }
    ]
  });
}