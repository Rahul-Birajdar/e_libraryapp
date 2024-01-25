import NavBar from "./NavBar.js";
import { useState, useEffect } from "react";
import { getAuth, sendPasswordResetEmail} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword(){
    
    const nav = useNavigate();
    const [userName, setUserName] = useState("");

    const hUserName = (event) => { setUserName(event.target.value); }

    useEffect( () => {
        let userName = localStorage.getItem("un");
        if (userName!=null){
            nav("/home");
        }
    }, [nav]);

    const check = (event) => {
        event.preventDefault();
        const auth = getAuth();
        sendPasswordResetEmail(auth, userName)
        .then((res)=>{
            nav("/home");
        })
        .catch((err)=>{
            alert("Issue: " + err.message)
        });

    }

    return(
        <>
        <center>
            <NavBar/>
            <div class="card">
			<div class="card2">
            <h3>ForgotPassword Page</h3>
            <form onSubmit={check}>
                <div className="form">
                    <input className="input" type="text" placeholder={"Enter Reg Email:"} onChange={hUserName} value={userName} required/>
                    <span class="input-border"></span><br/>
                </div>
                <br/>
                <input id="reg" type="submit" value="Reset" />
            </form><br/>
            </div>
            </div>
        </center>
        </>
    );
}