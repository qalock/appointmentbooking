import React from "react";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import AppointList from "./components/AppointList";
import AddAppoint from "./components/AddAppoint";

export default function App(){
  return(
    <React.Fragment>
      <BrowserRouter>
      <Routes>
        <Route path="/list" element={<AppointList/>} />
        <Route path="/" element={<AddAppoint/>} />
      </Routes>
      </BrowserRouter>
    </React.Fragment>
  )
}