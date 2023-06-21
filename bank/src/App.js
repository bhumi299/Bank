import React from 'react';
import './style.css';
import {useState} from "react";
import Axios from 'axios';
import Home from './Home.js';
import Transfer from './Transfer.js';
import About from'./About.js';
import View from './View.js';
import Contact from './Contact.js';
import logo from 'C:/Users/DESTINY/bank/bank/src/images/logo.jpg';


function App() {
  const [customers,setCustomers]=useState([]);
  const [head,setHead]=useState([]);
  const [bal,setBal]= useState("");
  const [sender,setSender]= useState("");
  const [receiver,setReceiver]= useState("");
  const [loading,setLoading]=useState(false);

  let correct=true;
  let senderBalance=0;
  const getCustomer=()=>{

    Axios.get("http://localhost:3001/customers").then((response)=>{
      console.log(response);
      setCustomers(response.data);
      setHead(Object.keys(response.data[0]));
    });
}


const transfers=()=>{
  setLoading(true);
    console.log(sender);
    console.log(receiver);
    console.log(bal);
    if(sender==="" || receiver===""){
      correct=false;
      setLoading(false);
      setSender("");
      setReceiver("");
      setBal("");
      return(alert('Enter all Details.'))
    }
    if(bal===""){
      correct=false;
      setLoading(false);
      return(alert('Please Enter Amount.'))}
      for(const val of customers)
      {
        if(val.Name===sender){
          senderBalance=val.Balance;
        }
      }

      console.log(senderBalance);
      if(senderBalance-bal<0){
        correct=false;
        setLoading(false);
        setSender("");
        setReceiver("");
        setBal("");
        return(alert('Not enough balance'))}

      if(correct===true){

    Axios.post("http://localhost:3001/transaction",{
      sender:sender,
      receiver:receiver,
      balance:bal
    }).then(()=>{
      console.log("Success");
    });

    Axios.put("http://localhost:3001/update",{
      balance:bal,
      receiver:receiver
    }).then((response)=>{
      setCustomers(
        customers.map((val)=>{
          return val.Name===receiver?
          {
            id:val.id,
            Name:val.Name,
            Email:val.Email,
            Balance:parseInt(bal)+parseInt(val.Balance),
          }
          :val.Name===sender?
          {
            id:val.id,
            Name:val.Name,
            Email:val.Email,
            Balance:parseInt(val.Balance)-parseInt(bal),
          }
          :val;
        })
      );

      alert("Successful Transaction");
      setLoading(false);
      setSender("");
      setReceiver("");
      setBal("");
    });
  }
};


  return (
    <div className="App">
      <nav className="navbar navbar-expand-md bg-dark navbar-dark">
      <a className="navbar-brand" href="/">
        <img src={logo} alt="Logo" style={{width:"40px"}}/>
      </a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="collapsibleNavbar">

        <ul className="nav nav-tabs" role="tablist" id="resp">
            <li className="nav-item">
              <a className="nav-link active" data-toggle="tab" href="#home">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-toggle="tab" href="#view">View Customers</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-toggle="tab" href="#transfer">Transfer Money</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-toggle="tab" href="#about">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-toggle="tab" href="#contact">Contact</a>
            </li>
        </ul>
      </div>
</nav>
      <div className="tab-content">
          <div id="home" className="navBar tab-pane active">
            <Home/>
          </div>
          <div id="view" className="navBar tab-pane fade" >
            <View getCustomer={getCustomer} customers={customers} head={head}/>
          </div>
          <div id="transfer" className="navBar tab-pane fade">
            <Transfer sender={sender} setSender={setSender} customers={customers} transfers={transfers} receiver={receiver} setReceiver={setReceiver} bal={bal} setBal={setBal} loading={loading}/>
          </div>
          <div id="about" className="navBar tab-pane fade">
            <About/>
          </div>
          <div id="contact" className="navBar tab-pane fade">
            <Contact/>
          </div>
      </div>
      <div className="footer">
      <p>Copyright &copy; 2023 Bhumika R- All rights reserved.</p>
      </div>
    </div>

  );
}

export default App;
