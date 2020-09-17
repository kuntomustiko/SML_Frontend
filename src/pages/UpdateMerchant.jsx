import React, {useState, useEffect, useRef} from 'react'
import axios from '../config/api'
import {useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
import { FaCheck, FaTimes } from "react-icons/fa";

import {Link} from 'react-router-dom'

export default function UpdateMerchant() {

    // 4444
    const staff_id = useSelector(state => state.auth.staff_id)

    const categoryRef = useRef()
    const storeNameRef = useRef()
    const addressRef = useRef()
    const phone_numberRef = useRef()
    const locationRef = useRef()
    const ktpImageRef = useRef()
    const storeImageRef = useRef()
    const signatureImageRef = useRef()

    const [latitude, setLatitude] = useState()
    const [longitude, setLongitude] = useState()
    const [boolBtnSubmitData, setBooBtnSubmitData] = useState(false)
    const [lastData, setLastData] = useState()

    const [boolKosong, setBoolKosong] = useState(false)

    const [merchant, setMerchant] = useState({})
    const [category, setCategory] = useState([])
    const [storeName, setStoreName] = useState("")
    const [mobileNumber, setMobileNumber] = useState("")
    const [location, setLocation] = useState("")
    const [address, setAddress] = useState("")
    // 34
    const {id} = useParams()

    const [inputGambar, setInputGambar] = useState(true)

    const urlKTPImage = `http://localhost:2020/merchant/ktp`
    const urlStoreImage = `http://localhost:2020/merchant/store`
    const urlSignatureImage = `http://localhost:2020/merchant/signature`

    useEffect(() =>{
        getDataDetailMerchant()
        getAllCategory()
    },[])

    const getLastDataFromId = () =>{
        axios.get(`/merchant/lastdata/sales/${id}`)
        .then(res => {
            setLastData(res.data)
            console.log(res.data);
        })
        .catch(err => console.log({err}))
    }

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
        const vStoreNameRef = storeNameRef.current.value 
        const vCategoryRef = parseInt(categoryRef.current.value)
        const vAddressRef = addressRef.current.value 
        const vPhone_numberRef = phone_numberRef.current.value 
        const vLocationRef = locationRef.current.value 
        const vId = parseInt(id)

        let data = {staff_id: merchant.staff_id,
            store_name: vStoreNameRef, category_id: vCategoryRef,
            address: vAddressRef, mobile_number: vPhone_numberRef,
            location: vLocationRef, approval: 0,
            staff_id: merchant.staff_id, id: vId }

            axios.patch('/merchant/sales/update', data)
            .then(res => {
                console.log(res);
                console.log(data);
            }).catch(err => console.log({err}))
    }

    const onButtonSubmitKTPImage = () =>{
        const vStoreNameRef = storeNameRef.current.value 

        const body = new FormData()
        let image = ktpImageRef.current.files[0]

        body.append("ktpimage", image)
        body.append("staff_id", merchant.staff_id)
        body.append("id", id)
        body.append("store_name", vStoreNameRef )

        axios.patch('/merchant/update/ktpimage', body)
        .then(res =>{
            // salah satu cara agar browser auto refresh after request berhasil
            window.location.reload(false);
        }).catch(err => console.log(err))
    }

    const onButtonSubmitStoreImage = () =>{
        const vStoreNameRef = storeNameRef.current.value 

        const body = new FormData()
        let image = storeImageRef.current.files[0]

        body.append("storeimage", image)
        body.append("staff_id", merchant.staff_id)
        body.append("id", id)
        body.append("store_name", vStoreNameRef )

        axios.patch('/merchant/update/storeimage', body)
        .then(res =>{
            window.location.reload(false);
        }).catch(err => console.log(err))
    }

    const onButtonSubmitSignatureImage = () =>{
        const vStoreNameRef = storeNameRef.current.value 

        const body = new FormData()
        let image = signatureImageRef.current.files[0]

        body.append("signatureimage", image)
        body.append("staff_id", merchant.staff_id)
        body.append("id", id)
        body.append("store_name", vStoreNameRef )

        axios.patch('/merchant/update/signature', body)
        .then(res =>{
            window.location.reload(false);
        }).catch(err => console.log(err))
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
                                      <input type="text" className="form-control form-control-sm" ref={storeNameRef} defaultValue={merchant.store_name}/>
                                    :
                                    <input type="text" className="form-control form-control-sm" ref={storeNameRef} value={storeName} onChange={handleChangeStoreName}/>
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
                                    <input type="text" className="form-control form-control-sm" ref={phone_numberRef} defaultValue={merchant.mobile_number} onChange={handleChangeMobileNumber}/>
                                    :
                                    <input type="text" className="form-control form-control-sm" ref={phone_numberRef} value={mobileNumber} onChange={handleChangeMobileNumber}/>
                                }
                            </div>
                            <div className="form-group">
                                <label >Address</label>
                                {!address ? 
                                    <input type="text" className="form-control form-control-sm" ref={addressRef} defaultValue={merchant.address} onChange={handleChangeAddress}/>
                                    :
                                    <input type="text" className="form-control form-control-sm" ref={addressRef} value={address} onChange={handleChangeAddress}/>
                                }
                            </div>
                            <div className="form-group">
                                <label >Latitude Longitude</label>
                                {!location ? 
                                    <input type="text" className="form-control form-control-sm" ref={locationRef}   defaultValue={merchant.location} onChange={handleChangeLocation}/>
                                    :
                                    <input type="text" className="form-control form-control-sm" ref={locationRef}  value={location} onChange={handleChangeLocation}/>
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
                                <label className="mr-3">KTP Image</label>
                                <img src={`${urlKTPImage}/${merchant.KTP_image}`} alt="" className="img-thumbnail mb-3"/>
                                {
                                    inputGambar ? 
                                        <input type="file" ref={ktpImageRef} className="form-control form-control-sm"  required/>
                                    :
                                        <input type="file" className="form-control form-control-sm"  value="" required/>
                                }
                                <div className="row mt-2">
                                    <div className="col-6">
                                        <input type="button" onClick={funBatalImage} value="Batal" className="btn btn-warning btn-block mt-2 mb-3"/>
                                    </div>
                                    <div className="col-6">
                                        <input type="button" onClick={onButtonSubmitKTPImage} value="submit" className="btn btn-success btn-block mt-2 mb-3"/>
                                    </div>
                                </div>
                               
                            </div>
                            <div className="form-group">
                                <label className="mr-3">Store Image</label>
                                <img src={`${urlStoreImage}/${merchant.store_image}`} alt="" className="img-thumbnail mb-3"/>
                                {
                                    inputGambar ? 
                                        <input type="file" ref={storeImageRef} className="form-control form-control-sm"  required/>
                                    :
                                        <input type="file"  className="form-control form-control-sm"  value="" required/>
                                }
                                <div className="row mt-2">
                                    <div className="col-6">
                                        <input type="button" onClick={funBatalImage} value="Batal" className="btn btn-warning btn-block mt-2 mb-3"/>
                                    </div>
                                    <div className="col-6">
                                        <input type="button" onClick={onButtonSubmitStoreImage}  value="submit" className="btn btn-success btn-block mt-2 mb-3"/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="mr-3">Signature Image</label>
                                <img src={`${urlSignatureImage}/${merchant.signature_image}`} alt="" className="img-thumbnail mb-3"/>
                                {
                                    inputGambar ? 
                                        <input type="file" ref={signatureImageRef} className="form-control form-control-sm"  required/>
                                    :
                                        <input type="file" className="form-control form-control-sm"  value="" required/>
                                }
                                <div className="row mt-2">
                                    <div className="col-6">
                                        <input type="button" onClick={funBatalImage} value="Batal" className="btn btn-warning btn-block mt-2 mb-3"/>
                                    </div>
                                    <div className="col-6">
                                        <input type="button" onClick={onButtonSubmitSignatureImage} value="submit" className="btn btn-success btn-block mt-2 mb-3"/>
                                    </div>
                                </div>
                            </div>
                        </form>

                        <Link to={`/`}>
                                <input type="button" value="Home" className="btn btn-primary btn-block"/>
                        </Link>  
                    </div>
                </div>
            </div>
        </div>
    )
}
