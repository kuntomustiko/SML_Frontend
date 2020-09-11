import React from 'react'
import {Link,Redirect} from 'react-router-dom'
// Icons
import { FaList, FaTimes, FaSignal } from 'react-icons/fa';
import { MdPeople } from "react-icons/md";

export default function Home() {
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
                        <Link to={`/notapprove`}>
                            <div className="card" style={{width: "10rem", height: "10rem"}}>
                                <h3 className="display-4"><FaTimes/></h3> 
                                <div className="card-body">
                                <p>Not Approval</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col text-center">
                        <Link to={`/MerchantData`}>
                            <div className="card" style={{width: "10rem", height: "10rem"}}>
                                <h3 className="display-4"><FaSignal/></h3> 
                                <div className="card-body">
                                <p>Statistik</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}





