export const ParameterList = ({data, setParameterName}) =>{
  return (
    data ?
    <>
      <select className='parameter-option' onChange={()=>setParameterName(event.target.value)}>
        {
          data.map((x, index)=>(
            <option key={x.parameter} value={x.parameter}>{x.parameter}</option>
          ))
        }
      </select>
    </>
    :
    <></>
  )
}

const ParameterTable = ({data,handelParameterAction}) => {
  return (
      data ?
      <>
        <table className='tbl tbl-bordered tbl-hover'>
          <thead>
            <tr>
              <th>Parameter</th>
              <th>Actual</th>
              <th>Recommended</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((x, index) => (
                <tr key={index}>
                  <td>{x.parameter}</td>
                  <td>{x.actual}</td>
                  <td>{x.recommended}</td>
                  <td>
                    <div className="btn-container">
                      <i className="fa-solid fa-circle-check text-success" onClick={() => handelParameterAction(true)}></i>
                      <i className="fa-solid fa-circle-xmark text-danger" onClick={() => handelParameterAction(false)}></i>
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </>
      :
      <></>
  )
}

export default ParameterTable