import NavBar from "./NavBar";
import { useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
	const nav = useNavigate();
	useEffect(() => {
		let un = localStorage.getItem("un");
		if (un !== null) {
			nav("/home");
		}
	}, [nav]);


	const [un, setUn] = useState("");
	const [pw1, setPw1] = useState("");
	const [pw2, setPw2] = useState("");

	const hUn = (event) => { setUn(event.target.value); }
	const hPw1 = (event) => { setPw1(event.target.value); }
	const hPw2 = (event) => { setPw2(event.target.value); }

	const save = (event) => {
		event.preventDefault();
		if (pw1 === pw2) {
			const auth = getAuth();
			createUserWithEmailAndPassword(auth, un, pw1)
				.then(res => nav("/login"))
				.catch(err => alert("issue" + err));
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
				<div class="card">
					<div class="card2">
						<h3 style={{color:"black"}}> Sign Up </h3>
						<form onSubmit={save}>
							<div className="form">
								<input className="input" type="email" placeholder="Enter E-mail" onChange={hUn} value={un} required/>
								<span class="input-border"></span><br />
							</div>
							<div className="form">
								<input className="input" type="password" placeholder="Enter Password" onChange={hPw1} value={pw1} required/>
								<span class="input-border"></span><br />
							</div>
							<div className="form">
								<input className="input" type="password" placeholder="Confirm Password" onChange={hPw2} value={pw2} required/>
								<span class="input-border"></span><br />
							</div><br/>
							<input id="reg" type="submit" value="Register" />
						</form><br/>
					</div>
				</div>
			</center>
		</>
	);
}
