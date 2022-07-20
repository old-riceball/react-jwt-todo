import { useState } from 'react'
import { useNavigate, Link } from "react-router-dom"
import useLogin from './hooks/useLogin'
import boardMan from './assets/board-man-01.png'
import logo from './assets/logo_lg.svg'

const Login = () => {
  const navigate = useNavigate()
  const [input, setInput] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setInput((prev) => { return {...prev, [name]:value}})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (await useLogin(input.email, input.password)){
      navigate('/todo') 
    }
  }

  return (
    <div className="h-full lg:flex gap-24 mx-auto">
      <div className="flex flex-col items-center">
        <img className="mb-4" width="313" height="47" src={logo} alt="Online todo list logo" />
        <picture>
          <source
            media="(min-width: 1024px)"
            srcSet={boardMan}
          />
          <source
            media="(max-width: 1024px)"
            srcSet="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
          />
          <img className="hidden lg:block" width="386" height="386" src={boardMan} alt="一個人拿著鉛筆準備完成代辦事項" />
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
            註冊帳號
            </Link>
            <button ></button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login