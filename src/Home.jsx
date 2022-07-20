import { useState } from 'react'
import { Link } from 'react-router-dom'
import boardMan from './assets/board-man-01.png'

const Home = () => {
  const [nickname, setNickname] = useState([localStorage.getItem('nickname') || "陌生朋友"]) 
  
  return (
    <>
      <div className="flex flex-col items-center">
          <picture className="mb-12">
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
        <h1 className="text-4xl font-bold text-center mb-12">{ nickname } ，請選擇您想到的地方。</h1>
        <div className="flex w-full gap-4 mt-8 text-lg"> 
          <Link className="rounded-lg aspect-square flex-1 border-2 border-gray-600 flex justify-center items-center hover:bg-gray-800 hover:text-white " to="/login">登入帳號</Link>
          <Link className="rounded-lg aspect-square flex-1 border-2 border-gray-600 flex justify-center items-center hover:bg-gray-800 hover:text-white " to="/register">註冊帳號</Link>
         
          { localStorage.getItem('nickname') && <Link className="rounded-lg aspect-square flex-1 border-2 border-gray-600 flex justify-center items-center hover:bg-gray-800 hover:text-white " to="/todo">寫代辦事項</Link> }
         
        </div>
      </div>
    </>
    )
}

export default Home