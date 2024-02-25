import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useParams, useNavigate } from 'react-router-dom'
import { updatedata } from './context/ContextProvider'


const Edit = () => {

    const jwtToken = sessionStorage.getItem("jwtToken");
    const { updata, setUPdata } = useContext(updatedata)

    const navigate = useNavigate("");

    const [inpval, setINP] = useState({
        title:"",
        description: "",
        dueDate:"",
        id: ""
    })

    const setdata = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setINP((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }


    const { id } = useParams("");
    console.log(id);



    const getdata = async () => {

        const res = await fetch(`http://localhost:5009/api/v1/userDetails/viewDetails/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                token:jwtToken
            }
        });

        const data = await res.json();
        console.log(data);

        if (data.statusCode === 200 && data) {
            const mappedData = {
                title: data.result.title || '',
                description: data.result.description || '',
                dueDate: data.result.dueDate || '',
            };
            setINP(mappedData)
            console.log("get data");

        } else {
            console.log("error ");


        }
    }

    useEffect(() => {
        getdata();
    }, [id]);


    const updateTask = async (e) => {
        e.preventDefault();

        const { title ,description, dueDate } = inpval;

        const res2 = await fetch(`http://localhost:5009/api/v1/userDetails/updateUserDetails`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                token:jwtToken
            },
            body: JSON.stringify({
                id, title, description, dueDate
            })
        });

        const data2 = await res2.json();
        console.log(data2);

        if (data2.statusCode=== 200 &&data2) {
            alert(data2.responseMessage)
            setUPdata(data2);
            navigate("/home")
    
        } else {
            alert(data2.responseMessage);
            
        }

    }

    return (
        <div className="container">
            <NavLink to="/home">Home</NavLink>
            <form className='mt-4'>
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
                    <button type="submit" onClick ={updateTask} class="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>

    )
}

export default Edit;





