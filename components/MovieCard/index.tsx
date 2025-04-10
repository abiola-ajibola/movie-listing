import Image from "next/image";
import FavoriteIcon from "../FavouriteIcon";
import styles from "./MovieCard.module.css";
interface MovieCardProps {
  imageUrl: string;
  title: string;
  rating: number;
  date: string;
  id: number | string;
  onSwitch: () => void;
  favorite?: boolean;
}
export default function MovieCard({
  imageUrl,
  title,
  rating,
  date,
  id,
  onSwitch,
  favorite = false,
}: MovieCardProps) {
  const listingBaseUrl = "https://www.themoviedb.org/movie";
  const year = date.split("-")[0];
  // const titleColor = favorite ? "lightray" : "darkgray";
  const valueColor = favorite ? "#edf2f4" : "#2b2d42";
  const handleSwitch = () => {
    onSwitch();
  };

  return (
    <div
      className={styles.cardWrapper}
      style={{ backgroundColor: favorite ? "#8338ec" : "inherit" }}
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
                <h2
                  className={styles.value + " " + styles.title}
                  style={{ color: valueColor }}
                  data-testid="title-text"
                >
                  {title}
                </h2>
              </li>
              <li>
                <p className={styles.value + " " + styles.rating}>
                  {rating}
                </p>
              </li>
              <li>
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
