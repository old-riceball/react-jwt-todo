import toast from 'react-hot-toast'

const useLogout = async (token) => {
  const API = "https://todoo.5xcamp.us/users/sign_out"
  const requestOptions = {
    method: 'DELETE',
    headers: {
       'Content-Type': 'application/json',
       'Authorization': token
      },
  }
  const response = await fetch(API, requestOptions).catch(error=> { toast.error(error) })
  const responseJson = await response.json()
  
  if (!response.ok) {
    toast.error(responseJson.message)
    return (false)
  }
  localStorage.clear()
  return (toast.success(responseJson.message), true)
}

export default useLogout