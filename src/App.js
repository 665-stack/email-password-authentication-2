import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from "firebase/auth"
import app from './firebase.init';

const auth = getAuth(app)

function App() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [registered, setRegistered] = useState(false)
  const [validated, setValidated] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');




  const handleName = e => {
    setName(e.target.value);
  }
  const handleEmail = e => {
    setEmail(e.target.value);
  }
  const handlePassword = e => {
    setPassword(e.target.value);
  }
  const handleRegisteredChange = e => {
    setRegistered(e.target.checked)
  }

  // submit button
  const handleFormSubmit = (e) => {
    e.preventDefault()

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      return;
    }
    // regex for pass validation
    if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
      setError("Password should contain at least one special character")
      setSuccess('')
      return;
    }
    setValidated(true)
    setError('')

    if (registered) {
      signInWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          setSuccess("Login Success")
          console.log(user)
        })
        .catch(error => {
          setError(error.message)
          setSuccess('')
        })
    }
    else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          setSuccess('Register Success');
          setUserName();
          verifyEmail();
          console.log(user);
        })
        .catch(error => {
          setError(error.message)
          setSuccess('')
        })
    }
  }

  const setUserName = () => {
    updateProfile(auth.currentUser, {
      displayName: name
    })
      .then(() => {
        // Profile updated!

      })
      .then(error => {
        setError(error?.message)
      })
  }
  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log('Email verification sent!');
      });
  }
  const handlePasswordReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("Password reset email sent!")
      })
  }

  return (
    <div>
      <div className="registration w-50 mx-auto mt-5">

        <h2 className='text-primary'>Please Register</h2>


        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>

          {!registered && <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control onBlur={handleName} type="text" placeholder="Your name" required />
            <Form.Text className="text-muted">
              Please provide your name.
            </Form.Text>
          </Form.Group>}

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmail} type="email" placeholder="Enter email" required />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePassword} type="password" placeholder="Password" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid password.
            </Form.Control.Feedback>
          </Form.Group>

          {/* message */}
          <p className='text-danger'>{error}</p>
          <p className='text-success'>{success}</p>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check onChange={handleRegisteredChange} type="checkbox" label="Already registered?" />
          </Form.Group>

          {registered && <Button onClick={handlePasswordReset} variant='link'>Forget Password?</Button>}

          <br />

          <Button variant="primary" type="submit">
            {registered ? "Login" : "Register"}
          </Button>

        </Form>
      </div>


    </div >
  );
}

export default App;
