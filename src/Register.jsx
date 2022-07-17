import { useState } from 'React'
import { Link } from 'react-router-dom'

import useLogin from './hooks/useLogin'
import useRegister from './hooks/useRegister'

const Register = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.password !== input.passwordDoubleCheck) {
      setPasswordFailed(true)
      return
    }

    useRegister(input.email, input.nickname, input.password)
  }

  return (
    <div className="h-full lg:flex gap-24 mx-auto">
      <div className="flex flex-col items-center">
        <button onClick={ () => useLogin('jja@gmail.com', 'firefox')}>UseLogin</button>
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
          註冊您的代辦清單
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