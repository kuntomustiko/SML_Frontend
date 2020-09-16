
export const loginAction = (data) => {

   // localStorage.setItem('y',JSON.stringify(data))
   // y harus sama dengan x di removeItem ketika logout

   // Menyimpan data di localstorage
   localStorage.setItem('user',JSON.stringify(data))

   // Mengirim data ke redux untuk kemudian disimpan di redux state
   return { type: 'LOGIN_SUCCESS', payload: data }
}

export const logoutAction = () => {
   // localStorage.removeItem('x')
   // x harus sama dengan y di setItem ketika login

   // Menghapus data dari local storage
   localStorage.removeItem('user')

   // Mengirim data ke redux, untuk menghapus data user yang login dari redux state
   return { type: 'LOGOUT_SUCCESS'}
}
