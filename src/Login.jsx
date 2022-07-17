import { useState } from 'React'
import { Link } from 'react-router-dom'

const Login = () => {
  const [input, setInput] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setInput((prev) => { return {...prev, [name]:value}})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const API = "https://todoo.5xcamp.us";
    
    const registerBody = JSON.stringify({
      user: {
        email: input.email,
        password: input.password
      }
    });
    
    const registerRequestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: registerBody,
      redirect: "follow"
    };

    fetch(`${API}/users/sign_in`, registerRequestOptions)
      .then(res => {
        if (!res.ok) {throw Error(res.statusText)}
        localStorage.setItem('login', res)
        window.location.href= "/todo"
      })
      .catch(error => console.error(error))
  }


  return (
    <div className="h-full lg:flex gap-24 mx-auto">
      <div className="flex flex-col items-center">
        <img
          className="mb-4 block max-w-full"
          width="313"
          height="47"
          src="https://res.cloudinary.com/thegroup/image/upload/v1657854080/codepen/HexSchool%20-%20online%20todo-list%20react/logo_lg.svg"
          alt="Online todo list logo"
        />
        <picture>
          <source
            media="(min-width: 1024px)"
            srcSet="https://res.cloudinary.com/thegroup/image/upload/v1657854080/codepen/HexSchool%20-%20online%20todo-list%20react/board-man-02.png"
          />
          <source
            media="(max-width: 1024px)"
            srcSet="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
            sizes="100%"
          />
          <img src="***url of image***" alt="一個人拿著鉛筆準備完成代辦事項" />
        </picture>
      </div>
      <div>
        <h2 className="mb-6 text-2xl font-bold text-center">
          最實用的線上代辦事項服務
        </h2>
        <form onSubmit={handleSubmit} className="max-w-[300px]">
          <label name="email" className="font-medium mb-7 block">
            電子信箱
            <input
              onChange={handleInputChange}
              className="mt-1 w-full px-4 py-3 rounded"
              name="email"
              type="email"
              placeholder="請輸入 E-mail"
              required
            />
          </label>
          <label className="font-medium mb-7 block">
            密碼
            <input
              onChange={handleInputChange}
              className="mt-1 w-full px-4 py-3 rounded"
              name="password"
              type="password"
              placeholder="請輸入密碼"
              required
            />
          </label>
          <div className="flex flex-col gap-3">
            <input
              className="w-full flex-1 bg-gray-700 text-white py-3 px-12 rounded cursor-pointer"
              type="submit"
              value="登入"
              required
            />
            <Link to="/register" className="text-center w-full flex-1 py-3 px-12">
            註冊
            </Link>
            <button ></button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login