import React from 'react'
import {Link,Redirect} from 'react-router-dom'
// Icons
import { FaList, FaTimes, FaSignal } from 'react-icons/fa';

export default function Home() {
    return (
        <div>
            <div className="container-fluid">
                <div className="row my-3">
                    <div className="col text-center">
                        <Link to={`/merchantdatasales`}>
                            <div className="card" style={{width: "10rem", height: "10rem"}}>
                                <h3 className="display-4"><FaList/></h3> 
                                <div className="card-body">
                                <p>Merchant Data</p>
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

                <div className="row text-center">
                    <div className="col-12">
                        <Link to={`/add`}>
                            <input type="button" value="Tambah Merchant" className="btn btn-primary"/>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}





