
const express = require('express'); //Line 1
var bodyParser = require('body-parser')
const app = express(); //Line 2
const port = process.env.PORT || 5000; //Line 3
const pg = require('pg')
const session = require('express-session')
const db = require('./db')
const pgSession = require('connect-pg-simple')(session)
const fs=require('fs')
const routes = require('./routes/routes');
const AppError = require("./utils/AppError");
var jsonParser = bodyParser.json()



// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

// create a GET route
//Line 11

//middleware - dekodiranje parametara
app.use(express.urlencoded({ extended: true }));

app.use(session({  //inicijalizira express-session middleware
    store: new pgSession({
        pool: db.pool
    }),
    resave: false,
    secret: "Pomorski", //služi za hash
    saveUninitialized: true
}))

app.use('/api',routes);


app.all('*',(req,res,next)=>{
    const err = new AppError(`Requested URL ${req.path} not found!`, 404, `Not found`);
    next(err);
})
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const status1 = err.status || "Internal server error";
    const wrapper = {  status:status1,
                       message:err.message,
                       response:null};
    res.status(statusCode).send(wrapper);
})


app.get('/getLinija',async (req, res) => { //Line 9
    
    const sqlQuery = `SELECT * FROM linija;`;
    //res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
    try {
        const rez = (await db.query(sqlQuery, [])).rows;
        res.send({linije: rez});
    } catch (err) {
        console.log(err);
    } 
});

app.get('/getBrod',async (req, res) => { //Line 9
    
    const sqlQuery = `SELECT * FROM brod;`;
    //res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
    try {
        const rez = (await db.query(sqlQuery, [])).rows;
        res.send({brodovi: rez});
    } catch (err) {
        console.log(err);
    } 
});
app.get('/getLinije',async (req, res) => { //Line 9
    
    const sqlQuery = `SELECT * from linija natural join prevozi natural join brod;`;
    //res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
    try {
        const rez = (await db.query(sqlQuery, [])).rows;
        res.send({linije: rez});
    } catch (err) {
        console.log(err);
    } 
});


app.post("/createCSVFile",jsonParser, async (req, res) =>{
    
   
    let filterArray=req.body.filterArray;
    let string=""
    let arrayKeys=Object.keys(filterArray[0]);
    let keys_num=arrayKeys.length;
    let counter=0;
    for(let key of arrayKeys){
        counter++;
        string+= counter===keys_num ? key : key +","
    }
    fs.writeFile('./client/public/test2.txt', string + "\n", { flag: 'w+' }, err => {
        if (err) {
          console.error(err);
        }
        // file written successfully
      });
    string=""
    for(let arrayItem of filterArray){
        counter=0;

        arrayKeys.forEach(
            (key)=>{ 
                counter++; 
                string+= counter===keys_num ? arrayItem[key] : (arrayItem[key] + ",")}
                )
        fs.writeFile('./client/public/test2.txt', string + "\n", { flag: 'a+' }, err => {
            if (err) {
              console.error(err);
            }
          });
          string="";

    }
    
      res.send(filterArray)

})

app.post("/createJSONFile",jsonParser, async (req, res) =>{
    const dataColumns=[
        "oznakalinije",
        "tiplinije",
        "polazište",
        "odredište",
        "stajališta",
        "okružje",
        "vrijemevožnje",
        "cijena",
        "brojpolazakaudanu",
        "dodatansadržaj",
        "opis"
    ]
    const innerColumns=[
        "nazivbroda",
        "vrstabroda",
        "vlasnikbroda",
        "kapacitet"
   ]

    let filterArray=req.body.filterArray;
   //console.log(filterArray)
    let outputObj={}
    let outputArray=[];
    let currID=filterArray[0].oznakalinije
    for(let row of filterArray){
        if(currID===row.faksid){
            dataColumns.forEach(key=>{ outputObj[key]=row[key]})
            let brodArray=outputObj["brod"] || []
            let innerObj={}
            innerColumns.forEach(key=>{ innerObj[key]=row[key]})
            brodArray.push(innerObj)
            outputObj["brod"]=brodArray;
        }else{
            //console.log(outputObj)
            outputArray.push(outputObj)
            outputObj={};
            currID=row.oznakalinije
            dataColumns.forEach(key=>{ outputObj[key]=row[key]})
            let brodArray=outputObj["brod"] || []
            let innerObj={}
            innerColumns.forEach(key=>{ innerObj[key]=row[key]})
            brodArray.push(innerObj)
            outputObj["brod"]=brodArray;
        }
    }
    outputArray.push(outputObj)

    let string=JSON.stringify({linije: outputArray})
    fs.writeFile('./client/public/test3.txt', string + "\n", { flag: 'w+' }, err => {
        if (err) {
          console.error(err);
        }
      });
     res.send(filterArray)

})

  