// 不希望在切換 Tab 的時候還要去 fetch 資料，因此除了 Tasks 外還設置了 cloudTasks 來紀錄雲端上應有的資料(也就是目前全部資料)。

import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useLogout from './hooks/useLogout'
import useGetTodo from './hooks/useGetTodo'
import useToggleTodo from './hooks/useToggleTodo'
import useAddTodo from './hooks/useAddTodo'
import useRemoveTodo from './hooks/useRemoveTodo'
import useRemoveAllTodo from './hooks/useRemoveAllTodo'
import writer from './assets/writer.png'

const Todo = () => {
    const navigate = useNavigate()
    const nickName = localStorage.getItem("nickname") || "陌生人"
    const token = localStorage.getItem('token')
    const tasksTab = document.querySelector('[data-todo-tab]')
    const [input, setInput] = useState('')
    const [tasks, setTasks] = useState([])
    const [cloudTasks, setCloudTasks] = useState([])
    const [isLoadedTasks, setIsLoadedTasks] = useState(false)
    const [showClearBtn, setShowClearBtn] = useState(false)
    const [completedCount, setCompletedCount] = useState(0)
    const [activeTab, setActiveTab] = useState('')


    useEffect(() => { init() }, [])

    useEffect(() => {
        async () => {
            setCloudTasks(await useGetTodo(token))
        }
        const completedTasks = tasks.filter((item) => {
            return !item.completed_at
        })
        completedTasks.length > 0 ? setShowClearBtn(false) : setShowClearBtn(true)
        setCompletedCount(completedTasks.length)
    }, [tasks])

    const init = async () => {
        const cloudTasks = await useGetTodo(token)
        setCloudTasks(cloudTasks.todos)
        setTasks(cloudTasks.todos)
        setIsLoadedTasks(true)
    }

    const handleClearCompletedTasks = () => {
        const ids = []
        const newCloudTasks = cloudTasks.filter(item => {
            if (item.completed_at){
                ids.push(item.id)
            }
            return !item.completed_at
        })
        useRemoveAllTodo(token, ids)

        

        setCloudTasks(newCloudTasks)
        setTasks(newCloudTasks)

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        input && addTask(input)
        setInput('')        
    }

    const handleLogout = async() => {
        await useLogout(localStorage.getItem('token')) ? navigate('/login') : alert('not') 
    }

    const toggleTask = async (index, id) => {
        const newTasks = [...tasks]
        const data = await useToggleTodo(token, id)
        newTasks[index].completed_at = data.completed_at
        setTasks(newTasks)
        setCloudTasks(newTasks)
    }

    const removeTask = async (index, id) => {
        const newTasks = [...tasks]

        // Remove task from tasks
        const response = await useRemoveTodo(token, id)
        newTasks.splice(index, 1)
        setTasks(newTasks)
        
        //  Remove task from cloudTasks
        const newCloudTasks = cloudTasks.filter(item => {
            return !(item.id === id)
        })
        setCloudTasks(newCloudTasks)
    }

    const addTask = async (content) => {
        const response = await useAddTodo(token, content)
        const newTask = {
            content: response.content,
            id: response.id,
            completed_at: null //Response 並沒有給這項屬性，自己加上
        }
        showAllTasks()
        setTasks([...cloudTasks, newTask])
        setCloudTasks([...cloudTasks, newTask])
    }
    
    const handleTabs = (e) => {
        clearAllTabs()
        e.target.classList.add('todo__tab--active')

        switch (e.target.innerText) {
            case "全部":
                setTasks(cloudTasks)
                setActiveTab('')
                break
            case "待完成":
                const uncompletedTasks = cloudTasks.filter((item) => {
                    return !item.completed_at
                })
                setTasks(uncompletedTasks)
                setActiveTab('待完成')
                break
            case "已完成":
                const completedTasks = cloudTasks.filter((item) => {
                    return item.completed_at
                })

                setTasks(completedTasks)
                setActiveTab('已完成')
                break
        }
    }

    const clearAllTabs = () => {
        tasksTab.querySelectorAll('button').forEach(item => {
            item.classList.remove('todo__tab--active')
        })
    }

    const showAllTasks = () => {
        const allTab = document.querySelector('[data-tab-all]')
        clearAllTabs()
        allTab.classList.add('todo__tab--active')
        setTasks(cloudTasks)
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
                    <input onChange={e => setInput(e.target.value)} className="w-full px-4 py-3 rounded-lg outline-none" type="text" placeholder="新增待辦事項" value={input} required />
                    <button className="mx-1 bg-gray-700 w-10 aspect-square rounded-lg  right-0 relative">
                        <svg className="absolute right-1/2 top-1/2 transform-gpu -translate-y-1/2 translate-x-1/2" width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.6364 8.93184H11.8182V2.11364C11.8182 1.36091 11.2073 0.75 10.4545 0.75H9.54548C8.79275 0.75 8.18184 1.36091 8.18184 2.11364V8.93184H1.36364C0.610908 8.93184 0 9.54275 0 10.2955V11.2045C0 11.9573 0.610908 12.5682 1.36364 12.5682H8.18184V19.3864C8.18184 20.1391 8.79275 20.75 9.54548 20.75H10.4545C11.2073 20.75 11.8182 20.1391 11.8182 19.3864V12.5682H18.6364C19.3891 12.5682 20 11.9573 20 11.2045V10.2955C20 9.54275 19.3891 8.93184 18.6364 8.93184Z" fill="white"/>
                        </svg>
                    </button>
                </form>

                <div className="shadow-md bg-white rounded-lg">
                    <div className="fixed bottom-0 right-0">
                        <div className="bg-red-300 p-8">
                            <h2 className="font-bold text-lg">Tasks</h2>
                            {tasks.map(task => {
                                
                                    return(
                                    <ul>
                                        <li>
                                            {task.content} - {task.completed_at}
                                        </li>
                                    </ul>)
                                
                            })}
                        </div>
                        <div className="bg-blue-300 p-8">
                            <h2 className="font-bold text-lg">CloudTasks</h2>
                            {cloudTasks.map(task => {
                                return(
                                <ul>
                                    <li>
                                        {task.content} - {task.completed_at}
                                    </li>
                                </ul>)
                            })}
                        </div>
                    </div>


                    <div data-todo-tab onClick={handleTabs} className="flex">
                        <button data-tab-all className="flex-1 text-gray-800 text-opacity-40 font-bold py-4 border-gray-800 border-opacity-10 border-b-2 todo__tab--active tracking-widest">全部</button>
                        <button className="flex-1 text-gray-800 text-opacity-40 font-bold py-4 border-b-2 border-gray-800 border-opacity-10 tracking-widest">待完成</button>
                        <button className="flex-1 text-gray-800 text-opacity-40 font-bold py-4 border-b-2 border-gray-800 border-opacity-10 tracking-widest">已完成</button>
                    </div>

                    <div className="border-b-2 border-gray-800 border-opacity-10">
                        { !isLoadedTasks && <p className="m-8 text-lg text-center text-gray-600">歡迎登入 {nickName}，<br></br>您的個人資料正加載中……</p>}
    
                        { !tasks.length && isLoadedTasks ? 
                        <div className="flex flex-col items-center my-8">
                            <img width="240" height="251" src={writer} alt="一個人拿著鉛筆寫事項"/>
                            <p className="m-8 text-lg text-center text-gray-600">尚無{ activeTab }代辦事項</p>
                        </div>
                        : <></>}
                    </div>     


                    <ul>
                        {tasks.map((task, index) => {
                            return (
                            <li key={index} className="flex items-center justify-between mx-6 task group border-b-2 border-gray-100">
                                <label htmlFor={index} className={"py-4 w-full relative flex items-center cursor-pointer " + (task.completed_at ? "task__completed" : "")}>
                                    <input 
                                    onChange={()=>{toggleTask(index, task.id)}}
                                    className="checkbox appearance-none w-5 h-5 rounded mr-4 border-2 border-gray-300 cursor-pointer"
                                    id={index}
                                    type="checkbox"
                                    // defaultChecked={task.completed_at} // 詭異的屬性，讓我卡好久 QQ https://blog.csdn.net/TL18382950497/article/details/115425569
                                    // checked={task.completed_at}
                                    />

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
                        <button onClick={handleClearCompletedTasks} disabled={showClearBtn} className="disabled:opacity-60 py-6">清除已完成項目</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Todo