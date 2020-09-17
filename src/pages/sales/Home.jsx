import React from 'react'
import {Link} from 'react-router-dom'
// Icons
import { FaList, FaSignal } from 'react-icons/fa';
import axios from '../../config/api'

// Logout
import {logoutAction} from '../../config/redux/actions'
import { useSelector, useDispatch } from 'react-redux';

export default function Home() {

    // Logout
    const dispatch = useDispatch()
    const staff_id = useSelector(state => state.auth.staff_id)
    const email = useSelector(state => state.auth.email)
    const token = useSelector(state => state.auth.token)
    const role_id = useSelector(state => state.auth.role_id)
    
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
                        <Link to={`/addtext`}>
                            <input type="button" value="Tambah Merchant" className="btn btn-primary"/>
                        </Link>
                    </div>
                    <div className="col-12 mt-5">
                        <Link to={`/login`}>
                            <input type="button" value="Logout" onClick={funLogout} className="btn btn-warning"/>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}





