import React, { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../../redux/actions/userActions";
import { Form, Input, Button, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";

const { Title } = Typography;

const LoginPage = props => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitting, setisSubmiting] = useState(false);

  const handleEmail = e => {
    setEmail(e.target.value);
    setError(false);
  };

  const handlePassword = e => {
    setPassword(e.target.value);
    setError(false);
  };

  const handleSubmit = () => {
    setisSubmiting(true);
    let dataToSubmit = {
      email,
      password
    };

    if (email && password) {
      if (password.length >= 6) {
        localStorage.setItem("sh-email", email);
        localStorage.setItem("sh-password", password);
        dispatch(loginUser(dataToSubmit))
          .then(response => {
            if (response.payload) {
              if (response.payload.loginSuccess) {
                props.history.push("/");
              } else if (
                !response.payload.loginSuccess &&
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
          })
          .catch(err => {
            setisSubmiting(false);
            setError(err);
          });
      } else {
        setError("Password must be at least 6 character");
        setisSubmiting(false);
      }
    } else {
      setError("Please enter all field");
      setisSubmiting(false);
    }
  };

  return (
    <div className="app">
      <Title level={2}>Log In</Title>
      <Form onSubmit={handleSubmit} className="login">
        <Form.Item required>
          <Input
            id="email"
            prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={handleEmail}
          />
        </Form.Item>

        <Form.Item>
          <Input.Password
            id="password"
            prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={handlePassword}
          />
        </Form.Item>
        {error && <p className="login-form-error">{error}</p>}
        <Form.Item>
          <div>
            <Button
              type="primary"
              className="login-form-button"
              disabled={isSubmitting}
              onClick={handleSubmit}
            >
              Log in
            </Button>
          </div>
          Or <Link to="/register">register now!</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
