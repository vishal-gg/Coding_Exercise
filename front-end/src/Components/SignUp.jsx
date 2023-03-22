import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{
    const auth = localStorage.getItem('user')
    if(auth){
      navigate('/')
    }
  })
  
  async function submitData() {
    try{
      let result = await fetch("http://localhost:5000/register", {
        method: "post",
        body: JSON.stringify({
          name: name,
          email: email,
          password: password
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });
  
      let finalRes = await result.json();
      console.log(finalRes)
      if(finalRes && finalRes.email){
        localStorage.setItem("user",JSON.stringify(finalRes))
        navigate('/')
      }else if (finalRes.keyPattern) {
        alert('this email already exist')
      }else {
        alert('please input valid details')
      }

    }catch(err) {
      console.log(err)
    }
   
  }

  return (
    <div className="form">
      <h1>Register</h1>
      <input
        className="input"
        type="text"
        value={name}
        placeholder="enter name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="input"
        type="text"
        value={email}
        placeholder="enter email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="input"
        type="password"
        value={password}
        placeholder="enter password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <input className="input btn" type="submit" onClick={submitData} />
    </div>
  );
}

export default SignUp;
