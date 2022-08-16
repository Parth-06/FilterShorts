import React, {  useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

import { Postdetails } from "../../Context/FetchData";
import ShortsMain from "../Shorts/ShortsMain";


const Comedy = () => {
  const navigate= useNavigate();
  const [userdata, setuserdata] = useState([])
  const { apidata, newData } = Postdetails();

  useEffect(() => {
    const Callmainpage = async () => {
    
      try {
          const res = await fetch("/home", {
              method: "GET",
              headers: {
  
                  "Content-Type": "application/json",
                  Accept: "application/json"
              },
              credentials: "include"
          });
          const user = await res.json();
          setuserdata(user)
          if (!res.status === 200) {
              const error = new Error(res.error);
              throw error;
              
          }
      } catch (err) {
          console.log(err);
          toast.error("Please Login For Better Experience")
          navigate("/login");      
      }
  }
    Callmainpage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[newData]);

  let alldata = apidata;
  if( userdata.following === undefined){
  
  
  }else{
  
    alldata = alldata.filter(
      (items) => items.catogory === "Beauty"
     )
  }
  let newapidata = alldata

  return (
    <>
    {
      newapidata.length === 0 ? 
      <>
      <div className="not_data">
        <div className="notdata_main">
     <div className="circle_icon">
     <i className="fas fa-video"></i>
     </div>
     <h1>No Videos to Show</h1>
  
        </div>
      </div>
      </>
      :
      <ShortsMain userdata={userdata} apidata={newapidata}/>
    }
    </>
   
  )
}

export default Comedy