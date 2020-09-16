import React, {useState, useRef, useEffect} from 'react'
import {Link,Redirect} from 'react-router-dom'


export default function Home() {
    const [merchant, setMerchant] = useState([{id:"1",store_name:"McD",PIC:"Hendra"},
    {id:"1",store_name:"KFC",PIC:"Hendra"},
    {id:"1",store_name:"CFC",PIC:"Hendra"}])

    const funDetail = (id) => {

    }

    const urlImage = `http://localhost:2020/product/picture`

    const renderMerchant = merchant.map((mer) => {
            return (
                <div className="card mb-2 border border-danger text-white bg-dark height-card">
                    <div className="card-body">
                       <div className="container-fluid">
                            <div className="row">
                                <div className="col-3">
                                <   img className="card-img w-50 my-1 mx-1" alt="Card image"/>
                                </div>
                                <div className="col-6">
                                    <p className="card-title">{mer.store_name}</p>
                                    <p className="card-title">{mer.PIC}</p>
                                </div>
                                <div className="col-3"> 
                                    <button type="button" onClick={() => {funDetail(mer.id)}} className="btn btn-primary btn-sm px-3 mb-2 mr-2">Detail</button>
                                    <button type="button" onClick={() => {funDetail(mer.id)}} className="btn btn-danger btn-sm px-3">Delete</button>
                                </div>   
                            </div>
                       </div>
                    </div>
                </div>
            )
        })  
    return (
            <div className="main">
                {renderMerchant}
                <div>
                    <Link to ="/add">
                         <input type="button" value="Tambah" className="btn btn-success btn-block"/>
                    </Link>
                </div>
            </div>        
    )
}
