import React, {useState, useRef, useEffect} from 'react'
import axios from '../../config/api'

// paginate
import Paginator from 'react-hooks-paginator';
import './MerchantData.css'

export default function SalesData() {
    const [salesData, setSalesData] = useState([])
    const [countSales, setCountSales] = useState()

    const [resultFilter, setResultFilter] = useState([])

     const staffIdRef = useRef()

     // paginate
    const pageLimit = 5;
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentData, setCurrentData] = useState([]);


    useEffect(() => {
        getDataSales()
    }, [])
   
    useEffect(() => {
      setCurrentData(salesData.slice(offset, offset + pageLimit));
    }, [offset, salesData]);

    const getDataSales = () => {
        axios.get(`/merchant/leader/read/salesdata`).then((res) =>{
            setSalesData(res.data)
            renderCountMerchant(res.data.staff_id)
        }).catch(err => console.log(err))
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

    const funFilterStaffId = () =>{
        const vStaffIdRef = staffIdRef.current.value
        axios.get(`/merchant/leader/filter/${vStaffIdRef}`)
        .then(res => {
            setResultFilter(res.data)
            console.log(res.data);
        })
        .catch(err => console.log({err}))    

    }

    const funClearFilterStaffId = () => {
        setResultFilter([])
    }
    
    const filterStaffId =  () =>{
        return(
            <div className="mx-auto shadow ">
                <div className="card text-center" style={{width: "15rem"}}>
                    <div className="card-body">
                        <form>
                            <div className="form-row">
                                <label>Staff Id</label>
                                <input type="text" ref={staffIdRef} className="form-control form-control-sm" placeholder="Masukkan staff id" required/>
                            </div>
                        </form>  
                    </div>
                    <button onClick={funFilterStaffId} className="btn btn-primary mx-auto mb-2" style={{width: "8rem"}} type="submit">Filter</button>
                    <button onClick={funClearFilterStaffId} className="btn btn-warning mx-auto mb-2" style={{width: "8rem"}} type="submit">Clear</button>
                </div>
            </div>
        )
    }

    const renderFilter = resultFilter.map((sales, index) => {
        return (
            <div key={index} className="card mb-2 border border-primary shadow-sm">
                <div className="card-body ">
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

    const renderSales = currentData.map((sales, index) => {
            return (
                <div key={index} className="card mb-2 border border-primary shadow-sm">
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
            <div className="row mb-5 ">
                {filterStaffId()}
            </div>
            <div className="row text-center">
                <div className="col-12 text-center">
                    {resultFilter.length > 0 ? 
                    renderFilter :
                    renderSales}
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <Paginator
                        totalRecords={salesData.length}
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
