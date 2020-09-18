import React, {useState, useRef, useEffect} from 'react'
import {Link,Redirect} from 'react-router-dom'
import { useSelector } from 'react-redux';
import axios from '../../config/api'

export default function MerchantData() {
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
    const urlStoreImage = `http://localhost:2020/merchant/read/storeimage`

    const renderMerchant = merchant.map((mer, index) => {
            return (
                <div className="card mb-2 border border-primary" key={index}>
                    <div className="card-body">
                       <div className="container-fluid">
                            <div className="row">
                                <div className="col-3">
                                    <img className="card-img w-100 h-75" alt="Card image" src={`${urlStoreImage}/${mer.store_image}`}/>
                                </div>
                                <div className="col-5">
                                    <h6 className="card-title">{mer.store_name}</h6>
                                    <small className="card-title">{mer.PIC}</small>
                                </div>
                                <div className="col-4"> 
                                <Link to={`/detailmerchant/${mer.id}`}>
                                    <button type="button" className="btn btn-primary btn-sm dropdown-headerpx-3 mb-2 mr-2 w-100">Detail</button>
                                </Link>
                                    <button type="button" onClick={() => {funDetail(mer.id)}} className="btn btn-danger btn-sm ppx-3 w-100">Delete</button>
                                </div>   
                            </div>
                       </div>
                    </div>
                </div>
            )
        })  

    const filterMerchant =  () =>{
        return(
            <div className="mx-auto">
                <div className="card text-center" style={{width: "15rem"}}>
                    <div className="card-body">
                        <form>
                            <div className="form-row">
                                <label>Store name</label>
                                <input type="text" className="form-control form-control-sm" placeholder="Masukkan nama toko" required/>
                            </div>
                            <div className="form-row">
                            <label>Category</label> 
                                <select className="form-control form-control-sm">
                                    <option value="1">All</option>   
                                    <option value="1">Fast Food</option>   
                                    <option value="2">Restaurant</option>   
                                    <option value="3">Barber Shop</option>                        
                                </select>
                            </div>
                        </form>  
                    </div>
                    <button className="btn btn-primary mx-auto mb-2" style={{width: "8rem"}} type="submit">Filter</button>
                </div>
            </div>
        )
    }

    return (
        <div className="main mx-auto p-5">
            <div className="row mb-3 mx-auto">
                {filterMerchant()}
            </div>
            <div className="row">
                {renderMerchant}
            </div>
        </div>        
    )
}
