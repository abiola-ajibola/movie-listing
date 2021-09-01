import { useState } from "react";
import Image from "next/image";
import FavoriteIcon from "../FavouriteIcon";
import styles from "./MovieCard.module.css";

export default function MovieCard({
  imageUrl,
  title,
  rating,
  date,
  id,
  onSwitch,
  favorite = false,
}) {
  const listingBaseUrl = "https://www.themoviedb.org/movie";
  const year = date.split("-")[0];
  const titleColor = favorite ? "lightray" : "darkgray";
  const valueColor = favorite ? "aliceblue" : "black";
  const handleSwitch = () => {
    onSwitch();
  };

  return (
    <div
      className={styles.cardWrapper}
      style={{ backgroundColor: favorite ? "darkblue" : "transparent" }}
    >
      <div className={styles.starWrapper}>
        <FavoriteIcon favorite={favorite} onSwitch={handleSwitch} />
      </div>
      <a href={`${listingBaseUrl}/${id}`}>
        <div className={styles.card}>
          <div className={styles.imageWrapper}>
            <Image
              width="300px"
              height="169px"
              src={imageUrl}
              alt={title}
              className={styles.image}
            />
          </div>
          <div className={styles.detailsWrapper}>
            <ul className={styles.cardItemsWrapper}>
              <li>
                <h3 className={styles.title} style={{ color: titleColor }}>
                  Title
                </h3>
                <p className={styles.value} style={{ color: valueColor }} data-testid="title-text">
                  {title}
                </p>
              </li>
              <li>
                <h3 className={styles.title} style={{ color: titleColor }}>
                  Current Rating
                </h3>
                <p className={styles.value} style={{ color: valueColor }}>
                  {rating}
                </p>
              </li>
              <li>
                <h3 className={styles.title} style={{ color: titleColor }}>
                  Year
                </h3>
                <p className={styles.value} style={{ color: valueColor }}>
                  {year}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </a>
    </div>
  );
}
