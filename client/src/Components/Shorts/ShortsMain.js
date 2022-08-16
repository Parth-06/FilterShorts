import "./Shorts.css"
import React, { useEffect, useRef, useState } from 'react'
import {  Link, useLocation, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Postdetails } from "../../Context/FetchData";
import Spinner from "../Spinner";
import { useInView } from "react-intersection-observer";

const ShortsMain = (props) => {
  const { ref  , inView } = useInView({
    ref:[],
    threshold: []
  });
const videoRef = useRef([])
const volumeRef = useRef([])
const userdata = props.userdata
const apidata = props.apidata
const { topicstate: {query}, dispatch} = Postdetails();
const navigate= useNavigate();
const location = useLocation();
const [playing, setPlaying] = useState(false);

let newapidata = apidata

if (query !== "") {
  newapidata = newapidata.filter((prod) =>
  prod.caption.toLowerCase().includes(query.toLowerCase()) || prod.catogory.toLowerCase().includes(query.toLowerCase()) || prod.name.toLowerCase().includes(query.toLowerCase())
  
) 

}
const handlevideoclick = (index) =>{
if (playing){
  videoRef.current[index].pause();
  setPlaying(false)
  // console.log(videoRef.current[index]);
}else{
  videoRef.current[index].play();
  setPlaying(true)
  // console.log(videoRef.current[index]);
}
}

const handlevolume = (index) =>{
  videoRef.current[index].volume = 1.0;
}
useEffect((index) => {
  if(inView){
    console.log(ref[index]);
    console.log("yes");
  }else{
    console.log(ref[index]);
    console.log("nope");
  }

  
}, [inView])


  return (

    <>
     {
     userdata.following === undefined  ? 
     <div className="sipnnerstyle">
     <Spinner/>
     </div>
    
      :
      <div className='Shorts'>
        <div className="scrollshorts">
      {
        newapidata.slice(0).reverse().map((item, index)=>{
          return(
            <div className="shots_area" key={item.id}  >
            <div className="area_header">
            <Link to={item.username !== userdata.username ? "/profile/"+item.username : "/profile"} className="for_link">
            <img src={item.profilepicimage} className="shorts_avatar" alt=''  style={{objectFit:"cover"}}/> </Link>
            <div className="username">
          <div className="post_details">
          <Link to={item.username !== userdata.username ? "/profile/"+item.username : "/profile"} className="for_link">
            <h4>{item.name}</h4>
            </Link>
            <Link to={item.username !== userdata.username ? "/profile/"+item.username : "/profile"} className="for_link">
            <p>{item.username}</p> </Link>
           
          </div>
          <div className='user_caption'>
            <p>{item.caption}</p>
            <p style={{fontWeight:"600"}}>#{item.catogory}</p>
           
          </div>
            </div>
            {
              item.username === userdata.username ? 
              <></>
              : 
              userdata.following.includes(item.username) ?
              <button className='followbtn'onClick={()=>dispatch({
                type: 'UNFOLLOW',
                payload: item.username,
              })}>Unfollow</button>
              :
              <button className='followbtn' onClick={()=>dispatch({
                type: 'FOLLOW',
                payload: item.username,
              })}>Follow</button>
             }
          
            </div>
            <div className="video_area">
             <div className="mobile_topheader">
              <p onClick={()=>navigate("/")} style={location.pathname === "/" ? {color:"rgb(221, 6, 78)", fontWeight:"600"} : {color:"white"}}>For You</p>
              <p onClick={()=>navigate("./following")} style={location.pathname === "/following" ? {color:"rgb(221, 6, 78)", fontWeight:"600"} : {color:"white"}}>Following</p>
             </div>
             {/* <div className="volume_control">
             <i className="fas fa-volume-up" onClick={handlevolume(index)} ref={(element) => {volumeRef.current[index] = element}}> </i>
             <i class="fas fa-volume-mute"></i>
             </div> */}
             <video src={item.video}  loop ref={(element) => {videoRef.current[index] = element}} onClick={()=>handlevideoclick(index)} />
             {/* <video src={item.video}  loop ref={(element) => {videoRef.current[index] = element}} onClick={()=>handlevideoclick(index)} /> */}
           
            <div className="like_sec">
           <div className="onlylikes">
                {
                    item.Likes.includes(userdata.email)
                    ?
                    <>
                    <div className="like_circle" onClick={()=>dispatch({
                    type: 'UnLike',
                    payload: item.id,
                  })}>
                    <i className="fas fa-heart" style={{marginRight:"0rem", color:"rgb(221, 6, 78)"}}></i>
                      </div>
                      </>
                    :
                    <>
                     <div className="like_circle" onClick={()=>dispatch({
                    type: 'Like',
                    payload: item.id,
                  })}>
                     <i className="fas fa-heart" style={{marginRight:"0rem", color:"black"}} ></i>
                     </div>
                    </>
                   

                }
          
                {
                  item.Likes.length>0?
                  <p className='Like_number'>{item.Likes.length}</p>
                  :
                  <p className='Like_number' style={{color: "black"}}></p>
                }
             
             </div>
             <div className="bookmarksec">

         
                {
                  userdata.bookmark.includes(item.id) ?
                  <div className="like_circle" onClick={()=>dispatch({
                    type: 'UnBookmark',
                    payload: item.id,
                  })}>
               <i className="fas fa-bookmark" style={{marginRight:"0rem", color:"rgb(221, 6, 78)"}} ></i>
                </div>
            
                :
                <div className="like_circle" onClick={()=>dispatch({
                  type: 'Bookmark',
                  payload: item.id,
                })}>
                       <i className="fas fa-bookmark" style={{marginRight:"0rem", color:"black"}} ></i>
                  </div>
           
                } 
                    </div>
            </div>
            </div>
          </div>
          )
        
        })
      }
   </div>
    </div>
     }
    </>
   
  )
}

export default ShortsMain