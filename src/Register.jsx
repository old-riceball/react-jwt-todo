import { useState } from 'react'
import { useNavigate, Link } from "react-router-dom"
import useRegister from './hooks/useRegister'
import boardMan from './assets/board-man-01.png'
import logo from './assets/logo_lg.svg'

const Register = () => {
  const navigate = useNavigate()
  const [passwordFailed, setPasswordFailed] = useState(false)
  const [input, setInput] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setInput((prev) => { return {...prev, [name]:value}})
  }

  const handlePasswordDoubleCheck = (e) => {
    setPasswordFailed(false)
    handleInputChange(e)
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    if (input.password !== input.passwordDoubleCheck) {
      setPasswordFailed(true)
      return
    }
    if (await useRegister(input.email, input.nickname, input.password))
    {
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
          註冊您的代辦清單
        </h2>
        <form onSubmit={handleSubmit} className="max-w-[300px]">
          <label className="font-medium mb-7 block">
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
            您的暱稱
            <input
              onChange={handleInputChange}
              className="mt-1 w-full px-4 py-3 rounded"
              name="nickname"
              type="text"
              placeholder="請輸入您的暱稱"
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
          <div className=" mb-7">
            <label className="font-medium">
              再次輸入密碼
              <input
                onChange={handlePasswordDoubleCheck}
                className="mt-1 w-full px-4 py-3 rounded"
                name="passwordDoubleCheck"
                type="password"
                placeholder="請再次輸入密碼"
                required
              />
            </label>
            <div className={`text-danger font-medium select-none ${passwordFailed ? 'block' : 'hidden'}`}>
              * 重複輸入密碼有誤
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <input
              className="w-full flex-1 bg-gray-700 text-white py-3 px-12 rounded cursor-pointer"
              type="submit"
              value="註冊"
              required
            />
            <Link to="/login" className="text-center w-full flex-1 py-3 px-12">
            已經有帳號
            </Link>
            <button ></button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register