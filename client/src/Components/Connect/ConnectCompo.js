import React, {  useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "../Followers/FollowersMain.css"
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { Postdetails } from '../../Context/FetchData';
import Spinner from '../Spinner';

const ConnectCompo = () => {
    const [userdata, setuserdata] = useState([])
    const [alluserdata, setalluserdata] = useState([])
    const {  dispatch, newData } = Postdetails();
    const navigate = useNavigate();

    let alldata = alluserdata;
    if(alluserdata){
      alldata = alldata.filter(
       (items) => items.email !== userdata.email
      )
    
    }
    let newuserdata = alldata
  

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

      useEffect(()=>{
        const Fetchposts =async () =>{ 
      
            const res = await fetch('/connect',{
              method: "GET",
              headers:{
                "Content-Type" : "application/json"
              },
            });
          
            const data = await res.json();
            setalluserdata(data)
          }
          Fetchposts();
      
      },[newData])
  return (
    
     <>
    {
    userdata.following === undefined  || userdata.followers === undefined? 
    <Spinner/>
    :
    <>
 {
        newuserdata.map ((item)=>{
            return(
<div className="connect_main" key={item.username}>
         <Link to={item.username !== userdata.username ? "/profile/"+item.username : "/profile"}>
     {/* <div className="avatar" style={{marginLeft:"0rem"}}></div> */}
     <img src={item.profilepicimage} className="avatar" alt='' style={{objectFit:"cover", marginLeft:"0rem"}}/>
     </Link>
      
      <Link to={item.username !== userdata.username ? "/profile/"+item.username : "/profile"} className="for_link">
      <div className="usernamefollow">
          <h3>{item.name}</h3>
          <p>{item.username}</p>
      </div>
      </Link>
 
      <div className="button_connect">
      {
        userdata.following.includes(item.username) ?
        <button className='profilebtn' style={{marginTop:"0rem"}} onClick={()=>dispatch({
            type: 'UNFOLLOW',
            payload: item.username,
          })}>Unfollow</button>
        :
        <button className='profilebtn' style={{marginTop:"0rem"}} onClick={()=>dispatch({
            type: 'FOLLOW',
            payload: item.username,
          })}>Follow</button>
    
        } 
      </div>
  </div>
            )
        })

    }
  
    </>
}

   
  </>
  )
}

export default ConnectCompo