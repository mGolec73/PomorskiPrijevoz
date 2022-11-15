import React from "react";
import styled from "styled-components";

import { useState, useEffect } from "react";
import { getLinija, getLinijaWithBoats, exportCSV, exportJSON } from "../utils/fetchFunctions";


import DataTable from 'react-data-table-component';




const Datatable = (props) => {
  const [linije, setLinijeList] = useState([{}]);
  const [columns, setColumns] = useState([{}]);
  const [filter, setFilter] = useState("");
  const [filterOption, setFilterOption]= useState("wildcard");
  
  
  
  //console.log(columns)
  let optionArray=[]
  Object.keys(linije[0] || {}).forEach(key => optionArray.push(<option key={key} value={key}>{key}</option>))
  
  
  if(filterOption==="wildcard"){

    var linijeArray=linije.length > 0 ? 
      linije.filter((linija)=>{
        for(let value in linija){
            if(linija[value].toString().toLowerCase().includes(filter.toString().toLowerCase())) return true;
        }
        return false;
      }) : []
  }
  else{
    console.log(filterOption)
    var linijeArray=linije.length>0 ? linije.filter((value)=>{
        return value[filterOption].toString().toLowerCase().includes(filter.toString().toLowerCase())
        }) : [];
  }
 
  
  useEffect(() => {
    const res = getLinijaWithBoats().then((item) => {
      console.log(item.linije[0])
      setLinijeList(item.linije);
      let columnsTemp=[];
      
      Object.keys(item.linije[0]).forEach(key => columnsTemp.push({name: key, selector: (row)=>row[key]}))
      console.log(columnsTemp)
      setColumns(columnsTemp);
    });
  }, []);
   
  let handleChange=(event)=>{
    console.log(event.target.value)
    setFilter(event.target.value);

  }
  return (<>
  <CustomOuter>
    <Section>
      <a id ="back" href="/">Povratak</a>
      <div>Tablica podataka:</div>
        <form onSubmit={(e) => e.preventDefault()}>
            <select value={filterOption} onChange={(e) => setFilterOption(e.target.value)}>
                <option value={"wildcard"}>Općenito</option>
                {optionArray}
            </select>
          <input type="text" name="filter" id="filter" placeholder="Pretraži" value={filter} onChange={(event)=>{handleChange(event)}}></input>
          
        </form>
        
        
        </Section>
        <DataTable
            columns={columns}
            data={linijeArray}
            pagination
            highlightOnHover
          
        />
        <ExportButton onClick={()=>exportCSV(linijeArray)}> EXPORT CSV</ExportButton>
        <ExportButton onClick={()=>exportJSON(linijeArray)}> EXPORT JSON</ExportButton>
        <a hidden id="exportCSV" href="./test2.csv" download="linije" target="_blank"></a>
        <a hidden id="exportJSON" href="./test3.json" download="linije" target="_blank"></a>
        </CustomOuter>
    </>
  );
  
};

export default Datatable;

//styles

const CustomOuter = styled.div`
background:rgba(255, 7, 0, 0.55);
`;
const Section= styled.section`
    margin-left: 10px;
    a{
      color:black;
    }
    form{
      padding-left:10px;
    }

`;

const ExportButton=styled.button`
background: palevioletred;
border-radius: 3px;
border: 2px solid palevioletred;
color: white;
margin: 10px;
padding: 5px;

`;