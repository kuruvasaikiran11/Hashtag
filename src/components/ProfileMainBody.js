// import React, {useState, useEffect} from 'react'
// import ProfileHeader from './ProfileHeader'
// import styles from '../styles/MainBody.module.css';
// import image1 from '../images/Food1.png';
// import image2 from '../images/Food2.png';
// import image3 from '../images/Food3.png';
// import image4 from '../images/Food4.png';
// import image5 from '../images/Food5.png';
// import Footer from '../images/FooterLogo.png'
// const ProfileMainBody = () => {
//     const [filter, setFilter] = useState('');
//     // const [images, setImages] = useState([]);
//     const images = [
//         { src: image1, tags: ['Food'] },
//         { src: image2, tags: ['Food', 'Travel'] },
//         { src: image3, tags: ['Nature'] },
//         { src: image4, tags: ['Travel'] },
//         { src: image5, tags: ['Happy'] },
//     ];

//     // useEffect(() => {
//     //     const fetchImages = async () => {
//     //         try {
//     //             const response = await fetch('http://localhost:5001/images');
//     //             const data = await response.json();
//     //             setImages(data);
//     //         } catch (error) {
//     //             console.error('Error fetching images:', error);
//     //         }
//     //     };

//     //     fetchImages();
//     // }, []);

//     const filteredImages = filter ? images.filter(image => image.tags.includes(filter)) : images;
//   return (
//     <>
//         <ProfileHeader/>
//         <main className={styles.mainBody}>
//                 <h3>Popular Hashtags</h3>
//                 <div className={styles.hashtags}>
//                     <button
//                         type="button"
//                         className={`btn btn-outline-light ${filter === '' ? styles.active : ''}`}
//                         onClick={() => setFilter('')}
//                     >
//                         All
//                     </button>
//                     <button
//                         type="button"
//                         className={`btn btn-outline-light ${filter === 'Nature' ? styles.active : ''}`}
//                         onClick={() => setFilter('Nature')}
//                     >
//                         #Nature
//                     </button>
//                     <button
//                         type="button"
//                         className={`btn btn-outline-light ${filter === 'Travel' ? styles.active : ''}`}
//                         onClick={() => setFilter('Travel')}
//                     >
//                         #Travel
//                     </button>
//                     <button
//                         type="button"
//                         className={`btn btn-outline-light ${filter === 'Food' ? styles.active : ''}`}
//                         onClick={() => setFilter('Food')}
//                     >
//                         #Food
//                     </button>
//                     <button
//                         type="button"
//                         className={`btn btn-outline-light ${filter === 'Fashion' ? styles.active : ''}`}
//                         onClick={() => setFilter('Fashion')}
//                     >
//                         #Fashion
//                     </button>
//                     <button
//                         type="button"
//                         className={`btn btn-outline-light ${filter === 'Happy' ? styles.active : ''}`}
//                         onClick={() => setFilter('Happy')}
//                     >
//                         #Happy
//                     </button>
//                     <button
//                         type="button"
//                         className={`btn btn-outline-light ${filter === 'Places' ? styles.active : ''}`}
//                         onClick={() => setFilter('Places')}
//                     >
//                         #Places
//                     </button>
//                     <button
//                         type="button"
//                         className={`btn btn-outline-light ${filter === 'Selfie' ? styles.active : ''}`}
//                         onClick={() => setFilter('Selfie')}
//                     >
//                         #Selfie
//                     </button>
//                     <button
//                         type="button"
//                         className={`btn btn-outline-light ${filter === 'Music' ? styles.active : ''}`}
//                         onClick={() => setFilter('Music')}
//                     >
//                         #Music
//                     </button>
//                     <button
//                         type="button"
//                         className={`btn btn-outline-light ${filter === 'Animals' ? styles.active : ''}`}
//                         onClick={() => setFilter('Animals')}
//                     >
//                         #Animals
//                     </button>
//                 </div>
//                 <div className={styles.images}>
//                     {filteredImages.map((image, index) => (
//                         <img key={index} src={image.src} alt="Hashtag" />
//                     ))}
//                 </div>
//             </main>
//         <footer>
//             <div className={styles.footer}>
//                 <img src={Footer} alt="footer" />
//             </div>
//         </footer>
//     </>
//   )
// }

// export default ProfileMainBody

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
                setImages(data);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, []);

    const filteredImages = filter ? images.filter(image => image.hashtags.includes(filter)) : images;

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
                        <img key={index} src={`http://localhost:5001${image.url}`} alt="Hashtag" />
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
