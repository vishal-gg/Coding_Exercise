import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        "Content-Type": "application/json"
      }
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
    <div className="form">
      <h1>Login</h1>
      <input
        className="input"
        type="text"
        placeholder="enter email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="input"
        type="text"
        placeholder="enter password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} className="input btn">
        Login
      </button>
    </div>
  );
}

export default Login;
