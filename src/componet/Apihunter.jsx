import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'

const Apicrud = () => {

    let [Data, setData] = useState([]);
    let [Updata, setUpdata] = useState({});
    let name = useRef();
    let email = useRef();
    let password = useRef();

    //get data
    const getdata = async () => {
        let get = await axios.get("http://localhost:3003/data");
        setData(get.data);
    }


    //post data

    const postdata = async () => {
        let obj = {
            name: name.current.value,
            email: email.current.value,
            password: password.current.value
        };

        let Add = await axios.post("http://localhost:3003/data", obj);
        setData([...Data, Add.data]);
        name.current.value = "";
        email.current.value = "";
        password.current.value = "";
    }

    //delete data 
    const deletedata = async (id) => {
        let del = await axios.delete(`http://localhost:3003/data/${id}`);
        setData(Data.filter((value) => value.id !== id));
    }

    //updata data 
    let viewupdata = (e) => {
        setUpdata({...Updata,[e.target.name]: e.target.value})
    }
    
    let save = async () =>{
        console.log(Updata);
        let result = await axios.put(`http://localhost:3003/data/${Updata.id}`, Updata);
        setData(Data.map((value,index) =>{
            if(value.id == result.data.id){
                return result.data
            }else{
                return value
            }
        }))
    }

    useEffect(() => {
        getdata()
    }, [])

    return (
        <>
            <input type="text" placeholder="enter your name" name="name" ref={name} />
            <input type="email" placeholder="Enter Your Email" name="email" ref={email} />
            <input type="password" placeholder="enter your password" name="password" ref={password} />
            <button onClick={postdata}>Add</button>

            <table cellpadding="10px" className="col-12 text-center table-bordered  border-secondary">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Updta</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Data.map((value, index) => {
                            return (
                                <tr>
                                    <td>{index}</td>
                                    <td>{value.name}</td>
                                    <td>{value.email}</td>
                                    <td>{value.password}</td>
                                    <td><button onClick={() => deletedata(value.id)}>deletedata</button></td>
                                    <td><button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setUpdata(value)}>Updata</button>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <input type="text" placeholder="enter your name" name="name" value={Updata.name} onChange={viewupdata} /><br />
                            <input type="email" placeholder="Enter Your Email" name="email" value={Updata.email} onChange={viewupdata} /><br />
                            <input type="password" placeholder="enter your password" name="password" value={Updata.password} onChange={viewupdata} /><br />
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={save}>save</button>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Apicrud