import toast from 'react-hot-toast'
import { Navigate } from 'react-router-dom'


const ProtectedRoute = ({ isLoggin, children }) => {
  if (!localStorage.getItem('token')) {
    return (
    <>
      <Navigate to="/login" replace/>
      { toast.error('您尚未登入') }
    </>
    )
  }
  return children
}

export default ProtectedRoute