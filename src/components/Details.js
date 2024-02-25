import React, { useEffect, useState } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { NavLink, useParams, useNavigate } from 'react-router-dom';


const Details = () => {
    const jwtToken = sessionStorage.getItem("jwtToken");
    const [getTaskdata, setTaskdata] = useState([]);
    console.log(getTaskdata);

    const { id } = useParams("");
    console.log(id);

    const navigate = useNavigate();


    const getdata = async () => {

        const res = await fetch(`http://localhost:5009/api/v1/userDetails/viewDetails/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                token: jwtToken
            }
        });

        const data = await res.json();
        // console.log(data);

        if (data.statusCode === 200 && data) {
            setTaskdata(data.result)
            // console.log("get data");


        } else {
            console.log("error ");

        }
    }

    useEffect(() => {
        getdata();
    },)

    const deleteTask = async () => {

        const res2 = await fetch(`http://localhost:5009/api/v1/userDetails/deleteDetails/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                token: jwtToken
            }
        });

        const deletedata = await res2.json();
        console.log(deletedata);

        if (deletedata.statusCode === 200 && deletedata) {
            alert(deletedata.responseMessage)
            navigate("/home")

        } else {
            console.log("error");

        }

    }

    return (
        <div className="container mt-3">
            <h1 style={{ fontWeight: 400 }}>{getTaskdata.title}</h1>

            <Card sx={{ maxWidth: 600 }}>
                <CardContent>
                    <div className="add_btn">
                        <NavLink to={`/edit/${getTaskdata._id}`}>  <button className="btn btn-primary mx-2"><CreateIcon /></button></NavLink>
                        <button className="btn btn-danger" onClick={() => deleteTask(getTaskdata._id)}><DeleteOutlineIcon /></button>
                    </div>
                    <div className="row">
                        <div className="left_view col-lg-6 col-md-6 col-12">
                            <h3 className="mt-3">Title: <span >{getTaskdata.title}</span></h3>
                            <h3 className="mt-3">DueDate:<span >{getTaskdata.dueDate}</span></h3>
                        </div>
                        <div className="right_view  col-lg-6 col-md-6 col-12">
                            <p className="mt-3">Description: <span>{getTaskdata.description}</span></p>
                        </div>
                    </div>

                </CardContent>
            </Card>
        </div>
    )
}

export default Details
