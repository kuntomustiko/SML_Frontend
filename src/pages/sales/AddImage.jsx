import React, {useState, useRef, useEffect} from 'react'
import { useSelector } from 'react-redux';
import axios from '../../config/api'


export default function AddImage() {

    const staff_id = useSelector(state => state.auth.staff_id)

    const KTPRef = useRef()
    const storeImageRef = useRef()
    const signatureRef = useRef()

    const [id, setId] = useState()
    const [boolBtnSubmitKTP, setBoolBtnSubmitKTP] = useState(false)
    const [boolBtnSubmitStore, setBoolBtnSubmitStore] = useState(false)
    const [boolBtnSubmitSignature, setBoolBtnSubmitSignature] = useState(false)
    const [lastData, setLastData] = useState()

    useEffect(() =>{
        getId()
    },[])


    // get id dari staff id di table_merchant
    const getId = () =>{
        axios.get(`/sales/read/id/${staff_id}`)
        .then(res => {
            setId(res.data.id) // id 10 dari staff_id 4444
            getLastDataFromId(res.data.id)
        })
        .catch(err => console.log({err}))
    }

    // get data dari id dan data terakhir
    const getLastDataFromId = (idi) =>{
        axios.get(`/merchant/lastdata/sales/${idi}`)
        .then(res => {
            setLastData(res.data)
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
        .then(res => {
            setBoolBtnSubmitKTP(true)
            console.log('foto telah berhasil dirubah')
        }).catch(err => console.log(err))
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
        .then(res => {
            setBoolBtnSubmitStore(true)
            console.log('foto telah berhasil dirubah')
        }).catch(err => console.log(err))
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
        .then(res => {
            setBoolBtnSubmitSignature(true)
            console.log('foto telah berhasil dirubah')
        }).catch(err => console.log(err))
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
                            <label className="mt-3">KTP image</label>
                                <input type="file" className="form-control form-control-sm"ref={KTPRef} placeholder="Masukkan foto KTP" required/>
                                {boolBtnSubmitKTP ? 
                                    <input onClick={onButtonSubmitKTPImage} type="button" value="Sudah Tersimpan" className="btn btn-success btn-block mt-2 mb-3 disabled"/>
                                :
                                    <input onClick={onButtonSubmitKTPImage} type="button" value="Submit KTP" className="btn btn-success btn-block mt-2 mb-3"/>
                                }
                            <label>Store image</label>
                                <input type="file" className="form-control form-control-sm"ref={storeImageRef} placeholder="Masukkan foto toko" required/>
                                {boolBtnSubmitStore ? 
                                    <input onClick={onButtonSubmitStoreImage} type="button" value="Sudah Tersimpan" className="btn btn-success btn-block mt-2 mb-3 disabled"/>
                                :
                                    <input onClick={onButtonSubmitStoreImage} type="button" value="Submit Store" className="btn btn-success btn-block mt-2 mb-3"/>
                                }
                            <label>Signature</label>
                            <input type="file" className="form-control form-control-sm"ref={signatureRef} placeholder="Masukkan tanda tangan" required/>
                                {boolBtnSubmitSignature ? 
                                    <input onClick={onButtonSubmitSignatureImage} type="button" value="Sudah Tersimpan" className="btn btn-success btn-block mt-2 mb-3 disabled"/>
                                :
                                    <input onClick={onButtonSubmitSignatureImage} type="button" value="Submit Signature" className="btn btn-success btn-block mt-2 mb-3"/>
                                }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
