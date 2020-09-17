import React, {useState, useEffect} from 'react'
import axios from '../config/api'
import {useParams} from 'react-router-dom'
import { FaCheck, FaTimes } from "react-icons/fa";

import {Link} from 'react-router-dom'

export default function DetailMerchant() {

    const [merchant, setMerchant] = useState({})
    const {id} = useParams()
    
  
    useEffect(() =>{
        getDataDetailMerchant()
    },[])

    const urlKTPImage = `http://localhost:2020/merchant/read/ktpimage`
    const urlStoreImage = `http://localhost:2020/merchant/read/storeimage`
    const urlSignatureImage = `http://localhost:2020/merchant/read/signatureimage`


    const getDataDetailMerchant = () =>{
        axios.get(`/detailmerchant/${id}`)
        .then(res => {
            setMerchant(res.data[0]);
            console.log(res.data[0]);
            console.log(merchant.signature_image)

        })
        .catch(err => console.log({err}))
    }


    return (
        <div>
            <div className="container-fluid">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col text-center">
                                <img src={`${urlStoreImage}/${merchant.store_image}`} alt="" className="img-thumbnail"/>
                            </div>
                        </div>
                        <div className="row text-center mt-3">
                            {merchant.approval === "1" ? 
                                <div className="col-12">
                                    <span className="text-primary"><FaCheck/> </span>
                                    <p className="text-primary">Approve</p>
                                </div> 
                            :
                                <div className="col-12">
                                    <span className="text-danger"><FaTimes/> </span>
                                    <p className="text-danger">Not Approve</p>
                                </div>
                            }
                        </div>
                        <form>
                            <div className="form-group">
                                <label >Merchant Id</label>
                                <h5>{merchant.id}</h5>
                            </div>
                            <div className="form-group">
                                <label >Store Name</label>
                                <h5>{merchant.store_name}</h5>
                            </div>
                            <div className="form-group">
                                <label >Mobile Number</label>
                                <h5>{merchant.mobile_number}</h5>
                            </div>
                            <div className="form-group">
                                <label >Address</label>
                                <h5>{merchant.address}</h5>
                            </div>
                            <div className="form-group">
                                <label className="mr-3">KTP Image</label>
                                <img className="img-thumbnail" src={`${urlKTPImage}/${merchant.KTP_image}`} alt=""/>
                            </div>
                            <div className="form-group">
                                <label className="mr-3" >Signature Image</label>
                                <img className="img-thumbnail" src={`${urlSignatureImage}/${merchant.signature_image}`} alt=""/>
                            </div>
                        </form>

                        <Link to={`/updatemerchant/${id}`}>
                                <input type="button" value="Update Data" className="btn btn-primary btn-block"/>
                        </Link>  
                    </div>
                </div>
            </div>
        </div>
    )
}
