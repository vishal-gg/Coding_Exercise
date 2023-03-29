import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import '../style/Login.css'
import { MdEmail } from "react-icons/md";
import { HiLockClosed } from "react-icons/hi";
import { FaUser } from 'react-icons/fa'
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleToggleEye = () => {
    setShowPassword(!showPassword)
  }
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  async function submitData() {
    try {
      let result = await fetch("http://localhost:5000/register", {
        method: "post",
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      let finalRes = await result.json();
      console.log(finalRes);
      if (finalRes && finalRes.email) {
        localStorage.setItem("user", JSON.stringify(finalRes));
        navigate("/");
      } else if (finalRes.keyPattern) {
        alert("this email already exist");
      } else {
        alert("please input valid details");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div style={{height: "68vh"}} className="container">
      <div className="login-form">
        <h1>Register</h1>
        <div>
          <div className="input-field">
          <FaUser className="input-icon" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label>Name</label>
          </div>
          <div className="input-field">
            <MdEmail className="input-icon" />
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Email</label>
          </div>
          <div className="input-field">
          <i onClick={handleToggleEye}>{showPassword ? <AiFillEye className="input-icon eye-icon"/>: 
            <AiFillEyeInvisible className="input-icon eye-icon" />}</i>
            <HiLockClosed className="input-icon" />
            <input
              type={showPassword ?"text": "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Password</label>
          </div>
          <button style={{marginBottom: "1rem"}} className="btn" onClick={submitData} type="submit">
            Submit
          </button>
          <div className="register login-otherwise">
            <p>
              Already have an account? 
              <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp;
