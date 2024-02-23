import React from "react";
import { FaSpotify } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <Link to="/">
          <FaSpotify className="icon" size={42} color="white" />
      </Link>
      <div className="links">
        <Link className="link" to="/">Home</Link>
        <Link className="link" to="/search">Search</Link>
      </div>
      <div className="buttons">
        
          <IoIosArrowBack className="icon roundButton" onClick={() => navigate(-1)} />
       
        
          <IoIosArrowForward className='icon roundButton'onClick={() => navigate(1)} />

      </div>
    </nav>
  );
};

export default Navbar;
