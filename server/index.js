const express = require('express');
const app=express();
const mysql=require("mysql");
const cors=require("cors");
const PORT=3001;


app.use(cors());
app.use(express.json());

const db=mysql.createConnection({
  user:"root",
  host:"127.0.0.1",
  password:"root",
  database:"five_db"
});
app.post('/transaction',(req,res)=>{
  const sender=req.body.sender;
  const receiver=req.body.receiver;
  const balance=req.body.balance;
if(balance>0){
  db.query("INSERT INTO Transfers (Sender,Reciever,Amount) VALUES (?,?,?)",
  [sender,receiver,balance],(err,result)=>{
      if(err){
        console.log(err);
      }
      else{
        res.send("Values Inserted.");
      }
  }
);
}
});


app.get('/customers',(req,res)=>{
  db.query("SELECT * FROM Customers",(err,result)=>{
    if(err){
      console.log(err);
    }
    else{
      res.send(result);
    }
  });
});


app.put("/update",(req,res)=>{
  const receiver=req.body.receiver;
  const balance=req.body.balance;
  db.query(
    "UPDATE Customers SET Balance=? WHERE Name=?",
    [balance,receiver],
    (err,result)=>{
      if(err){
        console.log(err);
      }else{
        res.send(result);
      }
    }
  );
});


app.listen(process.env.PORT || PORT,()=>{
  console.log(`Server Running on port ${PORT}`);
});
