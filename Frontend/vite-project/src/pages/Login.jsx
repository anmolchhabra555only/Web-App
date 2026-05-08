import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("https://web-app-4yko.onrender.com/login", {
        email: email.trim(),
        password: password.trim()
      });

      // store token
      localStorage.setItem("token", res.data.token);

      alert("Login successful");

      navigate("/feed");

    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

      <h2>Welcome Back 👋</h2>
      <p className="subtitle">Login to continue</p> 

      <div className="input-group">
      <input
        type="email"
        placeholder="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      </div> 

      <div className="input-group">
      <input
        type="password"
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      </div> 

      <button onClick={handleLogin}>
        Login
      </button>

      <p className="extra-text">Don't have an account? <span>Signup</span>
      </p>

    </div>
    </div>
  );
};

export default Login;