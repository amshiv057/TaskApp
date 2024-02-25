import React, { useState, useEffect, useContext } from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { NavLink } from 'react-router-dom';
import { adddata, deldata } from './context/ContextProvider';
import { updatedata } from './context/ContextProvider'




const Home = () => {

    const [gettaskdata, setTaskdata] = useState([]);
    console.log(gettaskdata);

    const { udata } = useContext(adddata);

    const { updata } = useContext(updatedata);

    const { dltdata, setDLTdata } = useContext(deldata);
    const jwtToken = sessionStorage.getItem("jwtToken");
    const getdata = async () => {

        const res = await fetch("http://localhost:5009/api/v1/userDetails/getDetailsList", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                token: jwtToken
            }
        });

        const data = await res.json();
        // console.log(data);

        if (data.statusCode === 200 && data) {
            setTaskdata(data.result.docs);
            // console.log("get data");


        } else {
            console.log("error ");


        }
    }

    useEffect(() => {
        getdata();
    }, [])

    const deleteTask = async (id) => {

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
            alert("Data Deleted Successfully!")
            setDLTdata(deletedata);
            getdata();

        } else {
            console.log("error");
        }

    }


    return (

        <>
            {
                udata ?
                    <>
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>{udata.name}</strong>  added succesfully!
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            }
            {
                updata ?
                    <>
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>{updata.name}</strong>  updated succesfully!
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            }

            {
                dltdata ?
                    <>
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>{dltdata.name}</strong>  deleted succesfully!
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            }


            <div className="mt-5">
                <div className="container">
                    <div className="add_btn mt-2 mb-2">
                        <NavLink to="/AddTask" className="btn btn-primary">Add Task</NavLink>
                    </div>

                    <table class="table">
                        <thead>
                            <tr className="table-dark">
                                <th scope="col">id</th>
                                <th scope="col">title</th>
                                <th scope="col">Description</th>
                                <th scope="col">DueDate</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                Array.isArray(gettaskdata) && gettaskdata.map((element, id) => {
                                    return (
                                        <>
                                            <tr>
                                                <th scope="row">{id + 1}</th>
                                                <td>{element.title}</td>
                                                <td>{element.description}</td>
                                                <td>{element.dueDate}</td>
                                                <td className="d-flex justify-content-between">
                                                    <NavLink to={`/view/${element._id}`}> <button className="btn btn-success"><RemoveRedEyeIcon /></button></NavLink>
                                                    <NavLink to={`/edit/${element._id}`}>  <button className="btn btn-primary"><CreateIcon /></button></NavLink>
                                                    <button className="btn btn-danger" onClick={() => deleteTask(element._id)}><DeleteOutlineIcon /></button>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>


                </div>
            </div>
        </>
    )
}

export default Home

















