import React, {useState, useRef, useEffect} from 'react'
import {Link,Redirect} from 'react-router-dom'
import axios from '../../config/api'

export default function SalesData() {
    const [salesData, setSalesData] = useState([])
    const [countSales, setCountSales] = useState()
    
    useEffect(() =>{
        getDataSales()
    },[])

    const getDataSales = () => {
        axios.get(`/merchant/leader/read/salesdata`).then((res) =>{
            setSalesData(res.data)
            console.log(res.data);
            renderCountMerchant(res.data.staff_id)
        }).catch(err => console.log(err))

        // renderCountMerchant(salesData.staff_id)
    }
    
    const renderCountMerchant = (staff_id) =>{
   
            axios.get(`/sales/read/id/${staff_id}`)
            .then(res => {
               axios.get(`/merchant/leader/read/countmerchantsales/${res.data.id}`)
               .then(res => {
                console.log(res.data[0].merchant);
                setCountSales(res.data[0].merchant)
               })
               .catch(err => console.log({err}))
            })
            .catch(err => console.log({err}))    
    }

    const renderSales = salesData.map((sales, index) => {
            return (
                <div key={index} className="card mb-2 border border-primary">
                    <div className="card-body">
                       <div className="container-fluid">
                            <h5 className="card-title">{sales.name}</h5>
                            <small>{sales.staff_id}</small>
                            <h6 className="card-text">{sales.email}</h6>
                            <h6 className="card-text mt-0">{sales.phone_number}</h6>
                            <h6>{countSales} Merchant</h6>
                       </div>
                    </div>
                </div>
            )
        })  

    return (
        <div className="main mx-auto p-5">
            <div className="row text-center">
                <div className="col-12 text-center">
                    {renderSales}
                </div>
            </div>
        </div>        
    )
}
