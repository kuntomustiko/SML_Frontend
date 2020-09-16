import React, {useState, useRef, useEffect} from 'react'
import {Link,Redirect} from 'react-router-dom'
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

    const urlStoreImage = `http://localhost:2020/merchant/store`

    const renderNotApproval = notApproval.map((app, index) => {
            return (
                <div className="card mb-2 border border-primary" key={index}>
                    <div className="card-body">
                       <div className="container-fluid">
                            <div className="row">
                                <div className="col-3 my-auto">
                                    <img className="card-img img-fluid" style={{width: 100, height: 50}} alt="Card image" src={`${urlStoreImage}/${app.store_image}`}/>
                                </div>
                                <div className="col-5">
                                    <h5 className="card-title"style={{fontSize:".8rem"}}>{app.store_name}</h5>
                                    <h5 className="card-title" style={{fontSize:".8rem"}}>{app.name}</h5>
                                    <h5 className="card-title text-warning " style={{fontSize:".8rem"}}>{app.approval}</h5>
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
                {renderNotApproval}
            </div>
        </div>        
    )
}
