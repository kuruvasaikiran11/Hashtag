import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Profile_Header.module.css";
import { FaBell, FaSearch, FaChevronDown } from "react-icons/fa";
import { AiOutlineUpload } from "react-icons/ai";

const ProfileHeader = ({ handleFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("All Images");
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleProfileDropdownToggle = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  const handleItemClick = (tag) => {
    handleFilter(tag);
    setIsOpen(false);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setDropdownOpen(false);
  };

  const handleLogout = () => {
    // Clear local storage variables and tokens
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
    // Redirect to the login page or home page
    window.location.href = "/login";
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerBackground}>
        <div className={styles.headerContent}>
          <div className={styles.menuBar}>
            <h1 className={styles.logo}>
              <Link to="/profile" style={{ color: "white", textDecoration: "inherit" }}>
                #Hashtag
              </Link>
            </h1>
            <nav className={styles.menu}>
              <ul className={styles.menuList}>
                <li>
                  <div className="dropdown">
                    <button
                      className="btn dropdown-toggle"
                      type="button"
                      onClick={handleToggle}
                      style={{ color: 'white', border: "none" }}
                    >
                      Explore
                    </button>
                    <ul
                      className={`dropdown-menu ${isOpen ? "show" : ""}`}
                      style={{ display: isOpen ? "block" : "none" }}
                    >
                      <li className={styles.dropdownItem} onClick={() => handleItemClick("Food")}>Food</li>
                      <li className={styles.dropdownItem} onClick={() => handleItemClick("Travel")}>Travel</li>
                      <li className={styles.dropdownItem} onClick={() => handleItemClick("Nature")}>Nature</li>
                      {/* Add more hashtag items as needed */}
                    </ul>
                  </div>
                </li>
                <li>
                  <FaBell className={styles.icon} />
                </li>
                <li>
                  {/* <div className={styles.profileDropdown}>
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrCLHZeA--7ckaEIUPD-Z0XASJ5BxYQYLsdA&s"
                      alt="Profile"
                      className={styles.profilePic}
                      onClick={handleProfileDropdownToggle}
                    />
                    <ul className={`${styles.dropdownMenu} ${profileDropdownOpen ? styles.show : ""}`}>
                      <li className={styles.dropdownItem} onClick={handleLogout}>Logout</li>
                    </ul>
                  </div> */}
                  <div className={styles.profileDropdownContainer}>
  <div className={styles.profileDropdown}>
    <img
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrCLHZeA--7ckaEIUPD-Z0XASJ5BxYQYLsdA&s"
      alt="Profile"
      className={styles.profilePic}
      onClick={handleProfileDropdownToggle}
    />
    <ul className={`${styles.dropdownMenu} ${profileDropdownOpen ? styles.show : ""}`}>
      <li className={styles.dropdownItem} onClick={handleLogout}>Logout</li>
    </ul>
  </div>
</div>
                </li>
                <li>
                  <Link to="/upload" className="btn btn-light">
                    <AiOutlineUpload /> Upload
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
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

export default ProfileHeader;
