const useRemoveAllTodo = async(token, ids) => {
  const requestOptions = {
    method: 'DELETE',
    headers: {
       'Content-Type': 'application/json',
       'Authorization': token
      },
  }

  const APIs = ids.map(id => 'https://todoo.5xcamp.us/todos/'+ id)

  Promise.all(APIs.map( async url => {
    const response = await fetch(url, requestOptions).catch(error=> { toast.error(error) })
    const responseJson = await response.json()
    console.log(response, responseJson);
  }))
}

export default useRemoveAllTodo