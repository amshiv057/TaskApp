import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function SignUp() {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        username: "",
        useremail: "",
        password: "",
    });


    const handleChange = async (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        const { useremail, username, password } = formValues;
        if (formValues.password !== formValues.confirmPassword) {
            alert("Confirm password and pssword not matched")
            return;
        }

        const res = await fetch("http://localhost:5009/api/v1/user/createUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, useremail, password })
        });

        const data = await res.json();
        console.log("data", data);
        if (data.statusCode === 200 && data) {
            alert(data.responseMessage)

            setFormValues({ ...formValues, username: "", useremail: "", password: "", confirmPassword: "" })
            navigate("/")
        } else {
            alert(data.responseMessage);
        }
    }
    return (
        <form className="container signup-form" onSubmit={submitHandler}>
            <div className="signup-img-container"></div>
            <div className="row justify-content-center align-items-center">
                <div className="col-md-6">
                    <label htmlFor="uname" className="mb-2"><b>Username</b></label>
                    <input type="text" placeholder="Enter Username" name="username" value={formValues.username} onChange={handleChange} className="form-control mb-2" required />

                    <label htmlFor="uemail" className="mb-2"><b>Useremail</b></label>
                    <input type="email" placeholder="Enter Useremail" name="useremail" value={formValues.useremail} onChange={handleChange} className="form-control mb-2" required />

                    <label htmlFor="psw" className="mb-2"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="password" value={formValues.password} onChange={handleChange} className="form-control mb-2" required />

                    <label htmlFor="psw-confirm" className="mb-2"><b>Confirm Password</b></label>
                    <input type="password" placeholder="Confirm Password" name="confirmPassword" value={formValues.confirmPassword} onChange={handleChange} className="form-control mb-2" required />

                    <button type="submit" className="btn btn-primary mt-2">Sign Up</button>
                    <p className="mt-2">Already have an account? <Link to="/">Sign In</Link></p>
                </div>
            </div>
        </form>
    );
}

export default SignUp;