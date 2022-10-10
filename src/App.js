import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

function App() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [registered, setRegistered] = useState(false)

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

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (registered) {

    }
    else {

    }
  }

  return (
    <div>
      <div className="registration w-50 mx-auto mt-5">

        <h2 className='text-primary'>Please Register</h2>


        <Form onSubmit={handleFormSubmit}>

          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control onBlur={handleName} type="text" placeholder="Your name" />
            <Form.Text className="text-muted">
              Please provide your name.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmail} type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePassword} type="password" placeholder="Password" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check onChange={handleRegisteredChange} type="checkbox" label="Already registered?" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>

        </Form>
      </div>


    </div >
  );
}

export default App;
