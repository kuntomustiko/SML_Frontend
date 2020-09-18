import React from 'react'
import {Link,Redirect} from 'react-router-dom'
// Icons
import { FaList, FaTimes, FaSignal, FaEllo } from 'react-icons/fa';
import { MdPeople } from "react-icons/md";

import axios from '../../config/api'

// Logout
import {logoutAction} from '../../config/redux/actions'
import { useSelector, useDispatch } from 'react-redux';

export default function Home() {

    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)
    const config = {headers: {Authorization: token}}  

    const funLogout = () =>{
        axios.delete('/logout_staff', config)
        .then(dispatch(logoutAction()))
    }

    return (
        <div>
            <div className="container-fluid">
                <div className="row my-3">
                    <div className="col text-center">
                        <Link to={`/merchantdataleader`}>
                            <div className="card" style={{width: "10rem", height: "10rem"}}>
                                <h3 className="display-4"><FaList/></h3> 
                                <div className="card-body">
                                <p>Merchant Data</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col text-center">
                        <Link to={`/salesdata`}>
                            <div className="card" style={{width: "10rem", height: "10rem"}}>
                                <h3 className="display-4"><MdPeople/></h3> 
                                <div className="card-body">
                                    <p>Sales Data</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="row">
                    <div className="col text-center">
                        <Link to={`/listnotapproval`}>
                            <div className="card" style={{width: "10rem", height: "10rem"}}>
                                <h3 className="display-4"><FaTimes/></h3> 
                                <div className="card-body">
                                <p>Not Approval</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col text-center">
                        <Link to={`/inputstaffid`}>
                            <div className="card" style={{width: "10rem", height: "10rem"}}>
                                <h3 className="display-4"><FaEllo/></h3> 
                                <div className="card-body">
                                <p>Input Staff Id</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="row mt-3 mx-auto" style={{width: "100vw"}}>
                    <div className="col-12 text-center">
                        <Link to={`/inputstaffid`}>
                            <div className="card" style={{width: "10rem", height: "10rem"}}>
                                <h3 className="display-4"><FaSignal/></h3> 
                                <div className="card-body">
                                <p>Stastika</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 mt-5 text-center">
                        <Link to={`/login`}>
                            <input type="button" value="Logout" onClick={funLogout} className="btn btn-warning w-75 text-primary"/>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}





