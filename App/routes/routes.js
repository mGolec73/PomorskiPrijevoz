
const express = require('express');
const db = require('../db')
const router = express.Router();
const AppError = require("../utils/AppError");
var bodyParser = require('body-parser');
const { json } = require('body-parser');
var jsonParser = bodyParser.json()
const fs = require("fs");

router.put('/update/:id',jsonParser,async(req,res,next)=>{
   const id = parseInt(req.params.id);
   const nazivBroda = `SELECT nazivbroda from prevozi where oznakalinije = $1;`;
   const sqlQuery = `UPDATE linija SET tiplinije =$1,cijena = $2, dodatansadržaj = $3, okružje =$4, vrijemevožnje =$5, odredište =$6, polazište=$7, 
      oznakalinije =$8,opis=$9,stajališta=$10,brojpolazakaudanu=$11 where oznakalinije = $12;`
   const sqlQuery1 = `UPDATE brod SET nazivbroda = $1, vrstabroda = $2, vlasnikbroda = $3, kapacitet = $4 where nazivbroda = $5`;

   try{
      const linija = (await db.query(`SELECT * from linija natural join prevozi natural join brod where oznakalinije = $1;`,[id])).rows;
      //console.log(linija);
      const nazivbroda = (await db.query(nazivBroda,[id])).rows;
      console.log(nazivbroda[0].nazivbroda);
      if(linija.length > 0){
         await db.query(sqlQuery,[req.body.tiplinije, req.body.cijena, req.body.dodatansadržaj,req.body.okružje, req.body.vrijemevožnje, req.body.odredište,
            req.body.polazište, req.body.oznakalinije, req.body.opis, req.body.stajališta, req.body.brojpolazakaudanu,req.params.id]);
         await db.query(sqlQuery1,[req.body.nazivbroda, req.body.vrstabroda,req.body.vlasnikbroda, req.body.kapacitet, nazivbroda[0].nazivbroda]);
         console.log("uneseno u bazu");
         const novalinija = (await db.query(`SELECT * from linija natural join prevozi natural join brod where oznakalinije = $1;`,[req.body.oznakalinije])).rows;
         //console.log(linija1);
         console.log(req.body.nazivbroda);
            const wrapper = { status:"Updated",
                              message:`Updated line where oznaka linije = ${id}`,
                              OldValues:linija,
                              NewValues:novalinija
                        
                        };
            res.status(200).send(wrapper);
      } else{
         throw new AppError(`Line with id=${id} does not exist, add it as new line`,400, `Bad request`);
      }
   } catch(err){
      next(err);
   }
   

})

router.post('/addNew',jsonParser,async (req,res,next)=>{
   
   console.log(req.body);
   const sqlQuery = `INSERT into linija (tiplinije,cijena, dodatansadržaj, okružje, vrijemevožnje, odredište, polazište, oznakalinije,opis,stajališta,brojpolazakaudanu) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) returning *;`
   const sqlQuery2 = `INSERT into brod (nazivbroda, vrstabroda,
      vlasnikbroda, kapacitet) values ($1, $2, $3,$4) returning *;`
   const sqlQuery3 = `INSERT into prevozi (oznakalinije, nazivbroda) values ($1, $2) returning *;`

   try{
      const q1 = await db.query(sqlQuery,[req.body.tiplinije, req.body.cijena, req.body.dodatansadržaj,req.body.okružje, req.body.vrijemevožnje, req.body.odredište,
         req.body.polazište, req.body.oznakalinije, req.body.opis, req.body.stajališta, req.body.brojpolazakaudanu]);

      const q2 = await db.query(sqlQuery2,[req.body.nazivbroda, req.body.vrstabroda,
         req.body.vlasnikbroda, req.body.kapacitet]);

      const q3 = await db.query(sqlQuery3,[req.body.oznakalinije, req.body.nazivbroda]);
if(q1.rowCount>0 && q2.rowCount>0 && q3.rowCount>0){
      const wrapper = { status:"Created",
                        message:`Created new line where oznaka linije = ${req.body.oznakalinije}`,
                        
                        };
   res.status(201).send(wrapper);}
   else{
      throw new AppError(`Invalid input`,400,`Invalid request`);
   }
   }
   catch(err){

      next(err);
   }

})
router.get('/getOpenAPi',async (req,res)=>{

      const folderPath = `${__dirname}/files/openapi.json`;
     fs.readFile(folderPath,(err,file)=>{
      if (err) {
         console.log(err);
         return res.status(500).send('Could not download file');
     } 
     res.setHeader('Content-Type','application/json');
     res.setHeader('Content-Disposition', 'attachment; filename="openapi.pdf"');
     const wrapper = {status:"OK",
                       message:"Fetched openapi file",
                       response:JSON.parse(file)};
      res.status(200).send(wrapper);});
     });
      
 

