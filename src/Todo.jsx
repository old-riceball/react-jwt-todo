import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useLogout from './hooks/useLogout'
import useGetTodo from './hooks/useGetTodo'
import useToggleTodo from './hooks/useToggleTodo'
import useAddTodo from './hooks/useAddTodo'
import useRemoveTodo from './hooks/useRemoveTodo'
import TodoList from './components/TodoList'

const Todo = () => {
    const navigate = useNavigate()

    const nickName = localStorage.getItem("nickname") ? localStorage.getItem("nickname") : "無登入"
    const token = localStorage.getItem('token')
    const groupType = "全部"

    const [input, setInput] = useState('')
    const [completedCount, setCompletedCount] = useState(0)
    const [tasks, setTasks] = useState([])

    const [filteredTasks, setFilteredTasks] = useState(structuredClone(gg))
    const [isLoadedTasks, setIsLoadedTasks] = useState(false)

    console.dir(filteredTasks);
    
    useEffect(() => {
        init()
    }, [])

    const init = async () => {
        const data = await useGetTodo(token)
        setTasks(data.todos)
        setIsLoadedTasks(true)
    }

    const toggleTask = async (index, id) => {
        const newTasks = [...tasks]
        const data = await useToggleTodo(token, id)
        newTasks[index].completed_at = data.completed_at
        setTasks(newTasks)
    }

    const removeTask = async (index, id) => {
        const newTasks = [...tasks]
        console.log(token, id);
        const data = await useRemoveTodo(token, id)

        newTasks.splice(index, 1)
        setTasks(newTasks)
    }

    const addTask = (content) => {
        setTasks([...tasks, {content}])
        useAddTodo(token, content)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        input && addTask(input)
        setInput('')        
    }

    const handleLogout = async() => {
        await useLogout(localStorage.getItem('token')) ? navigate('/login') : alert('not') 
    }

    const handleGroup = (e) => {

        e.target.parentElement.querySelectorAll('button').forEach(item => {
            item.classList.remove('todo__tab--active')
        })
        e.target.classList.add('todo__tab--active')

        switch (e.target.innerText) {
            case "全部":
                console.log('a');
                break
            case "待完成":
                console.log('b');
                break
            case "已完成":
                console.log('c');
                break
        }
    }

    return (
        <>
            <nav className="fixed top-0 left-0 w-full">
                <div className="flex mx-9 mt-4 justify-between items-center">
                    <Link to="/">
                        <img
                            width="313"
                            height="47"
                            src="https://res.cloudinary.com/thegroup/image/upload/v1657854080/codepen/HexSchool%20-%20online%20todo-list%20react/logo_lg.svg"
                            alt="Online todo list logo"
                            />
                    </Link>
                    <div className="flex whitespace-nowrap">
                        <p className="hidden sm:block font-bold text-xl px-3">{nickName} 的代辦事項</p>
                        <a onClick={handleLogout} className="px-3 cursor-pointer">登出</a>
                    </div>
                </div>
            </nav>
            <div className="w-full max-w-[500px]">
                <form onSubmit={handleSubmit} className="flex items-center bg-white shadow-md rounded-lg mb-4">
                    <input onChange={e => setInput(e.target.value)} className="w-full px-4 py-3 rounded-lg" type="text" placeholder="新增待辦事項" value={input} />
                    <button className="mx-1 bg-gray-700 w-10 aspect-square rounded-lg  right-0 relative">
                        <svg className="absolute right-1/2 top-1/2 transform-gpu -translate-y-1/2 translate-x-1/2" width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.6364 8.93184H11.8182V2.11364C11.8182 1.36091 11.2073 0.75 10.4545 0.75H9.54548C8.79275 0.75 8.18184 1.36091 8.18184 2.11364V8.93184H1.36364C0.610908 8.93184 0 9.54275 0 10.2955V11.2045C0 11.9573 0.610908 12.5682 1.36364 12.5682H8.18184V19.3864C8.18184 20.1391 8.79275 20.75 9.54548 20.75H10.4545C11.2073 20.75 11.8182 20.1391 11.8182 19.3864V12.5682H18.6364C19.3891 12.5682 20 11.9573 20 11.2045V10.2955C20 9.54275 19.3891 8.93184 18.6364 8.93184Z" fill="white"/>
                        </svg>
                    </button>
                </form>

                <div className="shadow-md bg-white rounded-lg">
                    <div onClick={handleGroup} className="flex">
                        <button className="flex-1 opacity-40 font-bold py-4 border-b-2 todo__tab--active tracking-widest">全部</button>
                        <button className="flex-1 opacity-40 font-bold py-4 border-b-2 tracking-widest">待完成</button>
                        <button className="flex-1 opacity-40 font-bold py-4 border-b-2 tracking-widest">已完成</button>
                    </div>
                    { !isLoadedTasks && <p className="m-8 text-lg text-center text-gray-600">歡迎登入 {nickName}，<br></br>您的個人化資料正加載中</p>}
                    <ul>
                        {filteredTasks.map((task, index) => {
                            return (
                            <li key={index} className="flex items-center justify-between mx-6 task group border-b-2 border-gray-100">
                                <label htmlFor={index} className={"py-4 w-full relative flex items-center cursor-pointer " + (task.completed_at ? "task__completed" : "")}>
                                    <input 
                                    onChange={()=>{toggleTask(index, task.id)}}
                                    className="checkbox appearance-none w-5 h-5 rounded mr-4 border-2 border-gray-300 cursor-pointer"
                                    id={index}
                                    type="checkbox"
                                    defaultChecked={task.completed_at} />
                                    {task.content}
                                    <div className="check opacity-0 absolute left-0">
                                        <svg className="mt-1.5" width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.5818 0.941981C17.0248 0.384317 16.1205 0.384668 15.5628 0.941981L6.47617 10.029L2.43754 5.99039C1.87988 5.43272 0.975914 5.43272 0.418249 5.99039C-0.139416 6.54805 -0.139416 7.45202 0.418249 8.00968L5.46631 13.0577C5.74496 13.3364 6.11035 13.4761 6.47578 13.4761C6.8412 13.4761 7.20694 13.3367 7.4856 13.0577L17.5818 2.96124C18.1394 2.40396 18.1394 1.49961 17.5818 0.941981Z" fill="#FFD370"/>
                                        </svg>
                                    </div>
                                </label>
                                <button className="group-hover:opacity-100 opacity-0 transition-opacity" onClick={() => removeTask(index, task.id)}>
                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0.147472 0.147504C0.193908 0.101016 0.249052 0.0641365 0.309751 0.0389738C0.37045 0.0138121 0.435514 0.000860214 0.501222 0.000860214C0.566929 0.000860214 0.631993 0.0138121 0.692692 0.0389738C0.753391 0.0641365 0.808535 0.101016 0.854971 0.147504L6.99997 6.2925L13.1475 0.147504C13.2413 0.0536833 13.3685 0.000975609 13.5012 0.000975609C13.6339 0.000975609 13.7611 0.0536833 13.855 0.147504C13.9488 0.241324 14.0015 0.368572 14.0015 0.501254C14.0015 0.633936 13.9488 0.761183 13.855 0.855003L7.70747 7L13.8525 13.1475C13.9463 13.2413 13.999 13.3686 13.999 13.5012C13.999 13.6339 13.9463 13.7612 13.8525 13.855C13.7586 13.9488 13.6314 14.0015 13.4987 14.0015C13.366 14.0015 13.2388 13.9488 13.145 13.855L6.99997 7.7075L0.852471 13.8525C0.756821 13.9344 0.633783 13.9772 0.507945 13.9724C0.382107 13.9675 0.262737 13.9153 0.17369 13.8263C0.0846426 13.7372 0.0324765 13.6179 0.0276159 13.492C0.0227553 13.3662 0.0655584 13.2431 0.147472 13.1475L6.29247 7L0.147472 0.852504C0.0543461 0.758822 0.0020752 0.632096 0.0020752 0.500004C0.0020752 0.367911 0.0543461 0.241185 0.147472 0.147504Z" fill="#333333"/>
                                    </svg>
                                </button>
                            </li>
                        )})}
                    </ul>
                    <div className="flex justify-between items-center px-6">
                        <p>{completedCount} 個待完成項目</p>
                        <button disabled className="disabled:opacity-60 py-6">清除已完成項目</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Todo