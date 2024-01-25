/* eslint-disable */
import NavBar from "./NavBar";
import { useState, useEffect } from "react";
import { getAuth, updatePassword, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
	useEffect(() => {
		let un = localStorage.getItem("un");
		if (un == null) {
			nav("/login");
		}
	}, []);

	const nav = useNavigate();
	const [pw1, setPw1] = useState("");
	const [pw2, setPw2] = useState("");

	const hPw1 = (event) => { setPw1(event.target.value); }
	const hPw2 = (event) => { setPw2(event.target.value); }

	const save = (event) => {
		event.preventDefault();
		if (pw1 == pw2) {
			const auth = getAuth();
			onAuthStateChanged(auth, (user) => {
				updatePassword(user, pw1)
					.then(res => {
						localStorage.clear();
						nav("/login")
					})
					.catch(err => alert("issue" + err));
			})
		}
		else {
			alert("Passwords does not match");
			setPw1("");
			setPw2("");
		}
	};

	return (
		<>
			<center>
				<NavBar />
				<h2> Change Password Page </h2>
				<div class="card">
					<div class="card2">
						<form onSubmit={save}>
							<div className="form">
								<input className="input" type="password" placeholder="enter new password" onChange={hPw1} value={pw1} required/>
								<span class="input-border"></span><br />
							</div>
							<div className="form">
								<input className="input" type="password" placeholder="confirm new password" onChange={hPw2} value={pw2} required/>
								<span class="input-border"></span><br />
							</div><br/>
							<input id="reg" type="submit" value="Change Password" style={{fontSize:"smaller"}} />
						</form>	<br />
					</div>
				</div>
			</center>
		</>
	);
}

