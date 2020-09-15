import React, {useState, useRef, useEffect} from 'react'
import {Link,Redirect} from 'react-router-dom'

import { useSelector } from 'react-redux';


import tokoImg1 from '../../assets/image/Store-1.jpg'
import tokoImg2 from '../../assets/image/Store-2.jpg'


export default function MerchantData() {

    const staff_id = useSelector(state => state.auth.staff_id)
    console.log(" staff " + staff_id);

    const [merchant, setMerchant] = useState([{id:"1", image: {tokoImg1}, store_name:"McD",PIC:"Hendra"},
    {id:"1",image: {tokoImg2}, store_name:"KFC",PIC:"Hendra"},
    {id:"1",image: {tokoImg1}, store_name:"CFC",PIC:"Hendra"}])

    const funDetail = (id) => {

    }

    const renderMerchant = merchant.map((mer) => {
            return (
                <div className="card mb-2 border border-primary">
                    <div className="card-body">
                       <div className="container-fluid">
                            <div className="row">
                                <div className="col-3">
                                    <img className="card-img w-50 my-1 mx-1" alt="Card image" src={tokoImg1}/>
                                </div>
                                <div className="col-5">
                                    <p className="card-title">{mer.store_name}</p>
                                    <p className="card-title">{mer.PIC}</p>
                                </div>
                                <div className="col-4"> 
                                <Link to={`/detailmerchant`}>
                                    <button type="button" onClick={() => {funDetail(mer.id)}} className="btn btn-primary btn-sm px-3 mb-2 mr-2">Detail</button>
                                </Link>
                                    <button type="button" onClick={() => {funDetail(mer.id)}} className="btn btn-danger btn-sm px-3">Delete</button>
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
