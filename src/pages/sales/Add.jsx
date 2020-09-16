import React, {useState, useRef, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import axios from '../../config/api'


export default function Add() {

    const staff_id = useSelector(state => state.auth.staff_id)

    const storeNameRef = useRef()
    const categoryRef = useRef()
    const addressRef = useRef()
    const phone_numberRef = useRef()
    const KTPRef = useRef()
    const storeImageRef = useRef()
    const signatureRef = useRef()

    const [latitude, setLatitude] = useState()
    const [longitude, setLongitude] = useState()
    const [location, setLocation] = useState(false)
    const [id, setId] = useState()
    const [boolBtnSubmitData, setBooBtnSubmitData] = useState(false)
    const [lastData, setLastData] = useState()

    useEffect(() =>{
        getLocation()
        getId()
       
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

    // get data dari id dan data terakhir
    const getLastDataFromId = () =>{
        axios.get(`/merchant/lastdata/sales/${id}`)
        .then(res => {
            setLastData(res.data)
            console.log(res.data);
        })
        .catch(err => console.log({err}))
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

        const latlong = `${latitude}, ${longitude}`

        let data = {staff_id: id, date_created: today, store_name: vStoreNameRef, category_id: vCategoryRef, address: vAddressRef, mobile_number: vPhone_numberRef, location: latlong, approval: 0 }

        axios.post('/merchant/sales/insert', data)
            .then(res => {
                console.log(res);
                setBooBtnSubmitData(true)
                getLastDataFromId()
            })
            .catch(err => console.log({err}))
    }

    const onButtonSubmitKTPImage = () => {
      
        const body = new FormData()
        let image = KTPRef.current.files[0]

        // 1 append merupakan 1 baris yang di isi di form-data 
        body.append("ktpimage", image)
        // upload gambar dengan membawa data-data
        body.append("store_name", lastData.store_name)
        body.append("staff_id", lastData.staff_id)

        axios.patch('/merchant/fistadd/ktpimage', body)
        .then(res => console.log('foto telah berhasil dirubah'))
        .catch(err => console.log(err))



    }

    const onButtonSubmitStoreImage = () => {
        const body = new FormData()
        let image = storeImageRef.current.files[0]

        // 1 append merupakan 1 baris yang di isi di form-data 
        body.append("storeimage", image)
        // upload gambar dengan membawa data-data
        body.append("store_name", lastData.store_name)
        body.append("staff_id", lastData.staff_id)

        axios.patch('/merchant/fistadd/storeimage', body)
        .then(res => console.log('foto telah berhasil dirubah'))
        .catch(err => console.log(err))
    }

    const onButtonSubmitSignatureImage = () => {
        const body = new FormData()
        let image = signatureRef.current.files[0]

        // 1 append merupakan 1 baris yang di isi di form-data 
        body.append("signatureimage", image)
        // upload gambar dengan membawa data-data
        body.append("store_name", lastData.store_name)
        body.append("staff_id", lastData.staff_id)

        axios.patch('/merchant/fistadd/signatureimage', body)
        .then(res => console.log('foto telah berhasil dirubah'))
        .catch(err => console.log(err))
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
                                <option value="1">Fast Food</option>   
                                <option value="2">Restaurant</option>   
                                <option value="3">Barber Shop</option>                        
                            </select>
                            <label>Address</label>
                                <textarea type="text" className="form-control form-control-sm"ref={addressRef} placeholder="Masukkan alamat" required/>
                            <label>Phone number</label>
                                <input type="text" className="form-control form-control-sm"ref={phone_numberRef} placeholder="Masukkan nomer telepon" required/>
                            <label>location</label>
                                <p>Latitude {latitude} --- Longitude {longitude}</p>

                            {!boolBtnSubmitData ? 
                                <input onClick={onButtonSubmitData} type="button" value="Submit" className="btn btn-success btn-block"/>
                                : 
                                <input onClick={onButtonSubmitData} type="button" value="Submit" className="btn btn-secondary btn-block disabled"/>
                            }

                            <label className="mt-3">KTP image</label>
                                <input type="file" className="form-control form-control-sm"ref={KTPRef} placeholder="Masukkan foto KTP" required/>
                                <input onClick={onButtonSubmitKTPImage} type="button" value="Submit KTP" className="btn btn-success btn-block mt-2 mb-3"/>
                            <label>Store image</label>
                                <input type="file" className="form-control form-control-sm"ref={storeImageRef} placeholder="Masukkan foto toko" required/>
                                <input onClick={onButtonSubmitStoreImage} type="button" value="Submit Store" className="btn btn-success btn-block mt-2 mb-3"/>
                            <label>Signature</label>
                                <input type="file" className="form-control form-control-sm"ref={signatureRef} placeholder="Masukkan tanda tangan" required/>
                                <input onClick={onButtonSubmitSignatureImage} type="button" value="Submit Signature" className="btn btn-success btn-block mt-2 mb-3"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
