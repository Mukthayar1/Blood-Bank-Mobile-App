import React from 'react';
const AuthContex = React.createContext();


const loginreducer = (previoussttae,action)=>{
    switch(action.type)
    {
     case 'Retrive_Token':
       return {
         ...previoussttae,
         UserToken : action.token,
         Isloading : false
 
       };
 
      case 'LOGIN':
        return {
            ...previoussttae,
            UserToken : action.token,
            UserName : action.id,
            Isloading : false,
        };
 
      case 'LOGOUT':
         return {
            UserToken : null,
            UserName : null,
            Isloading : false
         };
 
      case 'REGISTER':
           return {
            ...previoussttae,
            UserToken : action.token,
            UserName : action.id,
            Isloading : false,
           };
 
    }
  }
  

  export { loginreducer ,AuthContex}