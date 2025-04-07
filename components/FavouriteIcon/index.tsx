import styles from "./FavoriteIcon.module.css";

export default function FavoriteIcon({ favorite = false, onSwitch }) {
  const handleClick = () => {
    onSwitch()
  };
  return (
    <span
      className={styles.star}
      style={{ color: favorite ? "yellow" : "black" }}
      onClick={handleClick}
    >
      &#9733;
    </span>
  );
}
