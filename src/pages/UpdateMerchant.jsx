import React, {useState, useEffect, useRef} from 'react'
import axios from '../config/api'
import {useParams} from 'react-router-dom'
import { FaCheck, FaTimes } from "react-icons/fa";

import {Link} from 'react-router-dom'

export default function UpdateMerchant() {

    const categoryRef = useRef()
    const storeNameRef = useRef()
    const addressRef = useRef()
    const phone_numberRef = useRef()
    const locationRef = useRef()

    const [merchant, setMerchant] = useState({})
    const [category, setCategory] = useState([])
    const [storeName, setStoreName] = useState("")
    const [mobileNumber, setMobileNumber] = useState("")
    const [location, setLocation] = useState("")
    const [address, setAddress] = useState("")
    const {id} = useParams()

    const [inputGambar, setInputGambar] = useState(true)

    const urlKTPImage = `http://localhost:2020/merchant/ktp`
    const urlStoreImage = `http://localhost:2020/merchant/store`
    const urlSignatureImage = `http://localhost:2020/merchant/signature`

    useEffect(() =>{
        getDataDetailMerchant()
        getAllCategory()
    },[])

    const getDataDetailMerchant = () =>{
        axios.get(`/detailmerchant/${id}`)
        .then(res => {
            setMerchant(res.data[0]);
            console.log(res.data[0]);
        })
        .catch(err => console.log({err}))
    }

    // get read data all category for option
    const getAllCategory = () =>{
        axios.get(`/read/allcategory`)
        .then(res => {
            setCategory(res.data)
            console.log(res.data);
        })
        .catch(err => console.log({err}))
    }

    // render category option on UI
    const renderCategory = () =>{
        return category.map((cat, index) =>{
            return(
            <option value={cat.id}>{cat.category}</option>  
            )
        })
    }

    function handleChangeStoreName(e) {
        setStoreName(e.target.value)
        console.log(e.target.value);
    }
    
    function handleChangeMobileNumber(e) {
        setMobileNumber(e.target.value)
        console.log(e.target.value);
    }
    
    
    function handleChangeAddress(e) {
        setAddress(e.target.value)
        console.log(e.target.value);
    }
    
    function handleChangeLocation(e) {
        setLocation(e.target.value)
        console.log(e.target.value);
    }

    const funBatalImage = () => {
        setInputGambar(false)
    }


    // belum bisa
    const onButtonSubmitData = () => {

        // var timeNow = new Date();
        // var date = timeNow.getFullYear()+'-'+(timeNow.getMonth()+1)+'-'+timeNow.getDate();

        // var time = timeNow.getHours() + ":" + timeNow.getMinutes() + ":" + timeNow.getSeconds();
        // var today = date + ' ' + time;

        // const vStoreNameRef = storeNameRef.current.value 
        // const vCategoryRef = parseInt(categoryRef.current.value)
        // const vAddressRef = addressRef.current.value 
        // const vPhone_numberRef = phone_numberRef.current.value 

        // const latlong = `${latitude}, ${longitude}`

        // let data = {staff_id: id, date_created: today, store_name: vStoreNameRef, category_id: vCategoryRef, address: vAddressRef, mobile_number: vPhone_numberRef, location: latlong, approval: 0 }

 
            // axios.post('/merchant/sales/insert', data)
            // .then(res => {
            //     console.log(res);
            //     setBooBtnSubmitData(true)
            //     getLastDataFromId()
            // }).catch(err => console.log({err}))
    }

    return (
        <div>
            <div className="container-fluid">
                <div className="card">
                    <div className="card-body">
                        <div className="row text-center mt-3">
                            {merchant.approval == "1" ? 
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
                                {!storeName ? 
                                    <input type="text" className="form-control form-control-sm"  value={merchant.store_name} onChange={handleChangeStoreName}/>
                                    :
                                    <input type="text" className="form-control form-control-sm"  value={storeName} onChange={handleChangeStoreName}/>
                                }
                            </div>
                            <div className="form-group">
                                <label >Category</label>    
                                <select ref={categoryRef} className="form-control form-control-sm">
                                    {renderCategory()}
                                </select>
                            </div>
                            <div className="form-group">
                                <label >Mobile Number</label>
                                {!mobileNumber ? 
                                    <input type="text" className="form-control form-control-sm"  value={merchant.mobile_number} onChange={handleChangeMobileNumber}/>
                                    :
                                    <input type="text" className="form-control form-control-sm"  value={mobileNumber} onChange={handleChangeMobileNumber}/>
                                }
                            </div>
                            <div className="form-group">
                                <label >Address</label>
                                {!address ? 
                                    <input type="text" className="form-control form-control-sm"  value={merchant.address} onChange={handleChangeAddress}/>
                                    :
                                    <input type="text" className="form-control form-control-sm"  value={address} onChange={handleChangeAddress}/>
                                }
                            </div>
                            <div className="form-group">
                                <label >Latitude Longitude</label>
                                {!location ? 
                                    <input type="text" className="form-control form-control-sm"  value={merchant.location} onChange={handleChangeLocation}/>
                                    :
                                    <input type="text" className="form-control form-control-sm"  value={location} onChange={handleChangeLocation}/>
                                }
                            </div>
                            <div className="row mt-2">
                                <div className="col-6">
                                    <Link to={`/`}>
                                        <input type="button" value="Batal" className="btn btn-warning btn-block mb-5"/>
                                    </Link>  
                                </div>
                                <div className="col-6">
                                        <input type="button" onClick={onButtonSubmitData} value="Submit" className="btn btn-success btn-block mb-5"/>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="mr-3">Store Image</label>
                                <img src={`${urlStoreImage}/${merchant.store_image}`} alt="" className="img-thumbnail mb-3"/>
                                {
                                    inputGambar ? 
                                        <input type="file" className="form-control form-control-sm"  required/>
                                    :
                                        <input type="file" className="form-control form-control-sm"  value="" required/>
                                }
                                <div className="row mt-2">
                                    <div className="col-6">
                                        <input type="button" onClick={funBatalImage} value="Batal" className="btn btn-warning btn-block mt-2 mb-3"/>
                                    </div>
                                    <div className="col-6">
                                        <input type="button" value="submit" className="btn btn-success btn-block mt-2 mb-3"/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="mr-3">KTP Image</label>
                                <img src={`${urlKTPImage}/${merchant.KTP_image}`} alt="" className="img-thumbnail mb-3"/>
                                {
                                    inputGambar ? 
                                        <input type="file" className="form-control form-control-sm"  required/>
                                    :
                                        <input type="file" className="form-control form-control-sm"  value="" required/>
                                }
                                <div className="row mt-2">
                                    <div className="col-6">
                                        <input type="button" onClick={funBatalImage} value="Batal" className="btn btn-warning btn-block mt-2 mb-3"/>
                                    </div>
                                    <div className="col-6">
                                        <input type="button" value="submit" className="btn btn-success btn-block mt-2 mb-3"/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="mr-3">Signature Image</label>
                                <img src={`${urlSignatureImage}/${merchant.signature_image}`} alt="" className="img-thumbnail mb-3"/>
                                {
                                    inputGambar ? 
                                        <input type="file" className="form-control form-control-sm"  required/>
                                    :
                                        <input type="file" className="form-control form-control-sm"  value="" required/>
                                }
                                <div className="row mt-2">
                                    <div className="col-6">
                                        <input type="button" onClick={funBatalImage} value="Batal" className="btn btn-warning btn-block mt-2 mb-3"/>
                                    </div>
                                    <div className="col-6">
                                        <input type="button" value="submit" className="btn btn-success btn-block mt-2 mb-3"/>
                                    </div>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}
