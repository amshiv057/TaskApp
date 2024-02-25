import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { adddata } from './context/ContextProvider';

const AddTask = () => {
    const { setUdata } = useContext(adddata);
    const navigate = useNavigate();

    const [inpval, setINP] = useState({
        title: "",
        description: "",
        dueDate: ""
    });

    const setdata = (e) => {
        const { name, value } = e.target;
        setINP((preval) => ({
            ...preval,
            [name]: value
        }));
    };

    const addinpdata = async (e) => {
        e.preventDefault();
        const jwtToken = sessionStorage.getItem("jwtToken");
        const { title, description, dueDate } = inpval;

        try {
            const res = await fetch("http://localhost:5009/api/v1/userDetails/createUserDetails", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                      token: jwtToken
                },
                body: JSON.stringify({
                    title, description, dueDate
                })
            });

            const data = await res.json();

            if (data.statusCode === 200 && data) {


                setUdata(data);
                alert(data.responseMessage);
                // Navigate after setting the context
                setINP({
                    title: "",
                    description: "",
                    dueDate: ""
                });
                navigate("/home");
                // console.log("Data added successfully");
            } else {
                // console.log("Error:", data.error);
                alert(`${data.responseMessage}`);
            }
        } catch (error) {
            console.error("Error:", error.message);
            alert("An error occurred while submitting the form.");
        }
    };

    return (
        <div className="container">
            <NavLink to="/home">Home</NavLink>
            <form className="mt-4" onSubmit={addinpdata}>
                <div className="row">
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputEmail1" className="form-label">title</label>
                        <input type="text" value={inpval.title} onChange={setdata} name="title" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3 col-lg-12 col-md-12 col-12">
                        <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                        <textarea name="description" value={inpval.description} onChange={setdata} className="form-control" id="" cols="30" rows="5"></textarea>
                    </div>
                    <div className="mb-3 col-lg-12 col-md-12 col-12">
                        <label htmlFor="exampleInputPassword1" className="form-label">DueDate</label>
                        <input type="date" value={inpval.dueDate} onChange={setdata} name="dueDate" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>

    )
}
export default AddTask;