router.get('/getAll',async (req,res)=>{

   const sqlQuery = `SELECT * from linija natural join prevozi natural join brod;`;
   try {
       const rez = (await db.query(sqlQuery, [])).rows;
       
       const wrapper = {status:"OK",
                        message:"Fetched all lines with boats",
                        response:rez};
       res.status(200).send(wrapper);
       
   } catch (err) {
       console.log(err);
   } 
})
router.get('/getAllBoats',async (req,res)=>{

   const sqlQuery = `SELECT * from brod;`;
   try {
       const rez = (await db.query(sqlQuery, [])).rows;
       
       const wrapper = {status:"OK",
                        message:"Fetched all boats",
                        response:rez};
       res.status(200).send(wrapper);
   } catch (err) {
       console.log(err);
   } 
})
router.get('/support',async (req,res)=>{
   const support = {
      "message":"Welcom to support! If you have some question call contact number",
      "contact":"0958170574"
   }
   const wrapper = {status:"OK",
   message:"Fetched support",
   response:support};

res.status(200).send(wrapper);
    
})
router.get('/getBoatsWithLineId',async (req,res)=>{

   const sqlQuery = `SELECT * from brod natural join prevozi;`;
   try {
       const rez = (await db.query(sqlQuery, [])).rows;
       const wrapper = {status:"OK",
                        message:"Fetched all boats with LinesId",
                        response:rez};
       res.status(200).send(wrapper);
   } catch (err) {
       console.log(err);
   } 
})


router.get('/getOneBoat/:id',async (req,res,next)=>{
   const id = req.params.id;
   const sqlQuery = `SELECT * from brod where nazivBroda = $1;`;
   try {
       const rez = (await db.query(sqlQuery, [req.params.id])).rows;
      
       if(rez.length>0){
       const wrapper = {status:"OK",
                        message:"Fetched boat"+" "+ req.params.id,
                        response:rez};
       res.status(200).send(wrapper);}
       else {
         throw new AppError("Boat "+" "+ req.params.id +" " + "doesn't exist",400,`Bad request`);
       }
      }
      
   catch (err) {
      next(err);
   } 
})

router.get('/getOne/:id',async (req,res,next)=>{
   const id = parseInt(req.params.id);
   const sqlQuery = `SELECT * from linija natural join prevozi natural join brod where oznakalinije = ${id};`;
   try {
       const rez = (await db.query(sqlQuery, [])).rows;
       const schema = { "@context": {
         "@vocab": "http://schema.org/",
         "nazivBroda": "name",
         "oznakalinije": "identifier",
         "cijena": "totalPrice",
         "vrijemevožnje": "Time",
         "odredište": "arrivalBoatTerminal",
         "polazište": "departureBoatTerminal",
         "opis": "description",
         "stajališta": "itinerary"
       }}
       
       if(rez.length>0){
       const wrapper = {status:"OK",
                        message:"Fetched line"+" "+ req.params.id +" " + "with boats",
                        response:{schema, rez}};
       res.status(200).send(wrapper);}
       else {
         throw new AppError("Fetched line"+" "+ req.params.id +" " + "with boats doesn't exist",400,`Bad request`);
       }
      }
      
   catch (err) {
      next(err);
   } 
})

router.delete('/delete/:id',jsonParser,async (req,res,next)=>{
   const id = parseInt(req.params.id);
   const sqlQuery2 = `SELECT * from linija where oznakalinije = ${id};`;
   const sqlQuery = `DELETE from linija where oznakalinije = ${id};`;
   //const sql =`SELECT nazivbroda from prevozi where oznakalinije = ${id};`;
   try {
      //const naziv = (await db.query(sql,[])).rows;
      //console.log(naziv);
      //console.log(naziv[0].nazivbroda);
      //const query3 = `DELETE from brod where nazivbroda = ${naziv[0].nazivbroda};`;
      const rez1 = (await db.query(sqlQuery2,[])).rows;
      const rez = await db.query(sqlQuery, []);
      //const rez2 = await db.query(query3,[]);
      
      if(rez1.length>0){
      const wrapper = {status:"OK",
                       message:"Deleted line" + " "+ req.params.id +" " + "with boats",
                       //response:rez
                     };
      res.status(200).send(wrapper);}
      else {
        throw new AppError("Error on deleting line"+" "+ req.params.id +" " + "with boats",400,`Bad request`);
      }
     }
     
  catch (err) {
     next(err);
  } 
})




