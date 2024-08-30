import React, { useEffect } from 'react';
import '../App.css';
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';

const Login = () => {  

  const navigate = useNavigate();

  const navHome = () => {navigate("/")};
  const navSignup = () => {navigate("/signup")};
  const navLogin = () => {navigate("/login")};
  const navOrder = () => {navigate("/order")};
  const navBest = () => {navigate("/bestsellers")};
  const navSale = () => {navigate("/sale")};

  return (
    <div>
        <Helmet>
          <title>Login | OLIVE YOUNG Global</title>
        </Helmet>

      <header>
        <div className="logo">
          <button onClick={navHome}><img src={process.env.PUBLIC_URL + './logo.svg'} alt="logo" /></button>
        </div>
        <div className="header-search">
          <input type="text" placeholder="Search for a product or brand..." />
          <button><img src="icon_search_md.png" alt="search icon" style={{ width: '28px', height: '28px', padding: '2px', marginRight: '2px' }}/></button>
        </div>

        {/* <div className="header-links">
          <button onClick={navSignup}>Sign up</button>
          <button onClick={navLogin}>Log in</button>
          <button onClick={navOrder}>Order</button>
        </div> */}
      </header>

      <div className="nav-bar-cont">
        <ul className="nav-bar">
          <div className="menu1">
            <li className="mhl"> <button onClick={navBest}>BEST SELLERS</button></li>
          </div>
          <div className="menu2">
            <li className="mhl"><button onClick={navSale}>SALE</button></li>
          </div>
        </ul>
      </div>

      <main>
       
      </main>

      <footer>
        {/* Footer content here */}
      </footer>
    </div>
  );
};

export default Login;
