import React from "react";
import Home from "./Home";
import Signup from "./Signup";
import Login from "./Login";
import Order from "./Order";
import Best from "./BestSellers"
import Sale from "./Sale"
import Detail from "./Detail"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} exact/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/order" element={<Order />}/>
        <Route path="/bestsellers" element={<Best />}/>
        <Route path="/sale" element={<Sale />}/>
        <Route path="/product/:id" element={<Detail />}/>
      </Routes>
    </Router> 
  );
}

export default App;