=======
const express = require('express');
const db = require('../db')
const router = express.Router();
const AppError = require("../utils/AppError");
var bodyParser = require('body-parser');
const { json } = require('body-parser');
var jsonParser = bodyParser.json()
const fs = require("fs");

router.put('/update/:id',jsonParser,async(req,res,next)=>{
   const id = parseInt(req.params.id);
   const sqlQuery = `UPDATE linija SET tiplinije =$1,cijena = $2, dodatansadržaj = $3, okružje =$4, vrijemevožnje =$5, odredište =$6, polazište=$7, 
      oznakalinije =$8,opis=$9,stajališta=$10,brojpolazakaudanu=$11 where oznakalinije = $12;`
   const sqlQuery1 = `UPDATE brod SET nazivbroda = $1, vrstabroda = $2, vlasnikbroda = $3, kapacitet = $4 where nazivbroda = $5`;

   try{
      const linija = (await db.query(`SELECT * from linija natural join prevozi natural join brod where oznakalinije = $1;`,[id])).rows;
      console.log(linija);
      if(linija.length > 0){
         await db.query(sqlQuery,[req.body.tiplinije, req.body.cijena, req.body.dodatansadržaj,req.body.okružje, req.body.vrijemevožnje, req.body.odredište,
            req.body.polazište, req.body.oznakalinije, req.body.opis, req.body.stajališta, req.body.brojpolazakaudanu,req.params.id]);
         await db.query(sqlQuery1,[req.body.nazivbroda, req.body.vrstabroda,req.body.vlasnikbroda, req.body.kapacitet, req.body.nazivbroda]);
         const linija1 = (await db.query(`SELECT * from linija natural join prevozi natural join brod where oznakalinije = $1;`,[req.body.oznakalinije])).rows;
         console.log(linija1);
            const wrapper = { status:"Updated",
                              message:`Updated line where oznaka linije = ${id}`,
                              OldValues:linija,
                              NewValues:linija1
                        
                        };
            res.status(200).send(wrapper);
      } else{
         throw new AppError(`Line with id=${id} does not exist, add it as new line`,400, `Bad request`);
      }
   } catch(err){
      next(err);
   }
   

})

router.post('/addNew',jsonParser,async (req,res,next)=>{
   
   console.log(req.body);
   const sqlQuery = `INSERT into linija (tiplinije,cijena, dodatansadržaj, okružje, vrijemevožnje, odredište, polazište, oznakalinije,opis,stajališta,brojpolazakaudanu) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) returning *;`
   const sqlQuery2 = `INSERT into brod (nazivbroda, vrstabroda,
      vlasnikbroda, kapacitet) values ($1, $2, $3,$4) returning *;`
   const sqlQuery3 = `INSERT into prevozi (oznakalinije, nazivbroda) values ($1, $2) returning *;`

   try{
      const q1 = await db.query(sqlQuery,[req.body.tiplinije, req.body.cijena, req.body.dodatansadržaj,req.body.okružje, req.body.vrijemevožnje, req.body.odredište,
         req.body.polazište, req.body.oznakalinije, req.body.opis, req.body.stajališta, req.body.brojpolazakaudanu]);

      const q2 = await db.query(sqlQuery2,[req.body.nazivbroda, req.body.vrstabroda,
         req.body.vlasnikbroda, req.body.kapacitet]);

      const q3 = await db.query(sqlQuery3,[req.body.oznakalinije, req.body.nazivbroda]);
if(q1.rowCount>0 && q2.rowCount>0 && q3.rowCount>0){
      const wrapper = { status:"Created",
                        message:`Created new line where oznaka linije = ${req.body.oznakalinije}`,
                        
                        };
   res.status(201).send(wrapper);}
   else{
      throw new AppError(`Invalid input`,400,`Invalid request`);
   }
   }
   catch(err){

      next(err);
   }

})
router.get('/getOpenAPi',async (req,res)=>{

      const folderPath = `${__dirname}/files/openapi.json`;
     fs.readFile(folderPath,(err,file)=>{
      if (err) {
         console.log(err);
         return res.status(500).send('Could not download file');
     } 
     res.setHeader('Content-Type','application/json');
     res.setHeader('Content-Disposition', 'attachment; filename="openapi.pdf"');
     const wrapper = {status:"OK",
                       message:"Fetched openapi file",
                       response:JSON.parse(file)};
      res.status(200).send(wrapper);});
     });
      
 

