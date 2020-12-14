import React, { Component } from "react";
import styles from "./Searchbar.module.css";
import { toast } from "react-toastify";
import propTypes from "prop-types";

export default class Searchbar extends Component {
  state = {
    request: "",
  };

  static propTypes = {
    onSubmit: propTypes.func.isRequired,
  };

  handleRequestChange = (event) => {
    this.setState({ request: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.request.trim() === "") {
      toast.error("Enter your request");
      return;
    }
    this.props.onSubmit(this.state.request);
    this.setState({ request: "" });
  };

  render() {
    return (
      <header className={styles.searchbar}>
        <form className={styles.searchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={styles.button}>
            <span className={styles.buttonLabel}>Search</span>
          </button>

          <input
            className={styles.input}
            name="request"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.request}
            onChange={this.handleRequestChange}
          />
        </form>
      </header>
    );
  }
}
