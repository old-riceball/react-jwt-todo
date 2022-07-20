const useAddTodo = async (token, content) => {
  const API = `https://todoo.5xcamp.us/todos`
  const body = JSON.stringify({
    "todo": {
      content
    }
  })
  const requestOptions = {
    method: 'POST',
    headers: {
       'Content-Type': 'application/json',
       'Authorization': token
      },
    body
  }
  const response = await fetch(API, requestOptions).catch(error=> { toast.error(error) })
  const responseJson = await response.json()
  return responseJson
}

export default useAddTodo