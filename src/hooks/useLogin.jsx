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

  const response = await fetch(API, requestOptions)
  const responseJson = await response.json()
  alert(responseJson.message + (responseJson.error ? responseJson.error : ""));



}

export default useLogin
