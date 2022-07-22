import toast from "react-hot-toast"
const useLogin = async (email, password) => {
  const API = "https://todoo.5xcamp.us/users/sign_in"
  const body = JSON.stringify({
    user: {
      email,
      password
    }
  })
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body
  }
  const response = await fetch(API, requestOptions).catch(error=> { toast.error(error) })
  const responseJson = await response.json()

  if (!response.ok) {
    toast.error(responseJson.message)
    return false
  }

  localStorage.setItem('token', response.headers.get('Authorization'))
  localStorage.setItem('nickname', responseJson.nickname)
  toast.success(responseJson.message)
  return true
}

export default useLogin