import React, { useState, useRef } from "react";
import {Link} from "react-router-dom"
import styles from "./Profile_Header.module.css";
import uploadStyles from "./Upload.module.css";
import { FaBell } from "react-icons/fa"; 

const Upload = ({ handleFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hashtags, setHashtags] = useState("");
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);

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
    formData.append("uploadedBy", "Mahesh"); // Replace with dynamic username if needed

    // Log formData contents
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }

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

  return (
    <>
      <header className={styles.header} style={{ height: "300px" }}>
        <div className={styles.headerBackground}>
          <div className={styles.headerContent}>
            <div className={styles.menuBar}>
              <h1 className={styles.logo}><Link to="/profile" style={{color:"white", textDecoration:"inherit"}}>#Hashtag</Link></h1>
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
                    <FaBell className={styles.icon} />
                  </li>
                  <li>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrCLHZeA--7ckaEIUPD-Z0XASJ5BxYQYLsdA&s" alt="Profile" className={styles.profilePic} />
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className="container-fluid mt-5 mb-5">
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
                    <button type="button" className={`btn btn-dark ${uploadStyles.selectFilesBtn} m-3`} onClick={handleButtonClick}>
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
                    onChange={(e) => setHashtags(e.target.value)}
                    className={uploadStyles.hashtagInput}
                  ></textarea>
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
