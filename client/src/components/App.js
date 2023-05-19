import React, {useState, useEffect} from"react"
import '../assets/App.css';
import LoginOrSignup from './LoginOrSignup';
import Home from './Home';
import { Route, Routes, Navigate} from "react-router-dom";
import { useRecoilState } from 'recoil'
import { userState } from "../recoil/atoms"

function App() {
const [ user, setUser ] = useRecoilState(userState);

  useEffect(() => {
    // auto-login
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
    if(user){
      <Navigate to="/home" />
    }
  }, []);


  if (!user) return <LoginOrSignup/>

  return (
    <div className="App">
      <Home/>
      <Routes>
        <Route path="/home" element={<> <Home/> </>} />
      </Routes>
    </div>
  );
}

export default App;