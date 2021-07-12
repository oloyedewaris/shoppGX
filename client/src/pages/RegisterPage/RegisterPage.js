import React, { useState } from "react";
import moment from "moment";
import { registerUser } from "../../redux/actions/userActions";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { Form, Input, Button } from "antd";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
};

const RegisterPage = props => {
  const dispatch = useDispatch();

  const history = useHistory();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitting, setisSubmiting] = useState(false);

  const handleFirstName = e => {
    setFirstName(e.target.value);
    setError(false);
  };

  const handleLastName = e => {
    setLastName(e.target.value);
    setError(false);
  };

  const handleEmail = e => {
    setEmail(e.target.value);
    setError(false);
  };

  const handlePassword = e => {
    setPassword(e.target.value);
    setError(false);
  };

  const handleConfirmPassword = e => {
    setConfirmPassword(e.target.value);
    setError(false);
  };

  const handleSubmit = () => {
    setisSubmiting(true);
    if (!email || !firstName || !lastName || !password || !confirmpassword) {
      setError("Please input all fields");
      setisSubmiting(false);
    } else if (password !== confirmpassword) {
      setError("Password does not match");
      setisSubmiting(false);
    } else if (password.length < 6) {
      setError("Password must be at least 6 character");
    } else {
      let dataToSubmit = {
        email,
        password,
        firstname: firstName,
        lastname: lastName,
        image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`
      };
      localStorage.setItem("sh-email", email);
      localStorage.setItem("sh-password", password);
      dispatch(registerUser(dataToSubmit)).then(response => {
        setisSubmiting(false);
        if (response.payload) {
          if (response.payload.registerSuccess) {
            window.localStorage.setItem("userId", response.payload.userId);
            history.push("/");
          } else if (
            !response.payload.registerSuccess &&
            response.payload.message
          ) {
            setError(response.payload.message);
            setisSubmiting(false);
          } else {
            setError("Internal server error, please try again");
            setisSubmiting(false);
          }
        } else {
          setError("Internal server error, please try again");
          setisSubmiting(false);
        }
      });
    }
  };

  return (
    <div className="app">
      <h2>Sign up</h2>
      <Form className="login" {...formItemLayout} onSubmit={handleSubmit}>
        <Form.Item label="Name">
          <Input
            id="name"
            placeholder="Enter your name"
            type="text"
            value={firstName}
            onChange={handleFirstName}
          />
        </Form.Item>
        <Form.Item label="Last Name">
          <Input
            id="lastName"
            placeholder="Enter your Last Name"
            type="text"
            value={lastName}
            onChange={handleLastName}
          />
        </Form.Item>
        <Form.Item
          label="Email"
          hasFeedback
          validateStatus={error ? "error" : "success"}
        >
          <Input
            id="email"
            placeholder="Enter your Email"
            type="email"
            value={email}
            onChange={handleEmail}
          />
        </Form.Item>
        <Form.Item
          required
          label="Password"
          hasFeedback
          validateStatus={error ? "error" : "success"}
        >
          <Input.Password
            id="password"
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={handlePassword}
          />
        </Form.Item>

        <Form.Item
          required
          label="Confirm"
          hasFeedback
          validateStatus={error ? "error" : "success"}
        >
          <Input.Password
            id="confirmPassword"
            placeholder="Enter your confirmPassword"
            type="password"
            value={confirmpassword}
            onChange={handleConfirmPassword}
          />
        </Form.Item>
        {error && <p className="login-form-error">{error}</p>}
        <Form.Item {...tailFormItemLayout}>
          <Button onClick={handleSubmit} type="primary" disabled={isSubmitting}>
            Submit
          </Button>
          <div>
            Or <Link to="/login">Login here!</Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterPage;
