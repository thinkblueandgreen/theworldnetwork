import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import API from '../utils/API'


function form(props) {
  const [currentUser, setCurrentUser] = useState(null)
  const [show, setShow] = useState(false);
  const [logged, setLogged] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('')
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const signOut = ()=>{
    API.logOut().then(data => {
      console.log(data);
    });
    window.location.reload(); 
  }

  const signIn =()=>{
    API.logIn({username:username, password:password}).then(user=>{
      console.log("user object.....L "+JSON.stringify(user));
      console.log("staaaaaaaaaaaaatus teeeeeeeeextL=: "+user.statusText)
      setLogged(true);
      setShow(false)
      console.log(currentUser)
      props.changeCurrentUser({username:user.data.user.local.username,id:user.data.user._id})
    })
  }

  const cancel = () => {
    setShow(false);
  };

  const signUp =()=>{
    API.signUp({username:username, password:password}).then(user=>{
      console.log("user object.....L "+JSON.stringify(user));
      console.log("staaaaaaaaaaaaatus teeeeeeeeextL=: "+user.statusText);
      console.log(currentUser)
      alert("You're signed up");
    })
  }



  const handleInputChange =(e)=>{
    e.target.name === 'username'? setUsername(e.target.value) : setPassword(e.target.value)

  }

  return (


    <div id='modal-test'>
      {logged? <button type="button" class="btn btn-warning"  onClick={signOut}>
        Sign Out
      </button> :
      <button type="button" class="btn btn-secondary" onClick={handleShow}>
        Sign in
      </button>
}
      
      
      <Modal show={show} onHide={handleClose}>

        <Modal.Header closeButton>
          <Modal.Title>Sign in</Modal.Title>
        </Modal.Header>


        <Modal.Body>
          <div>
            <div className="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input type="email" className="form-control" name="username" value={username} onChange={handleInputChange} aria-describedby="emailHelp" />
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" className="form-control" name="password" value={password} onChange={handleInputChange} />
            </div>
          </div>
        </Modal.Body>



        <Modal.Footer>
          <div className="form-group form-check d-flex">
            <button type="submit" className="btn btn-primary mr-auto" onClick={signIn} >Login</button>
            <button type="submit" className="btn btn-secondary ml-auto"  onClick={signUp}>Signup</button>   
            <button
              type="submit" className="btn btn-secondary ml-auto" onClick={cancel}
            >
              Cancel
            </button>
          </div>
        </Modal.Footer>

      </Modal>
      <br></br>
    </div>

  )
}

export default form;