import NavBar from "./NavBar.js";
import ForgotPassword from "./ForgotPassword.js";
import { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";

export default function Login() {
  const nav = useNavigate();
  const [userName, setUserName] = useState("");
  const [pw1, setPw1] = useState("");

  const hUserName = (event) => {
    setUserName(event.target.value);
  };
  const hPw1 = (event) => {
    setPw1(event.target.value);
  };

  useEffect(() => {
    let userName = localStorage.getItem("un");
    if (userName != null) {
      nav("/home");
    }
  }, [nav]);

  const check = (event) => {
    event.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, userName, pw1)
      .then((res) => {
        localStorage.setItem("un", userName);
        nav("/home");
      })
      .catch((err) => {
        console.log(err.message);
        alert("Issue: " + err.message);
      });
  };

  return (
    <>
      <center>
        <NavBar />
        <div class="card">
          <div class="card2">
            <h3>Login</h3>
            <form onSubmit={check}>
              <div className="form">
                <input
                  className="input"
                  type="email"
                  placeholder={"Enter E-mail "}
                  onChange={hUserName}
                  value={userName}
                  required
                />
                <span class="input-border"></span>
                <br />
              </div>
              <div className="form">
                <input
                  className="input"
                  type="password"
                  placeholder={"Enter Password "}
                  onChange={hPw1}
                  value={pw1}
                  required
                />
                <span class="input-border"></span>
                <br />
              </div>
              <Link className="forgotp" to="/fp" element={<ForgotPassword />}>
                Forgot Password
              </Link>
              <br />
              <br />
              <input id="login" type="submit" value="Login" />
            </form>
            <br />
          </div>
        </div>
      </center>
    </>
  );
}
