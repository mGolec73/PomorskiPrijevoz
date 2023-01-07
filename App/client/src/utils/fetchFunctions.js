
export async function getLinija(id){
    return await fetch(`http://localhost:5000/getLinija`)
      .then((response) => response.json())
      .catch((err) => console.log(err.message));
  
}
export async function refresh(){
  return await fetch(`http://localhost:5000/refresh`)
    .then((response) => response.json())
    .catch((err) => console.log(err.message));
}
export async function getBrod(id){
    return await fetch(`/getBrod`)
      .then((response) => response.json())
      .catch((err) => console.log(err.message));
  
}export async function getLinijaWithBoats(id){
    return await fetch(`http://localhost:5000/getLinijaWithBoats`)
      .then((response) => response.json())
      .catch((err) => console.log(err.message));
  
}
export async function exportCSV(filterArray){

  console.log("filterArray: "+  filterArray)

  let obj={
    filterArray: filterArray
  }

   await fetch(`http://localhost:5000/createCSVFile`,{
    method: "post",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    }
  })
    .then((response) => {
      document.getElementById("exportCSV").click();
      console.log(response.json())})
    .catch((err) => console.log(err.message));
 
  
  return;
}
export async function exportJSON(filterArray){

  let obj={
    filterArray: filterArray
  }
  console.log(filterArray)

   await fetch(`http://localhost:5000/createJSONFile`,{
    method: "post",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    }
  })
    .then((response) => {
      document.getElementById("exportJSON").click();
      console.log(response.json())
    })
    .catch((err) => console.log(err.message));
 
  
  return;
}