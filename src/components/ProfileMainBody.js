import React, { useState, useEffect } from "react";
import ProfileHeader from "./ProfileHeader";
import styles from "../styles/MainBody.module.css";
import Footer from "../images/FooterLogo.png";

const ProfileMainBody = () => {
  const [filter, setFilter] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          "https://hashtag-273q.onrender.com/images"
        );
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  const filteredImages = filter
    ? images.filter((image) => image.hashtags.includes(filter))
    : images;
  const allHashtags = images.map((item) => item.hashtags[0]);
  const uniqueHashtags = [...new Set(allHashtags)];

  return (
    <>
      <ProfileHeader />
      <main className={styles.mainBody}>
        <h3>Popular Hashtags</h3>
        <div className={styles.hashtags}>
          <button
            type="button"
            className={`btn btn-outline-light ${
              filter === "" ? styles.active : ""
            }`}
            onClick={() => setFilter("")}
          >
            All
          </button>
          {uniqueHashtags.map((hashtag, index) => (
            <button
              key={index}
              type="button"
              className={`btn btn-outline-light ${
                filter === hashtag ? styles.active : ""
              }`}
              onClick={() => setFilter(hashtag)}
            >
              {hashtag}
            </button>
          ))}
        </div>
        <div className={styles.images}>
          {filteredImages.map((image, index) => (
            <img
              key={index}
              src={`https://hashtag-273q.onrender.com${image.url}`}
              alt="Hashtag"
            />
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
