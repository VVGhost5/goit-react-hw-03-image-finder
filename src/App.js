import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Searchbar from "./components/Searchbar/Searchbar";
import ImagesInfo from "./components/ImagesInfo/ImagesInfo";
import Modal from "./components/Modal/Modal";

export default class App extends Component {
  state = {
    request: "",
    images: [],
    picture: "",
    page: 1,
    showModal: false,
  };

  handleFormSubmit = (request) => {
    this.setState({ request });
  };

  setPicture = (e) => {
    if (e.target.nodeName !== "IMG") {
      return;
    }
    this.setState({ picture: e.target.currentSrc });
    this.toogleModal();
  };

  toogleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  addPage = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }));
  };

  resetPage = () => {
    this.setState({ page: 1 });
  };

  render() {
    return (
      <div onClick={this.setPicture} className="App">
        {this.state.showModal && (
          <Modal image={this.state.picture} onClose={this.toogleModal}></Modal>
        )}
        <Searchbar onSubmit={this.handleFormSubmit}></Searchbar>
        <ImagesInfo
          request={this.state.request}
          page={this.state.page}
          addPage={this.addPage}
          resetPage={this.resetPage}
        />
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
