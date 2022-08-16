import React, {  useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./FollowersMain.css"
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { Postdetails } from '../../Context/FetchData';
import Spinner from '../Spinner';

const FollowersMain = () => {
    const navigate = useNavigate();
    const [userdata, setuserdata] = useState([])
    const [alluserdata, setalluserdata] = useState([])
    const { dispatch, newData } = Postdetails();
    let alldata = alluserdata;
    if(alluserdata && userdata.followers !== undefined){
      alldata = alldata.filter(
       (items) =>  userdata.followers.includes(items.username)
      )
    
    }
    let newtweetdata = alldata

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
<div className='followers_main'>
        <div className="followers">
        <div className="Followers_header">
      <h1 style={{cursor:"pointer"}}><i onClick={()=>navigate("/profile")}className="fas fa-arrow-left"></i>{userdata.name}</h1>

      </div>
      <div className="follwers_header">
        <h3 style={{color:"black", fontWeight:"600", borderBottom:"2px solid rgb(221, 6, 78)"}}>Followers</h3>
        <h3  onClick={()=>navigate("/followingmain")} >Following</h3>
      </div>
      {
          (newtweetdata.length !== 0) ?
          
             <div className="connect">

             {
                 newtweetdata.map ((item)=>{
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
           
           </div>
           :
           <div className="notdata_main" style={{height:"20rem"}}>
          <div className="circle_icon">
          <i className="fas fa-users"></i>
          </div>
          <h1>No Followers </h1>
     
             </div>
             
      }
    
   
        </div>
        </div>
}
</>
    
  )
}

export default FollowersMain