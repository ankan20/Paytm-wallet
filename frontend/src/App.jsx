import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import {SendMoney} from "./pages/SendMoney";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import ProtectedRoute from "./pages/ProtectedRoute";
import NotFound from "./pages/NotFound";
import History from "./pages/History";
const App = () => {
  return (
    <>
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute component = {<Dashboard />}/>}/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/profile" element={<ProtectedRoute component = {<Profile />}/>} />
          <Route path="/dashboard" element={<ProtectedRoute component ={<Dashboard />}/>} />
          <Route path="/send" element={<ProtectedRoute component ={<SendMoney />}/>} />
          <Route path="/history" element={<ProtectedRoute component ={<History />}/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
