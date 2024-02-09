

import {  Route, Routes } from 'react-router-dom';
import Home from './component/Home/Home';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
export const UserContext = createContext();

function App() {
  const [user,setUser]=useState(null)
  useEffect(()=>{
    axios.get('https://dummyjson.com/users')
    .then(function (response) {
      // handle success
      setUser(response?.data.users
        );
    })
    .catch(function (error) {
      console.log(error);
    })
  },[])
 
  return (
    <div className="App">
      <UserContext.Provider value={user}>
      <Routes>
    <Route path='/' element={<Home/>}></Route>
    {/* <Route path='/room/:roomId' element={<RoomPage/>}></Route> */}
 
   </Routes>
   </UserContext.Provider>
    </div>
  );
}

export default App;
