import React, {useState, useRef, useEffect} from 'react'
import {Link,Redirect} from 'react-router-dom'

import tokoImg1 from '../../assets/image/Store-1.jpg'
import tokoImg2 from '../../assets/image/Store-2.jpg'


export default function NotApprove() {
    const [merchant, setMerchant] = useState([{id:"1", image: {tokoImg1}, approve: "Not Approve", store_name:"McD",PIC:"Hendra"},
    {id:"1",image: {tokoImg2}, approve: "Not Approve", store_name:"KFC",PIC:"Hendra"},
    {id:"1",image: {tokoImg1}, approve: "Not Approve", store_name:"CFC",PIC:"Hendra"}])


    const renderMerchant = merchant.map((mer) => {
            return (
                <div className="card mb-2 border border-primary">
                    <div className="card-body">
                       <div className="container-fluid">
                            <div className="row">
                                <div className="col-3 my-auto">
                                    <img className="card-img img-fluid" style={{width: 100, height: 50}} alt="Card image" src={tokoImg1}/>
                                </div>
                                <div className="col-5">
                                    <h5 className="card-title"style={{fontSize:".8rem"}}>{mer.store_name}</h5>
                                    <h5 className="card-title" style={{fontSize:".8rem"}}>{mer.PIC}</h5>
                                    <h5 className="card-title text-warning " style={{fontSize:".8rem"}}>{mer.approve}</h5>
                                </div>
                                <div className="col-4"> 
                                <Link to={`/detailmerchant`}>
                                    <button type="button" className="btn btn-primary btn-sm px-3 mb-2 mr-2">Detail</button>
                                </Link>
                                    <button type="button" className="btn btn-danger btn-sm px-3">Delete</button>
                                </div>   
                            </div>
                       </div>
                    </div>
                </div>
            )
        })  

    return (
        <div className="main mx-auto p-5">
            <div className="row">
                {renderMerchant}
            </div>
        </div>        
    )
}
