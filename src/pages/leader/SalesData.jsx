import React, {useState, useRef, useEffect} from 'react'
import {Link,Redirect} from 'react-router-dom'

export default function SalesData() {
    const [salesData, setSalesData] = useState([
    {id: "1", staff_id: "23455678", name: "Nancy ciaw", role: "sales", email: "nancy@gmail.com", phone_number: "6281382247337"},
    {id: "2", staff_id: "23455678", name: "Nancy ciaw", role: "sales", email: "nancy@gmail.com", phone_number: "6281382247337"},
    {id: "3", staff_id: "23455678", name: "Nancy ciaw", role: "sales", email: "nancy@gmail.com", phone_number: "6281382247337"}])

    // staff id, name, role, email, phone number

    const renderSales = salesData.map((sales) => {
            return (
                <div className="card mb-2 border border-primary">
                    <div className="card-body">
                       <div className="container-fluid">
                            <div className="row">
                                <div className="col-4">
                                    <h5 className="card-title" style={{fontSize:".7rem"}}>Staff Id</h5>
                                </div>
                                <div className="col-1">
                                    <h5 className="card-title" style={{fontSize:".7rem"}}>:</h5>
                                </div>
                                <div className="col-6">
                                    <h5 className="card-title" style={{fontSize:".8rem"}}>{sales.staff_id}</h5>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <h5 className="card-title" style={{fontSize:".7rem"}}>Name</h5>
                                </div>
                                <div className="col-1">
                                    <h5 className="card-title" style={{fontSize:".7rem"}}>:</h5>
                                </div>
                                <div className="col-6">
                                    <h5 className="card-title" style={{fontSize:".8rem"}}>{sales.name}</h5>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <h5 className="card-title" style={{fontSize:".7rem"}}>Role</h5>
                                </div>
                                <div className="col-1">
                                    <h5 className="card-title" style={{fontSize:".7rem"}}>:</h5>
                                </div>
                                <div className="col-6">
                                    <h5 className="card-title" style={{fontSize:".8rem"}}>{sales.role}</h5>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <h5 className="card-title" style={{fontSize:".7rem"}}>Phone Number</h5>
                                </div>
                                <div className="col-1">
                                    <h5 className="card-title" style={{fontSize:".7rem"}}>:</h5>
                                </div>
                                <div className="col-6">
                                    <h5 className="card-title" style={{fontSize:".8rem"}}>{sales.phone_number}</h5>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <h5 className="card-title" style={{fontSize:".7rem"}}>Email</h5>
                                </div>
                                <div className="col-1">
                                    <h5 className="card-title" style={{fontSize:".7rem"}}>:</h5>
                                </div>
                                <div className="col-6">
                                    <h5 className="card-title" style={{fontSize:".8rem"}}>{sales.email}</h5>
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
                {renderSales}
            </div>
        </div>        
    )
}
