import React, { useState } from "react";
import "./messageModal.css";
import Modal from "react-bootstrap/Modal";
import errorIcon from "../../../assets/images/error.png";

export default function MessageModal({ showModal }) {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}
      <Modal
        centered
        show={showModal && show}
        onHide={handleClose}
        animation={true}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="errorIconWrapper">
            <img src={errorIcon} alt="error-icon" />
          </div>
          <div className="errorHeading">
            <h1>Error</h1>
          </div>
          <div className="errorAction">
            <p>Reload the page</p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
