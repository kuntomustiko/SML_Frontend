import React, { useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {Link,Redirect} from 'react-router-dom'
import axios from '../config/api'
import {loginAction} from '../config/redux/actions/index'
import './style.css'

export default function Login() {
    
    const dispatch = useDispatch()           

    const [boolLogin, setBoolLogin] = useState(false)

    const emailRef = useRef()
    const passwordRef = useRef()

    const onButtonClick = () => {

        const vEmailRef = emailRef.current.value 
        const vPasswordRef = passwordRef.current.value 

        let data = {email: vEmailRef, password: vPasswordRef}

        axios.post('/login_staff', data)
            .then(({data : {token, user : {id,staff_id, email, role_id}}}) => {
                // simpan ke redux
                dispatch(loginAction({staff_id, email, token, role_id}))
                console.log("berhasil masuk" + staff_id + " token " + token + " username " + email + role_id)
                setBoolLogin(true)
            })
            .catch(err => console.log({err}))
    }

    return !boolLogin ? (
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
                                    <label>Email </label>
                                        <input type="text" className="form-control" ref={emailRef} placeholder="Masukkan Email"/>
                                    <label>Password</label>
                                        <input type="password" className="form-control"ref={passwordRef} placeholder="Masukkan Password"/>
                                </div>
                            </form>
                            <Link to="/register">
                                <p className="text-center">Belum punya akun?</p>
                            </Link>
                                
                            <div>  
                            <Link to={`/`}>
                                <input onClick={onButtonClick} type="button" value="Login" className="btn btn-success btn-block"/>
                            </Link>  
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <Redirect to='/' />
    )

}