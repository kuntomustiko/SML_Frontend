import React, {useState, useEffect} from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginAction } from '../config/redux/actions'

import Home from '../pages/leader/Home.jsx'
import Login from '../pages/Login'
import Register from '../pages/Register.jsx'
import Add from '../pages/sales/Add'
import MerchantData from '../pages/leader/MerchantData.jsx'
import DetailMerchant from '../pages/DetailMerchant.jsx'
import NotApprove from '../pages/leader/NotApprove.jsx'
import SalesData from '../pages/leader/SalesData.jsx'

// Staff
import HomeSales from '../pages/sales/Home.jsx'
import MerchantDataSales from '../pages/sales/MerchantData.jsx'
// import DetailMerchant from '../pages/leader/DetailMerchant.jsx'


import { useSelector } from 'react-redux';

export default function App() {


    // role id = 1 = sales, 2 = leader
    const role_id = useSelector(state => state.auth.role_id)


    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
 
    useEffect(() => {
       const user = JSON.parse(localStorage.getItem('user'))
 
       if(user) dispatch(loginAction(user)) 
       setLoading(false)
 
    }, [])

    return loading ? (
      <h1 className="text-center">L O A D I N G ...</h1>
   ) : (
        <div>
            <BrowserRouter>
                {
                role_id == 1 ? <Route path="/" exact component={HomeSales} /> : 
                role_id == 2 ? <Route path="/" exact component={Home} /> : 
                <Route path="/login" exact component={Login} />   
                }

                <Route path="/login" exact component={Login} />
                <Route path="/register" exact component={Register} />
                <Route path="/add" exact component={Add} />
                <Route path="/merchantdataleader"  component={MerchantData} />
                <Route path="/merchantdatasales"  component={MerchantDataSales} />
                <Route path="/detailmerchant/:id"  component={DetailMerchant} />
                <Route path="/notapprove"  component={NotApprove} />
                <Route path="/salesdata"  component={SalesData} />
            </BrowserRouter>
        </div>
        
    )
}