router.get('/getAll',async (req,res)=>{

   const sqlQuery = `SELECT * from linija natural join prevozi natural join brod;`;
   try {
       const rez = (await db.query(sqlQuery, [])).rows;
       
       const wrapper = {status:"OK",
                        message:"Fetched all lines with boats",
                        response:rez};
       res.status(200).send(wrapper);
       
   } catch (err) {
       console.log(err);
   } 
})
router.get('/getAllBoats',async (req,res)=>{

   const sqlQuery = `SELECT * from brod;`;
   try {
       const rez = (await db.query(sqlQuery, [])).rows;
       
       const wrapper = {status:"OK",
                        message:"Fetched all boats",
                        response:rez};
       res.status(200).send(wrapper);
   } catch (err) {
       console.log(err);
   } 
})
router.get('/getBoatsWithLineId',async (req,res)=>{

   const sqlQuery = `SELECT * from brod natural join prevozi;`;
   try {
       const rez = (await db.query(sqlQuery, [])).rows;
       const wrapper = {status:"OK",
                        message:"Fetched all boats with LinesId",
                        response:rez};
       res.status(200).send(wrapper);
   } catch (err) {
       console.log(err);
   } 
})


router.get('/getOneBoat/:id',async (req,res,next)=>{
   const id = req.params.id;
   const sqlQuery = `SELECT * from brod where nazivBroda = $1;`;
   try {
       const rez = (await db.query(sqlQuery, [req.params.id])).rows;
      
       if(rez.length>0){
       const wrapper = {status:"OK",
                        message:"Fetched boat"+" "+ req.params.id,
                        response:rez};
       res.status(200).send(wrapper);}
       else {
         throw new AppError("Boat "+" "+ req.params.id +" " + "doesn't exist",400,`Bad request`);
       }
      }
      
   catch (err) {
      next(err);
   } 
})

router.get('/getOne/:id',async (req,res,next)=>{
   const id = parseInt(req.params.id);
   const sqlQuery = `SELECT * from linija natural join prevozi natural join brod where oznakalinije = ${id};`;
   try {
       const rez = (await db.query(sqlQuery, [])).rows;
       
       if(rez.length>0){
       const wrapper = {status:"OK",
                        message:"Fetched line"+" "+ req.params.id +" " + "with boats",
                        response:rez};
       res.status(200).send(wrapper);}
       else {
         throw new AppError("Fetched line"+" "+ req.params.id +" " + "with boats doesn't exist",400,`Bad request`);
       }
      }
      
   catch (err) {
      next(err);
   } 
})

router.delete('/delete/:id',jsonParser,async (req,res,next)=>{
   const id = parseInt(req.params.id);
   const sqlQuery2 = `SELECT * from linija where oznakalinije = ${id};`;
   const sqlQuery = `DELETE from linija where oznakalinije = ${id};`;
   //const sql =`SELECT nazivbroda from prevozi where oznakalinije = ${id};`;
   try {
      //const naziv = (await db.query(sql,[])).rows;
      //console.log(naziv);
      //console.log(naziv[0].nazivbroda);
      //const query3 = `DELETE from brod where nazivbroda = ${naziv[0].nazivbroda};`;
      const rez1 = (await db.query(sqlQuery2,[])).rows;
      const rez = await db.query(sqlQuery, []);
      //const rez2 = await db.query(query3,[]);
      
      if(rez1.length>0){
      const wrapper = {status:"OK",
                       message:"Deleted line" + " "+ req.params.id +" " + "with boats",
                       //response:rez
                     };
      res.status(200).send(wrapper);}
      else {
        throw new AppError("Error on deleting line"+" "+ req.params.id +" " + "with boats",400,`Bad request`);
      }
     }
     
  catch (err) {
     next(err);
  } 
})

module.exports = router;