import "../Shorts/Shorts.css"
import React, {  useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { Postdetails } from "../../Context/FetchData";
import ShortsMain from "../Shorts/ShortsMain";


const Saved = () => {
  const navigate= useNavigate();
  const [userdata, setuserdata] = useState([])
  const { apidata, newData} = Postdetails();


  let alldata = apidata;
  if(apidata && userdata.bookmark === undefined){
  
  
  }else{
    alldata = alldata.filter(
      (items) => userdata.bookmark.includes(items.id)
     )
  }
  let newapidata = alldata

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
     <h1>No Saved Posts Yet</h1>
  
        </div>
      </div>
      </>
      :
      <ShortsMain userdata={userdata} apidata={newapidata}/>
    }

    </>
   
  )
}

export default Saved