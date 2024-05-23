import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Header.module.css";
import { FaSearch, FaChevronDown } from "react-icons/fa";

const Header = ({ handleFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("All Images");

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (tag) => {
    handleFilter(tag);
    setIsOpen(false);
  };
  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setDropdownOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerBackground}>
        <div className={styles.headerContent}>
          <div className={styles.menuBar}>
            <h1><Link to="/" style={{color:"white", textDecoration:"inherit"}}>#Hashtag</Link></h1>
            <nav className={styles.menu}>
              <ul>
                <li>
                  <div className="dropdown">
                    <button
                      className="btn dropdown-toggle"
                      type="button"
                      onClick={handleToggle} style={{color:'white', border: "2px", solid: "#FFFFFF"}}
                    >
                      Explore
                    </button>
                    <ul
                    className={`dropdown-menu ${isOpen ? "show" : ""}`}
                    style={{
                        display: isOpen ? "block" : "none"
                    }}
                  >
                    <li className={styles.dropdownItem} onClick={() => handleItemClick("Food")}>Food</li>
                    <li className={styles.dropdownItem} onClick={() => handleItemClick("Travel")}>Travel</li>
                    <li className={styles.dropdownItem} onClick={() => handleItemClick("Nature")}>Nature</li>
                    {/* Add more hashtag items as needed */}
                  </ul>
                  </div>
                </li>
                <li>
                  <Link to="/login" className="btn btn-outline-light">Login</Link>
                </li>
                <li>
                  <Link to="/signup" className="btn btn-light">Sign Up</Link>
                </li>
              </ul>
            </nav>
          </div>
          
          {/* <div className={styles.searchBar}>
          <div className={styles.quote}>
            <h2>Let’s Find The Perfect Free Photo For You</h2>
          </div>
             <input className=""
               type="text"
               placeholder="Search for all images on #Hashtag"
             />
           </div> */}
           <div className={styles.searchBar}>
            <div className={styles.quote}>
              <h2>Let’s Find The Perfect Free Photo For You</h2>
            </div>
            <div className={styles.searchContainer}>
              <div className={styles.searchIcon}>
                <FaSearch />
              </div>
              <input
                type="text"
                placeholder="Search for all images on #Hashtag"
                className={styles.searchInput}
              />
              <div className={styles.dropdown}>
                <button
                  className={styles.dropdownButton}
                  onClick={handleDropdownToggle}
                >
                  {selectedOption}<FaChevronDown />
                </button>
                <ul
                  className={`${styles.dropdownMenu} ${dropdownOpen ? styles.show : ""}`}
                >
                  <li className={styles.dropdownItem} onClick={() => handleOptionSelect("All Images")}>Nature</li>
                  <li className={styles.dropdownItem} onClick={() => handleOptionSelect("Photos")}>Food</li>
                  <li className={styles.dropdownItem} onClick={() => handleOptionSelect("Illustrations")}>Travel</li>
                  <li className={styles.dropdownItem} onClick={() => handleOptionSelect("Vectors")}>Happy</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
