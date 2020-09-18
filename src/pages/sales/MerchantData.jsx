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

    const funDelete = (id, staff_id) => {
        console.log("id merchant " + id); // 44
        console.log("staff_id" + staff_id); // 10 

        axios.delete(`/merchant/sales/delete/${id}/${staff_id}`).then((res) =>{
            console.log(res);
            getMerchant()
        }).catch(err => console.log(err))
    }

    // baca gambar
    
    const renderMerchant = merchant.map((mer, index) => {
        console.log(merchant);
        const urlStoreImage = `http://localhost:2020/merchant/read/storeimage`
            return (
                <div className="card mb-2 border border-primary" key={index}>
                    <div className="card-body">
                       <div className="container-fluid">
                            <div className="row">
                                <div className="col-3">
                                    <img className="img-fluid w-100 h-75" alt="image" src={`${urlStoreImage}/${mer.store_image}`}/>
                                </div>
                                <div className="col-5">
                                    <h6 className="card-title">{mer.store_name}</h6>
                                    <small className="card-title">{mer.category}</small>
                                </div>
                                <div className="col-4"> 
                                <Link to={`/detailmerchant/${mer.id}`}>
                                    <button type="button" className="btn btn-primary btn-sm px-3 mb-2 mr-2 w-100">Detail</button>
                                </Link>
                                    <button type="button" onClick={() => {funDelete(mer.id, mer.staff_id)}} className="btn btn-danger btn-sm px-3 w-100">Delete</button>
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
