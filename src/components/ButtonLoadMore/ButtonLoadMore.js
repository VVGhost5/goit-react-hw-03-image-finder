import styles from "./ButtonLoadMore.module.css";
import classNames from "classnames";
import propTypes from "prop-types";

const ButtonLoadMore = ({ addPage }) => {
  return (
    <button
      type="button"
      className={classNames(styles.Button, styles.ButtonPosition)}
      onClick={addPage}
    >
      Load more
    </button>
  );
};

ButtonLoadMore.propTypes = {
  addPage: propTypes.func.isRequired,
};

export default ButtonLoadMore;
