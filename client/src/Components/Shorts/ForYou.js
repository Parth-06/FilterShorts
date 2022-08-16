import "./Shorts.css"
import React, {  useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import ShortsMain from "./ShortsMain";
import { Postdetails } from "../../Context/FetchData";


const ForYou = () => {
  const navigate= useNavigate();
  const [userdata, setuserdata] = useState([])
  const { apidata , newData} = Postdetails();


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
   <ShortsMain userdata={userdata} apidata={apidata}/>
    </>
   
  )
}

export default ForYou