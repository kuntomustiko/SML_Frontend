import React, {useState, useRef, useEffect} from 'react'
import {Link,Redirect} from 'react-router-dom'
import { useSelector } from 'react-redux';
import axios from '../../config/api'


export default function MerchantData() {

    // dari redux dev tools = 4444 = staff_id
    const staff_id = useSelector(state => state.auth.staff_id)

    const [merchant, setMerchant] = useState([])

    useEffect(() => {
        getMerchant();
    }, [])

    const getMerchant = () =>{
        console.log(staff_id);
        axios.get(`/merchant/sales/read/${staff_id}`).then((res) =>{
            setMerchant(res.data)
            console.log(res.data);
        }).catch(err => console.log(err))
    }

    const funDetail = (id) => {
        console.log(" staff " + staff_id);
    }

    // baca gambar
    const urlStoreImage = `http://localhost:2020/merchant/store`

    const renderMerchant = merchant.map((mer, index) => {
            return (
                <div className="card mb-2 border border-primary" key={index}>
                    <div className="card-body">
                       <div className="container-fluid">
                            <div className="row">
                                <div className="col-3">
                                    <img className="img-fluid w-100 h-75" alt="image" src={`${urlStoreImage}/${mer.store_image}`}/>
                                </div>
                                <div className="col-5">
                                    <p className="card-title">{mer.store_name}</p>
                                    <p className="card-title">{mer.PIC}</p>
                                </div>
                                <div className="col-4"> 
                                <Link to={`/detailmerchant/${mer.id}`}>
                                    <button type="button" className="btn btn-primary btn-sm px-3 mb-2 mr-2">Detail</button>
                                </Link>
                                    <button type="button" onClick={() => {funDetail(mer.id)}} className="btn btn-danger btn-sm px-3">Delete</button>
                                </div>   
                            </div>
                       </div>
                    </div>
                </div>
            )
        })  

    return staff_id ? (
        <div className="main mx-auto p-5">
            <div className="row">
                {renderMerchant}
            </div>
        </div>        
    ) : (
        <Redirect to="/login" />
    )
}
