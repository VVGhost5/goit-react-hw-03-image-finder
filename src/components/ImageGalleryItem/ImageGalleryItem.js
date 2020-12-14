import styles from "./ImageGalleryItem.module.css";
import propTypes from "prop-types";

const ImageGalleryItem = ({ imageData }) => {
  const { largeImageURL, tags } = imageData;
  return (
    <li className={styles.ImageGalleryItem}>
      <img src={largeImageURL} alt={tags} className={styles.image} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  imageData: propTypes.object.isRequired,
};

export default ImageGalleryItem;
