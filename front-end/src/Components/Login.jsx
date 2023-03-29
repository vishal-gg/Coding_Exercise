import { React, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../style/Login.css";
import { MdEmail } from 'react-icons/md';
import { HiLockClosed } from 'react-icons/hi';
import { AiFillEyeInvisible } from 'react-icons/ai';
import { AiFillEye } from 'react-icons/ai';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleToggleEye = () => {
      setShowPassword(!showPassword)
  }
  const body = { email: email, password: password };
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  async function handleLogin() {
    let getInfo = await fetch("http://localhost:5000/login", {
      method: "post",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    getInfo = await getInfo.json();
    console.log(getInfo);
    if (getInfo && getInfo.email) {
      localStorage.setItem("user", JSON.stringify(getInfo));
      navigate("/");
    } else {
      alert("provide valid details");
    }
  }
  return (
    <div className="container">
      <div className="login-form">
          <h1>Login</h1>
        <div>
          <div className="input-field">
            <MdEmail className="input-icon" />
            <input type="text" onChange={(e) => setEmail(e.target.value)} required/>
            <label>Email</label>
          </div>
          <div className="input-field">
            <i onClick={handleToggleEye}>{showPassword ? <AiFillEye className="input-icon eye-icon"/>: 
            <AiFillEyeInvisible className="input-icon eye-icon" />}</i>
            <HiLockClosed className="input-icon" />
            <input type={showPassword ? "text": "password"} 
            onChange={(e) => setPassword(e.target.value)} required/>
            <label>Password</label>
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <Link to="#">Forgot password?</Link>
          </div>
          <button className="btn" onClick={handleLogin} type="submit">Login</button>
          <div className="register">
            <p>
              Don't have an account? 
              <Link to="/signup">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
