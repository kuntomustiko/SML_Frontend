
const init = {
   id: "",
   name: "",
   token : "",
   role_id : "",
}

export default (state = init , {type, payload}) => {
   switch(type) {
      case 'LOGIN_SUCCESS':
         return {...state, id: payload.id, name: payload.name, token : payload.token, role_id : payload.role_id}
      case 'LOGOUT_SUCCESS':
         return {...init}
      
      default :
         return state
   }
}