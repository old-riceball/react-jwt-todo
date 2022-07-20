const useRemoveTodo = async (token, id) => {
  const API = `https://todoo.5xcamp.us/todos/${id}`
  const requestOptions = {
    method: 'DELETE',
    headers: {
       'Content-Type': 'application/json',
       'Authorization': token
      },
  }
  const response = await fetch(API, requestOptions).catch(error=> { toast.error(error) })
  const responseJson = await response.json()
  return responseJson
}

export default useRemoveTodo
