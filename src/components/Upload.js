import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./Profile_Header.module.css";
import uploadStyles from "./Upload.module.css";
import { FaBell, FaBars } from "react-icons/fa";

const Upload = ({ handleFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hashtags, setHashtags] = useState("");
  const [fileName, setFileName] = useState("");
  const [allHashtags, setAllHashtags] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const filter = useState("");
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Fetch hashtags from API
    const fetchHashtags = async () => {
      try {
        const response = await fetch("https://hashtag-273q.onrender.com/images");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        // Extract hashtags
        let hashtags = data.map(item => item.hashtags[0]);
        hashtags = [...new Set(hashtags)];
        // console.log(hashtags)
        setAllHashtags(hashtags);
      } catch (error) {
        console.error("Error fetching hashtags:", error);
      }
    };

    fetchHashtags();
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleItemClick = (tag) => {
    handleFilter(tag);
    setIsOpen(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName("");
    }
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    setHashtags(input);

    // Filter suggestions based on input
    const filtered = allHashtags.filter((hashtag) =>
      hashtag.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredSuggestions(filtered);
  };

  const handleSuggestionClick = (suggestion) => {
    setHashtags((prev) => `${prev.trim()} ${suggestion} `);
    setFilteredSuggestions([]);
  };
  const handleProfileDropdownToggle = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const file = fileInputRef.current ? fileInputRef.current.files[0] : null;

    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("hashtags", hashtags);
    formData.append("uploadedBy", "Mahesh"); 

    try {
      const response = await fetch("https://hashtag-273q.onrender.com/images/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Success:", result);
      alert("Image uploaded successfully!");
      setFileName("");
      setHashtags("");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to upload image.");
    }
  };
  const handleHamburgerToggle = () => {
    setHamburgerOpen(!hamburgerOpen);
  };

  const handleLogout = () => {
    // Clear local storage variables and tokens
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
    // Redirect to the login page or home page
    window.location.href = "/login";
  };

  return (
    <>
      <header className={uploadStyles.header} >
        <div className={uploadStyles.headerBackground}>
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
                        style={{ color: "white", border: "none" }}
                      >
                        Explore
                      </button>
                      <ul
                        className={`dropdown-menu ${isOpen ? "show" : ""}`}
                        style={{
                          display: isOpen ? "block" : "none",
                        }}
                      >
                        <li className={styles.dropdownItem} onClick={() => handleItemClick("Food")}>
                          Food
                        </li>
                        <li className={styles.dropdownItem} onClick={() => handleItemClick("Travel")}>
                          Travel
                        </li>
                        <li className={styles.dropdownItem} onClick={() => handleItemClick("Nature")}>
                          Nature
                        </li>
                        {/* Add more hashtag items as needed */}
                      </ul>
                    </div>
                  </li>
                  <li>
                    <FaBell className={styles.icon} />
                  </li>
                  <li>
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrCLHZeA--7ckaEIUPD-Z0XASJ5BxYQYLsdA&s"
                      alt="Profile"
                      className={styles.profilePic}
                      onClick={handleProfileDropdownToggle}
                    />
                    <ul
                        className={`${styles.dropdownMenu} ${
                          profileDropdownOpen ? styles.show : ""
                        }`} style={{top:'auto', right:'auto'}}
                      >
                        <li
                          className={styles.dropdownItem}
                          onClick={handleLogout}
                          style={{ margin: 0 }}
                        >
                          Logout
                        </li>
                      </ul>
                  </li>
                </ul>
              </nav>
              <div className={`${styles.hamburger}`}><FaBars className={`${styles.hamburgerIcon} ${styles.icon}`} onClick={handleHamburgerToggle} />
            {hamburgerOpen && (
              <div className={`${styles.hamburgerMenu}`}>
                <Link to='/login' className="btn btn-light" onClick={handleLogout}>Logout</Link>
              </div>
            )}</div>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className="container-fluid mt-5 mb-5" id={`${uploadStyles.mainContainer}`}>
          <div className="row">
            <div className="col text-center">
              <h3 className={uploadStyles.heading}>#Hashtags</h3>
              <form onSubmit={handleSubmit}>
                <div className={`${uploadStyles.uploadFiles} m-5`}>
                  <textarea
                    rows="3"
                    cols="50"
                    name=""
                    id=""
                    placeholder=""
                    value={fileName}
                    onClick={handleButtonClick}
                    readOnly
                  ></textarea>
                  <div className={`${uploadStyles.selectFiles}`}>
                    <p>Drag and drop media files anywhere on the page</p>
                    <p>(OR)</p>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                    <button
                      type="button"
                      className={`btn btn-dark ${uploadStyles.selectFilesBtn} m-3`}
                      onClick={handleButtonClick}
                    >
                      Select Files
                    </button>
                    <p>Maximum upload file size: 120 MB.</p>
                  </div>
                </div>
                <div className={`${uploadStyles.hashtagSection} m-5`}>
                  <textarea
                    rows="3"
                    cols="50"
                    placeholder="Type your image related #Hashtag text here..."
                    value={hashtags}
                    onChange={handleInputChange}
                    className={uploadStyles.hashtagInput}
                  ></textarea>
                  {filteredSuggestions.length > 0 && (
                    <div className={uploadStyles.suggestionsContainer}>
                      {filteredSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          type="button"
                          className={`btn btn-outline-light ${filter === suggestion ? styles.active : ""}`}
                          onClick={() => handleSuggestionClick(suggestion)}
                          style={{color:"black"}}
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button type="submit" className={`btn btn-dark ${uploadStyles.submitBtn} mb-5`}>
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Upload;