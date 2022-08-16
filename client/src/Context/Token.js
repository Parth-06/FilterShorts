import React, { useContext, createContext } from "react";
import 'react-toastify/dist/ReactToastify.css';


const TokenData = createContext();

const TokenDataProvider = ({children}) =>{  
// const [userdata, setuserdata] = useState([])  


console.log(userdata);




return(
    <TokenData.Provider value={{userdata}}>
        {children}
    </TokenData.Provider>
    )

}   

export default TokenDataProvider;
export const Tokendetails = () =>{
    return useContext(TokenData)
}


