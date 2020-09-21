import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from '../../config/api'

import Swal from 'sweetalert2'

// paginate
import Paginator from 'react-hooks-paginator';
import './MerchantData.css'

export default function ListNotApprove() {

    const [notApproval, setNotApproval] = useState([])

    // paginate
    const pageLimit = 5;
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentData, setCurrentData] = useState([]);

    useEffect(() => {
        getNotApproval();
    }, [])
   
    useEffect(() => {
      setCurrentData(notApproval.slice(offset, offset + pageLimit));
    }, [offset, notApproval]);
    
    const getNotApproval = () =>{
        axios.get(`/merchant/leader/read/notapproval`).then((res) =>{
            setNotApproval(res.data)
            console.log(res.data);
        }).catch(err => console.log(err))
    }

    const funDelete = (id) => {

        Swal.fire({
            title: 'Yakin?',
            showCancelButton: true,
            confirmButtonText: `Delete`
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axios.delete(`/merchant/leader/delete/${id}`).then((res) =>{
                    console.log(res);
                    getNotApproval()
                }).catch(err => console.log(err))
              Swal.fire('Deleted!', '', 'success')
            } 
          })
    }


    const renderNotApproval = currentData.map((app, index) => {
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
                                    <button type="button" className="btn btn-primary btn-sm px-3 mb-2 mr-2 w-100">Detail</button>
                                </Link>
                                <button type="button" onClick={() => {funDelete(app.id)}} className="btn btn-danger btn-sm px-3 mb-2 mr-2 w-100">Delete</button>
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
            <div className="row">
                <div className="col-12 text-center">
                    <Paginator
                        totalRecords={notApproval.length}
                        pageLimit={pageLimit}
                        pageNeighbours={2}
                        setOffset={setOffset}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            </div>
        </div>        
    )
}
