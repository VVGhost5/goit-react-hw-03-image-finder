import React, { Component } from "react";
import ImageFinderAPI from "../../services/ImageFinderAPI";
import ImageGallery from "../ImageGallery/ImageGallery";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import propTypes from "prop-types";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

export default class ImageInfo extends Component {
  state = {
    request: null,
    images: [],
    error: null,
    status: Status.IDLE,
  };

  static propTypes = {
    addPage: propTypes.func.isRequired,
    resetPage: propTypes.func.isRequired,
    page: propTypes.number.isRequired,
    request: propTypes.string.isRequired,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevRequest = prevProps.request;
    const nextRequest = this.props.request;
    const prevPage = prevProps.page;
    const nextPage = this.props.page;

    if (prevRequest !== nextRequest) {
      this.setState({ status: Status.PENDING });
      this.fetchFromAPI();
      this.props.resetPage();
    }

    if (prevPage !== nextPage) {
      this.setState({ status: Status.PENDING });
      this.fetchFromAPI();
    }
  }

  windowScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  fetchFromAPI = () => {
    ImageFinderAPI.fetchImages(this.props.request, this.props.page)
      .then((images) => {
        if (this.props.page > 1) {
          this.setState((prevState) => ({
            images: [...prevState.images, ...images.hits],
          }));
          this.windowScroll();
        }
        if (this.props.page === 1) {
          this.setState({ images: images.hits });
        }
        this.setState({ status: Status.RESOLVED });
      })
      .catch((error) => this.setState({ error, status: Status.REJECTED }));
  };

  render() {
    const { images, error, status } = this.state;
    if (status === "idle") {
      return null;
    }

    if (status === "pending") {
      return (
        <div className="Loader">
          <Loader
            margin="0 auto"
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000}
          />
        </div>
      );
    }

    if (status === "rejected") {
      return <div>{error}</div>;
    }

    if (status === "resolved") {
      return <ImageGallery images={images} addPage={this.props.addPage} />;
    }
  }
}
