import styles from "./Modal.module.css";
import { createPortal } from "react-dom";
import { Component } from "react";
import propTypes from "prop-types";

const modalRoot = document.getElementById("modal-root");

export default class Modal extends Component {
  static propTypes = {
    onClose: propTypes.func.isRequired,
    image: propTypes.string.isRequired,
  };

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    if (e.code === "Escape") {
      this.props.onClose();
    }
  };

  handleBackDrop = (e) => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={styles.Overlay} onClick={this.handleBackDrop}>
        <div className={styles.Modal}>
          <img src={this.props.image} />
        </div>
      </div>,
      modalRoot
    );
  }
}
