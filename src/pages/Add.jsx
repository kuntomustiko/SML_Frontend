import React, {useState, useRef, useEffect} from 'react'

export default function Add() {
    const storeNameRef = useRef()
    const addressRef = useRef()
    const categoryRef = useRef()
    const phone_numberRef = useRef()
    const locationRef = useRef()
    const KTPRef = useRef()
    const storeImageRef = useRef()
    const signaturenRef = useRef()

    const onButtonClick = () => {

    }

    return (
        <div>
           <div class="card">
           <div class="card-header text-center">
                <h4>Tambah Data</h4>
  </div>
  <div class="card-body">
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
        <input type="text" className="form-control form-control-sm"ref={addressRef} placeholder="Masukkan alamat" required/>
        <label>Phone number</label>
        <input type="password" className="form-control form-control-sm"ref={phone_numberRef} placeholder="Masukkan nomer telepon" required/>
        <label>location</label>
        <input type="password" className="form-control form-control-sm"ref={locationRef} placeholder="Masukkan kordinat map" required/>
        <label>KTP image</label>
        <input type="file" className="form-control form-control-sm"ref={KTPRef} placeholder="Masukkan foto KTP" required/>
        <label>Store image</label>
        <input type="file" className="form-control form-control-sm"ref={storeImageRef} placeholder="Masukkan foto toko" required/>
        <label>Signature</label>
        <input type="file" className="form-control form-control-sm"ref={signaturenRef} placeholder="Masukkan tanda tangan" required/>
    </div>
</form>
  </div>
</div>
    <input onClick={onButtonClick} type="button" value="Login" className="btn btn-success btn-block"/>
        </div>
    )
}
