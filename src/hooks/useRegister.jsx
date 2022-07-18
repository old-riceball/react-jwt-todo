const useRegister = async (email, nickname, password) => {
  const API = "https://todoo.5xcamp.us/users"
  const body = JSON.stringify({
    user: {
      email,
      nickname,
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

  if (!response.ok) { return false }

  localStorage.setItem('token', response.headers.get('Authorization'))
  localStorage.setItem('nickname', responseJson.nickname)
  return true
}

export default useRegister