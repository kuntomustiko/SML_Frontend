import React, {useState, useRef, useEffect} from 'react'
import { useSelector } from 'react-redux';
import axios from '../../config/api'
import { Redirect} from 'react-router-dom'

import Swal from 'sweetalert2'

export default function Add() {

    const staff_id = useSelector(state => state.auth.staff_id)

    const storeNameRef = useRef()
    const categoryRef = useRef()
    const addressRef = useRef()
    const phone_numberRef = useRef()
    const locationRef = useRef()

    const [latitude, setLatitude] = useState()
    const [longitude, setLongitude] = useState()
    const [location, setLocation] = useState(false)
    const [id, setId] = useState()
    const [boolBtnSubmitData, setBooBtnSubmitData] = useState(false)

    const [category, setCategory] = useState([])

    useEffect(() =>{
        getLocation()
        getId()
        getAllCategory()
    },[])

    const getLocation = () =>{
        if (navigator.geolocation) {
            setLocation(true)
            navigator.geolocation.getCurrentPosition(showPosition);
          } else { 
            setLocation(false)
          }
    }

    function showPosition(position) {
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
        console.log(staff_id);
    }

    // get id dari staff id di table_merchant
    const getId = () =>{
        axios.get(`/sales/read/id/${staff_id}`)
        .then(res => {
            setId(res.data.id) // id 10 dari staff_id 4444
        })
        .catch(err => console.log({err}))
    }

    // get read data all category for option
    const getAllCategory = () =>{
        axios.get(`/read/allcategory`)
        .then(res => {
            setCategory(res.data)
            console.log(res.data);
        })
        .catch(err => console.log({err}))
    }

    // render category option on UI
    const renderCategory = () =>{
        return category.map((cat, index) =>{
            return(
            <option key={index} value={cat.id}>{cat.category}</option>  
            )
        })
    }

    const onButtonSubmitData = () => {

        var timeNow = new Date();
        var date = timeNow.getFullYear()+'-'+(timeNow.getMonth()+1)+'-'+timeNow.getDate();

        var time = timeNow.getHours() + ":" + timeNow.getMinutes() + ":" + timeNow.getSeconds();
        var today = date + ' ' + time;

        const vStoreNameRef = storeNameRef.current.value 
        const vCategoryRef = parseInt(categoryRef.current.value)
        const vAddressRef = addressRef.current.value 
        const vPhone_numberRef = phone_numberRef.current.value 
        const vLocationRef = locationRef.current.value

        const latlong = `${latitude}, ${longitude}`

        let data; 
        
        if (vLocationRef) {
            data = {staff_id: id, date_created: today, store_name: vStoreNameRef, category_id: vCategoryRef, address: vAddressRef, mobile_number: vPhone_numberRef, location: location, approval: 0 }
        } else {
            data = {staff_id: id, date_created: today, store_name: vStoreNameRef, category_id: vCategoryRef, address: vAddressRef, mobile_number: vPhone_numberRef, location: latlong, approval: 0 }
        }

        if (vStoreNameRef === "" || vCategoryRef === "" || vAddressRef === "" || vPhone_numberRef === "") {
            Swal.fire({
                icon: 'error',
                title: 'Lengkapi dahulu datanya',
                showConfirmButton: false,
                timer: 1500
            });  
        } else{
            axios.post('/merchant/sales/insert', data)
            .then(res => {
                console.log(res);
                setBooBtnSubmitData(true)
            }).catch(err => console.log({err}))
        }
      
    }

    return (
        <div>
            <div className="card">
                <div className="card-header text-center">
                    <h4>Tambah Data</h4>
                </div>
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <label>Store name</label>
                                <input type="text" className="form-control form-control-sm"ref={storeNameRef} placeholder="Masukkan nama toko" required/>
                            <label>Category</label> 
                            <select ref={categoryRef} className="form-control form-control-sm">
                                {renderCategory()}
                            </select>
                            <label>Address</label>
                                <textarea type="text" className="form-control form-control-sm"ref={addressRef} placeholder="Masukkan alamat" required/>
                            <label>Phone number</label>
                                <input type="text" className="form-control form-control-sm"ref={phone_numberRef} placeholder="Masukkan nomer telepon" required/>
                            <label>location</label>
                                
                                {!location ? 
                                    <input type="text" className="form-control form-control-sm" ref={locationRef} placeholder="Masukkan Latitude Longitude" required/>
                                    :
                                    <p>Latitude {latitude} --- Longitude {longitude}</p>
                                }

                            {!boolBtnSubmitData ? 
                                <input onClick={onButtonSubmitData} type="button" value="Next" className="btn btn-success btn-block"/>
                                : 
                                <Redirect to="/addimage" />
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
