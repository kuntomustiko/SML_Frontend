import React, {useState, useEffect} from 'react'
import axios from '../config/api'
import {useParams} from 'react-router-dom'
import { FaCheck, FaTimes } from "react-icons/fa";


// onProgress = menampilkan barang di detail item dari sebuah id yang di klik dari list merchant

// dummy
import ktpImage from '../../assets/image/KTP-Sample-2.jpg'
import signImage from '../../assets/image/Sign-1.png'


export default function DetailMerchant() {

    const [merchant, setMerchant] = useState({})
    const {id} = useParams()

    useEffect(() =>{
        getDataDetailMerchant()
    },[])

    const getDataDetailMerchant = () =>{
        axios.get(`/detailmerchant/${id}`)
        .then(res => {
            setMerchant(res);
        })
        .catch(err => console.log({err}))
    }

    return (
        <div>
            <div className="container-fluid">
                <div class="card">
                    <div class="card-body">
                        <div className="row">
                            <div className="col">
                                <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80" alt="" className="img-thumbnail"/>
                            </div>
                        </div>
                        <div className="row text-center mt-3">
                            <div className="col-3 offset-2">
                                <span><FaCheck/> </span>
                                {/* <span><FaCheck onClick={}/> </span> */}
                                <p>Approve</p>
                            </div>
                            <div className="col-6">
                                <span><FaTimes/> </span>
                                <p>Not Approve</p>
                            </div>
                        </div>
                        <form>
                            <div class="form-group">
                                <label >Store xxx</label>
                                <h5>Weeu Yee</h5>
                            </div>
                            <div class="form-group">
                                <label >Merchant Id</label>
                                <h5>20001</h5>
                            </div>
                            <div class="form-group">
                                <label >Merchant Id</label>
                                <h5>20001</h5>
                            </div>
                            <div class="form-group">
                                <label >Merchant Id</label>
                                <h5>20001</h5>
                            </div>
                            <div class="form-group">
                                <label >Mobile Number</label>
                                <h5>0918345667</h5>
                            </div>
                            <div class="form-group">
                                <label >Address</label>
                                <h5>Jl. Cipinang Raya No 34 RT/RW 003/002 Jakarta Timur</h5>
                                <button type="button" class="btn btn-warning">Ganti Location</button>
                            </div>
                            <div class="form-group">
                                <label >KTP Image</label>
                                <img className="img-thumbnail" src={ktpImage} alt=""/>
                            </div>
                            <div class="form-group">
                                <label >Sign Image</label>
                                <img className="img-thumbnail" src={signImage} alt=""/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
