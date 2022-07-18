const useToggleTodo = async (token, id) => {
  const API = `https://todoo.5xcamp.us/todos/${id}/toggle`
  const requestOptions = {
    method: 'PATCH',
    headers: {
       'Content-Type': 'application/json',
       'Authorization': token
      },
  }
  const response = await fetch(API, requestOptions)
  const responseJson = await response.json()
  return responseJson
}

export default useToggleTodo

