import React, { Component } from "react";
import { Button, Dropdown, Modal } from "react-bootstrap";

class UserShowModal extends Component {
  state = {
    isShow: false
  };

  handleShow = () => {
    this.setState({ isShow: true });
  };

  handleClose = () => {
    this.setState({ isShow: false });
  };

  render() {
    const { user, isButton, handleView } = this.props;
    return (
      <>
        {isButton ? (
          <Button
            variant="info"
            onClick={() => {
              this.handleShow();
              handleView();
            }}
          >
            View
          </Button>
        ) : (
          <Dropdown.Item
            onClick={() => {
              this.handleShow();
              handleView();
            }}
          >
            View
          </Dropdown.Item>
        )}
        <Modal show={this.state.isShow} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{user.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Gender: {user.gender}</h5>
            <h5>Jobs:</h5>
            {user.listJobs.map((job, i) => (
              <ul key={i}>
                <li>{job}</li>
              </ul>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="dark" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default UserShowModal;
