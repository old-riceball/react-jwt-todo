const useLogout = async (token) => {
  const API = "https://todoo.5xcamp.us/users/sign_out"
  const requestOptions = {
    method: 'DELETE',
    headers: {
       'Content-Type': 'application/json',
       'Authorization': token
      },
  }
  const response = await fetch(API, requestOptions)
  const responseJson = await response.json()
  alert(responseJson.message);
  if (!response.ok) { return false }
  localStorage.clear()
  return true
}

export default useLogout