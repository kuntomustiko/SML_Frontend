import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {Link,Redirect} from 'react-router-dom'
import axios from '../config/api'
import './style.css'
export default function Login() {
    const username = useSelector(state => state.auth.username)
    const dispatch = useDispatch()           
    const emailRef = useRef()
    const passwordRef = useRef()

    const onButtonClick = () => {
    }

    return (
        <div className="container-fluid">
        <div className="row">
            <div className="col-12">
            <div className="card w-100 mx-auto m ">
                <div className="card-header">
                    <h3 className="text-center">LOGIN</h3>
                </div>
                <div className="card-body">
                <form>
                    <div className="form-group">
                        <label>Staff ID</label>
                        <input type="text" className="form-control"ref={emailRef} placeholder="Masukkan email"/>
                        <label>Password</label>
                        <input type="password" className="form-control"ref={passwordRef} placeholder="Masukkan Password"/>
                    </div>
                </form>
                        <Link to="/register">
                        <p className="text-center">Belum punya akun?</p>
                        </Link>
                        
                    <div>    
                            <input onClick={onButtonClick} type="button" value="Login" className="btn btn-success btn-block"/>
                    </div>

                </div>
                </div>
            </div>
        </div>
</div>
    )

}