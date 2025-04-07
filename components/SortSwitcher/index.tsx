import { ChangeEvent } from "react";
import styles from "./SortSwitcher.module.css";

export default function SortSwitcher({
  onToggle,
}: {
  onToggle: (v: "ascending" | "descending") => void;
}) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onToggle(e.target.value as "ascending" | "descending");
  };
  return (
    <div>
      <span style={{ textAlign: "center", margin: "0 0 5px" }}>Sort: </span>
      <input
        type="radio"
        name="switch"
        id="ascending"
        onChange={handleChange}
        value="ascending"
        defaultChecked={true}
        className={styles.checkbox}
      />
      <label aria-label="ascending" htmlFor="ascending">
        &#8593;
      </label>
      <input
        type="radio"
        name="switch"
        id="descending"
        onChange={handleChange}
        value="descending"
        className={styles.checkbox}
      />
      <label aria-label="descending" htmlFor="descending">
        &#8595;
      </label>
    </div>
  );
}
