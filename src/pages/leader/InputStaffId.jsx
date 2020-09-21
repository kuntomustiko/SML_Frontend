import React, {useState, useRef} from 'react'
import axios from '../../config/api'
import { Redirect} from 'react-router-dom'

import Swal from 'sweetalert2'

export default function InputStaffId() {

    const inputStaffIdRef = useRef()
    const [boolBtnSubmitData, setboolBtnSubmitData] = useState(false)

    const onButtonSubmitData = () => {
        const vInputStaffIdRef = inputStaffIdRef.current.value 
        const data = {staff_id: vInputStaffIdRef}
        axios.post('/leader/insert/staffid', data)
        .then(res => {
            console.log(res);
            setboolBtnSubmitData(true)
            Swal.fire({
                icon: 'success',
                title: 'Success',
                showConfirmButton: false,
                timer: 1500
            });  
        }).catch(err => console.log({err}))
    }
    return (
      <div className="card">
            <div className="card-header text-center">
                <h4>Input Staff Id</h4>
            </div>
            <div className="card-body">
                <form>
                    <div className="form-group">
                        <label>Staff Id</label>
                        <input type="text" className="form-control form-control-sm"ref={inputStaffIdRef} placeholder="Masukkan Staff Id" required/>
                    </div>
                </form>
                {!boolBtnSubmitData ? 
                    <input onClick={onButtonSubmitData} type="button" value="Next" className="btn btn-success btn-block"/>
                    : 
                    <Redirect to="/" />
                }
            </div>
      </div>
    )
}
