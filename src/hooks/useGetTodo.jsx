const useGetTodo = async (token) => {
  const API = "https://todoo.5xcamp.us/todos"
  const requestOptions = {
    method: 'GET',
    headers: {
       'Content-Type': 'application/json',
       'Authorization': token
      },
  }
  const response = await fetch(API, requestOptions)
  const responseJson = await response.json()
  return responseJson
}

export default useGetTodo