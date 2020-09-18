import React, { useRef, useState } from 'react'
import {Link, Redirect} from 'react-router-dom'
import axios from '../config/api'

import Swal from 'sweetalert2'

function Register() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordCekRef = useRef()
    const namaRef = useRef()
    const staffIDRef = useRef()
    const phoneNumberRef = useRef()

    const [boolButtonSubmitRegister, SetBoolButtonSubmitRegister] = useState(false)

    const onButtonSubmitRegister = () => {
        let vStaffId = staffIDRef.current.value 
        let vEmailRef = emailRef.current.value 
        let vNama = namaRef.current.value 
        let vPassword = passwordRef.current.value 
        let vPasswordCek = passwordCekRef.current.value
        let vPhoneNumber = phoneNumberRef.current.value 
        let status = 0 

        console.log(vStaffId)

        let data = {staff_id: vStaffId , name: vNama , password: vPassword, email: vEmailRef, phone_number: vPhoneNumber, status}

        if(!vStaffId || !vEmailRef || !vNama || !vPassword || !vPasswordCek || !vPhoneNumber){
            Swal.fire({
                icon: 'warning',
                title: "Lengkapi data anda",
                showConfirmButton: false,
                timer: 1500
            }); 
        } else if(vStaffId && vEmailRef && vNama && vPassword && vPasswordCek && vPhoneNumber){
            axios.post('/register_staff', data)
            .then(res =>{
            Swal.fire({
                icon: 'warning',
                title: res.data.message,
                showConfirmButton: false,
                timer: 1500
            }); 
            console.log(res.data)
            SetBoolButtonSubmitRegister(true)
            }) .catch(err => console.log({err}))
        }

        
    }

    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card w-100 mx-auto mt-2 ">
                            <div className="card-header">
                                <h3 className="text-center">REGISTER</h3>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>Staff ID</label>
                                            <input type="text" className="form-control"ref={staffIDRef} placeholder="Masukkan staff ID" required/>
                                        <label>Email</label>
                                            <input type="text" className="form-control"ref={emailRef} placeholder="Masukkan email" required/>
                                        <label>Nama</label>
                                            <input type="text" className="form-control"ref={namaRef} placeholder="Masukkan nama" required/>
                                        <label>Phone Number</label>
                                            <input type="number" className="form-control"ref={phoneNumberRef} placeholder="Masukkan phone number" required/>
                                        <label>Password</label>
                                            <input type="password" className="form-control"ref={passwordCekRef} placeholder="Masukkan password" required/>
                                        <label>Password</label>
                                            <input type="password" className="form-control"ref={passwordRef} placeholder="Masukkan password kembali" required/>
                                    </div>
                                </form>
                                <Link to="/login">
                                    <p className="text-center">Sudah punya akun?</p>
                                </Link>
                                    
                                <div>   
                                    {!boolButtonSubmitRegister ? 
                                        <input onClick={onButtonSubmitRegister} type="button" value="Register" className="btn btn-success btn-block"/>
                                        : 
                                        <Redirect to="/login" />
                                    } 
                                </div>
                           
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
