import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from '../../config/api'

export default function ListNotApprove() {

    const [notApproval, setNotApproval] = useState([])

    useEffect(() => {
        getNotApproval();
    }, [])

    
    const getNotApproval = () =>{
        axios.get(`/merchant/leader/read/notapproval`).then((res) =>{
            setNotApproval(res.data)
            console.log(res.data);
        }).catch(err => console.log(err))
    }


    const renderNotApproval = notApproval.map((app, index) => {
        console.log(app);
        const urlStoreImage = `http://localhost:2020/merchant/read/storeimage`
            return (
                <div className="card mb-2 border border-primary" key={index}>
                    <div className="card-body">
                       <div className="container-fluid">
                            <div className="row">
                                <div className="col-3">
                                    <img className="img-fluid w-100 h-75" alt="image" src={`${urlStoreImage}/${app.store_image}`}/>
                                </div>
                                <div className="col-5">
                                    <h6 className="card-title">{app.store_name}</h6>
                                    <small className="card-title">{app.category}</small>
                                </div>
                                <div className="col-4"> 
                                <Link to={`/detailmerchant/${app.id}`}>
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
                <div className="col-12 text-center text-danger">
                    <h4>Not Approval</h4>
                </div>
            </div>
            <div className="row">
                {renderNotApproval}
            </div>
        </div>        
    )
}
