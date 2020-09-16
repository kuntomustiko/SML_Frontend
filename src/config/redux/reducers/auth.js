
const init = {
   staff_id: "",
   email: "",
   token : "",
   role_id : ""
}

export default (state = init , {type, payload}) => {
   switch(type) {
      case 'LOGIN_SUCCESS':
         return {...state, staff_id: payload.staff_id ? payload.staff_id : state.staff_id,
                  email: payload.email,
                  token : payload.token ? payload.token : state.token, 
                   role_id : payload.role_id}
      case 'LOGOUT_SUCCESS':
         return {...init}
      
      default :
         return state
   }
}