// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import styles from "./test.module.css";
// import { FaBell, FaSearch } from "react-icons/fa"; // Import FaSearch icon
// import { AiOutlineUpload } from "react-icons/ai";

// const Test = ({ handleFilter }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const handleToggle = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleItemClick = (tag) => {
//     handleFilter(tag);
//     setIsOpen(false);
//   };

//   return (
//     <header className={styles.header}>
//       <div className={styles.headerBackground}>
//         <div className={styles.headerContent}>
//           <div className={styles.menuBar}>
//             <h1 className={styles.logo}>#Hashtag</h1>
//             <div className={styles.searchBar}>
//               <div className={styles.searchIcon}>
//                 <FaSearch />
//               </div>
//               <div className={styles.searchContainer}>
//                 <div contentEditable="true" className={styles.searchInput}></div>
//                 <button className={styles.searchButton}>Search</button>
//               </div>
//             </div>
//             <nav className={styles.menu}>
//               <ul className={styles.menuList}>
//                 <li>
//                   <div className="dropdown">
//                     <button
//                       className="btn dropdown-toggle"
//                       type="button"
//                       onClick={handleToggle}
//                       style={{ color: 'white', border: "none" }}
//                     >
//                       Explore
//                     </button>
//                     <ul
//                       className={`dropdown-menu ${isOpen ? "show" : ""}`}
//                       style={{
//                         display: isOpen ? "block" : "none"
//                       }}
//                     >
//                       <li className={styles.dropdownItem} onClick={() => handleItemClick("Food")}>Food</li>
//                       <li className={styles.dropdownItem} onClick={() => handleItemClick("Travel")}>Travel</li>
//                       <li className={styles.dropdownItem} onClick={() => handleItemClick("Nature")}>Nature</li>
//                       {/* Add more hashtag items as needed */}
//                     </ul>
//                   </div>
//                 </li>
//                 <li>
//                   <FaBell className={styles.icon} />
//                 </li>
//                 <li>
//                   <img src="https://example.com/profile-pic.jpg" alt="Profile" className={styles.profilePic} />
//                 </li>
//                 <li>
//                   <Link to="/upload" className="btn btn-light">
//                     <AiOutlineUpload /> Upload
//                   </Link>
//                 </li>
//               </ul>
//             </nav>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Test;
import React, { useState, useEffect } from 'react';
import ProfileHeader from './ProfileHeader';
import styles from '../styles/MainBody.module.css';
import Footer from '../images/FooterLogo.png';

const ProfileMainBody = () => {
    const [filter, setFilter] = useState('');
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch('http://localhost:5001/images');
                const data = await response.json();
                // Ensure the images are in the expected format: [{ src: 'url', tags: ['tag1', 'tag2'] }]
                setImages(data);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, []);

    const filteredImages = filter ? images.filter(image => image.tags.includes(filter)) : images;

    return (
        <>
            <ProfileHeader />
            <main className={styles.mainBody}>
                <h3>Popular Hashtags</h3>
                <div className={styles.hashtags}>
                    <button
                        type="button"
                        className={`btn btn-outline-light ${filter === '' ? styles.active : ''}`}
                        onClick={() => setFilter('')}
                    >
                        All
                    </button>
                    <button
                        type="button"
                        className={`btn btn-outline-light ${filter === 'Nature' ? styles.active : ''}`}
                        onClick={() => setFilter('Nature')}
                    >
                        #Nature
                    </button>
                    <button
                        type="button"
                        className={`btn btn-outline-light ${filter === 'Travel' ? styles.active : ''}`}
                        onClick={() => setFilter('Travel')}
                    >
                        #Travel
                    </button>
                    <button
                        type="button"
                        className={`btn btn-outline-light ${filter === 'Food' ? styles.active : ''}`}
                        onClick={() => setFilter('Food')}
                    >
                        #Food
                    </button>
                    <button
                        type="button"
                        className={`btn btn-outline-light ${filter === 'Fashion' ? styles.active : ''}`}
                        onClick={() => setFilter('Fashion')}
                    >
                        #Fashion
                    </button>
                    <button
                        type="button"
                        className={`btn btn-outline-light ${filter === 'Happy' ? styles.active : ''}`}
                        onClick={() => setFilter('Happy')}
                    >
                        #Happy
                    </button>
                    <button
                        type="button"
                        className={`btn btn-outline-light ${filter === 'Places' ? styles.active : ''}`}
                        onClick={() => setFilter('Places')}
                    >
                        #Places
                    </button>
                    <button
                        type="button"
                        className={`btn btn-outline-light ${filter === 'Selfie' ? styles.active : ''}`}
                        onClick={() => setFilter('Selfie')}
                    >
                        #Selfie
                    </button>
                    <button
                        type="button"
                        className={`btn btn-outline-light ${filter === 'Music' ? styles.active : ''}`}
                        onClick={() => setFilter('Music')}
                    >
                        #Music
                    </button>
                    <button
                        type="button"
                        className={`btn btn-outline-light ${filter === 'Animals' ? styles.active : ''}`}
                        onClick={() => setFilter('Animals')}
                    >
                        #Animals
                    </button>
                </div>
                <div className={styles.images}>
                    {filteredImages.map((image, index) => (
                        <img key={index} src={image.src} alt="Hashtag" className={styles.image} />
                    ))}
                </div>
            </main>
            <footer>
                <div className={styles.footer}>
                    <img src={Footer} alt="footer" />
                </div>
            </footer>
        </>
    );
};

export default ProfileMainBody;
