import { Link } from 'react-router-dom'

const Error = () => {
return(
  <div className="text-center">
    <h1 className="text-7xl">404 Error</h1>
    <Link className="p-8 inline-block" to="./">Go Home</Link>
  </div>
)
}
export default Error