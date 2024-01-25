import NavBar from "./NavBar.js";
import { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [password, setPassword] = useState("");

  // Handle changes in the email field
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Handle changes in the secret key field
  const handleSecretKeyChange = (event) => {
    setSecretKey(event.target.value);
  };

  // Handle changes in the password field
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Check if user is already logged in
  useEffect(() => {
    let un = localStorage.getItem("un");
    if (un != null) {
      navigate("/home");
    }
  }, [navigate]);

  // Handle login form submission
  const handleLogin = async (event) => {
    event.preventDefault();

    // Check the secret key
    if (secretKey !== "abc123") {
      alert("Invalid secret key");
      return;
    }

    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      if (user) {
        localStorage.setItem("un", email);
        localStorage.setItem("admin", "yes");
        navigate("/home");
      } else {
        alert("User not found");
      }
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  };

  return (
    <>
      <center>
        <NavBar />
        <div class="card">
          <div class="card2">
            <h2 style={{ color: "black" }}>Admin Login </h2>
            <form onSubmit={handleLogin}>
              <div className="form">
                <input
                  className="input"
                  type="email"
                  placeholder="Enter E-mail"
                  onChange={handleEmailChange}
                  value={email}
                  required
                />
                <span class="input-border"></span>
              </div>
              <div className="form">
                <input
                  className="input"
                  type="password"
                  placeholder="Enter Admin Secret Key"
                  onChange={handleSecretKeyChange}
                  value={secretKey}
                  required
                />
                <span class="input-border"></span>
                <br />
              </div>
              <div className="form">
                <input
                  className="input"
                  type="password"
                  placeholder="Enter Password"
                  onChange={handlePasswordChange}
                  value={password}
                  required
                />
                <span class="input-border"></span>
                <br />
              </div>

              <br />
              <input id="login" type="submit" value="Login" />

            </form><br />
          </div>
        </div>
      </center>
    </>
  );
}
