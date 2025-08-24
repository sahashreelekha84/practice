import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { fetchsignup, fetchverify, fetchresetotp } from '../feature/Auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const dispatch = useDispatch();
  const [showOTP, setShowOTP] = useState(false);
  const [userEmail, setUserEmail] = useState('');
const navigate=useNavigate()
  // Separate form instances
  const signupForm = useForm();
  const otpForm = useForm();

  const { register: regSignup, handleSubmit: handleSignup, formState: { errors: errorsSignup }, reset: resetSignup } = signupForm;
  const { register: regOTP, handleSubmit: handleOTP, formState: { errors: errorsOTP } } = otpForm;

  const signupHandler = (data) => {
    const payload = {
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
    };

    dispatch(fetchsignup(payload))
      .unwrap()
      .then(() => {
        alert("Signup successful! OTP sent to your email.");
        setShowOTP(true);
        setUserEmail(data.email);
        resetSignup(); // only resets signup form, not OTP form
      })
      .catch((err) => {
        alert("Signup failed: " + (err.message || err));
        console.error(err);
      });
  };

  const otpHandlerSubmit = (data) => {
    dispatch(fetchverify({ email: userEmail, otp: data.otp }))
      .unwrap()
      .then(() => {
        alert("OTP verified successfully!");
        setShowOTP(false);
        navigate('/login')
      })
      .catch((err) => {
        alert("OTP verification failed: " + (err.message || err));
      });
  };

  const resendOTPHandler = () => {
    dispatch(fetchresetotp({ email: userEmail }))
      .unwrap()
      .then(() => alert("OTP resent to your email!"))
      .catch((err) => alert("Failed to resend OTP: " + (err.message || err)));
  };

  return (
    <Container>
      {!showOTP ? (
        <Form onSubmit={handleSignup(signupHandler)}>
          <Row className="m-2">
            <Col>
              <Form.Control
                type="text"
                placeholder="Name"
                {...regSignup('name', { required: '* Name is required', minLength: { value: 3, message: '* Minimum length 3' } })}
              />
              <p style={{ color: 'red' }}>{errorsSignup.name?.message}</p>
            </Col>
          </Row>

          <Row className="m-2">
            <Col>
              <Form.Control
                type="email"
                placeholder="Email"
                {...regSignup('email', { required: '* Email is required', pattern: { value: /^[a-z0-9.-]+@[a-z]{2,12}\.[a-z.]{2,20}$/, message: '* Invalid email format' } })}
              />
              <p style={{ color: 'red' }}>{errorsSignup.email?.message}</p>
            </Col>
          </Row>

          <Row className="m-2">
            <Col>
              <Form.Control
                type="password"
                placeholder="Password"
                {...regSignup('password', { required: '* Password is required', minLength: { value: 3, message: '* Minimum length 3' } })}
              />
              <p style={{ color: 'red' }}>{errorsSignup.password?.message}</p>
            </Col>
          </Row>

          <Row className="m-2">
            <Col>
              <Form.Control
                type="text"
                placeholder="Phone"
                {...regSignup('phone')}
              />
            </Col>
          </Row>

          <Button variant="primary" type="submit" className="m-2">
            Submit
          </Button>
        </Form>
      ) : (
        <Form onSubmit={handleOTP(otpHandlerSubmit)}>
          <Row className="m-2">
            <Col>
              <Form.Control
                type="text"
                placeholder="Enter OTP"
                {...regOTP('otp', { required: '* OTP is required' })}
              />
              <p style={{ color: 'red' }}>{errorsOTP.otp?.message}</p>
            </Col>
          </Row>

          <Button variant="success" type="submit" className="m-2">
            Verify OTP
          </Button>

          <Button variant="secondary" type="button" className="m-2" onClick={resendOTPHandler}>
            Resend OTP
          </Button>
        </Form>
      )}
    </Container>
  );
};

export default Signup;
