import React from 'react';
import { useDispatch } from 'react-redux';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { fetchsignin} from '../feature/Auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const dispatch = useDispatch();
const navigate=useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm();

  const submitHandler = (data) => {
    // Use FormData only if you need to upload files
    // Otherwise, just send JSON
    const payload = {
     
      email: data.email,
      password: data.password,
      
    };

    dispatch(fetchsignin(payload))
      .unwrap() // unwrap ensures .then() receives the payload
      .then((res) => {
        alert("Signup successful!");
        console.log("Response:", res);
        navigate('/dashboard')
      })
      .catch((err) => {
        alert("Signup failed: " + (err.message || err));
        console.error(err);
      });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(submitHandler)}>
       

        <Row className="m-2">
          <Col>
            <Form.Control
              type="email"
              placeholder="Email"
              {...register('email', { 
                required: '* Email is required', 
                pattern: { value: /^[a-z0-9.-]+@[a-z]{2,12}\.[a-z.]{2,20}$/, message: '* Invalid email format' } 
              })}
            />
            <p style={{ color: 'red' }}>{errors.email?.message}</p>
          </Col>
        </Row>

        <Row className="m-2">
          <Col>
            <Form.Control
              type="password"
              placeholder="Password"
              {...register('password', { required: '* Password is required', minLength: { value: 3, message: '* Minimum length 3' } })}
            />
            <p style={{ color: 'red' }}>{errors.password?.message}</p>
          </Col>
        </Row>


        <Button variant="primary" type="submit" className="m-2">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Signin;
