import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {Link,Redirect} from 'react-router-dom'
import axios from '../../config/api'

function Register() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordCekRef = useRef()
    const namaRef = useRef()
    const staffIDRef = useRef()

    const onButtonClick = () => {
        axios.get('/staff')
        .then(res => console.log(res.data))
        .catch(err => console.log({err}))
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
                            <input onClick={onButtonClick} type="button" value="Register" className="btn btn-success btn-block"/>
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
