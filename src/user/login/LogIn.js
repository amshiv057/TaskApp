import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function LogIn() {
    const navigate = useNavigate();
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

    const [logdata, setLogData] = useState({
        username: "",
        password: ""
    });

    async function submitHandler(event) {
        event.preventDefault();

        const usernameValue = usernameRef.current.value;
        const passwordValue = passwordRef.current.value;

        const res = await fetch("http://localhost:5009/api/v1/user/loginUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: usernameValue, password: passwordValue })
        });

        const data = await res.json();
        console.log(data);
        if (data.statusCode === 200 && data) {
            sessionStorage.setItem("jwtToken", data.result.jwtToken);

            alert(data.responseMessage);
            setLogData({ username: "", password: "" });
            navigate("/home");
        } else {
            alert(data.responseMessage);
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={submitHandler} className="login-form">
                        <div className="login-img-container"></div>
                        <div className="login-container">
                            <label htmlFor="uname">
                                <b>Username</b>
                            </label>
                            <input type="text" placeholder="Enter Username" ref={usernameRef} name="username" required className="form-control mb-3" />

                            <label htmlFor="psw">
                                <b>Password</b>
                            </label>
                            <input type="password" placeholder="Enter Password" ref={passwordRef} name="password" required className="form-control mb-3" />

                            <button type="submit" className="btn btn-primary mt-3">Log In</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LogIn;
