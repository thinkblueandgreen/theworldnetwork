import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";
import API from "../utils/API";

function FormP(props) {
  const [currentUser, setCurrentUser] = useState(null);
  const [show, setShow] = useState(false);
  const [logged, setLogged] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const cancel = () => {
    setShow(false);
  };

  const signUp = () => {
    setShow(false);
    API.signUp({ username: username, password: password }).then(user => {
      if (user.data.error) {
        console.log(user.data.error);
        alert(user.data.error);
      } else {
        alert("You're signed up");
      }
    });
  };

  const handleInputChange = e => {
    e.target.name === "username"
      ? setUsername(e.target.value)
      : setPassword(e.target.value);
  };

  return (
    <div id="modal-test">
      <button
        button
        type="button"
        class="btn btn-link"
        onClick={props.handleClick}
      >
        Signup
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign up</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div>
            <div className="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input
                type="email"
                className="form-control"
                name="username"
                value={username}
                onChange={handleInputChange}
                aria-describedby="emailHelp"
              />
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <div className="form-group form-check d-flex">
            {/* <button
              type="submit"
              className="btn btn-primary mr-auto"
              onClick={signIn}
            >
              Sign up
            </button> */}
            <button
              type="submit"
              className="btn btn-secondary ml-auto"
              onClick={signUp}
            >
              Signup
            </button>
            <button
              type="submit"
              className="btn btn-secondary ml-auto"
              onClick={cancel}
            >
              Cancel
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default FormP;
