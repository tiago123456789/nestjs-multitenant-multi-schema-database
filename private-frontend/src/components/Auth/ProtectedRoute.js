import { useContext } from "react"
import { Route, Navigate } from "react-router-dom"
import AuthContext from "../../contexts/AuthContext"

export default ({ component: Component }) => {
    const { isAuthenticated } = useContext(AuthContext)
    return !isAuthenticated ? <Navigate to="/login" /> : <Component />;
}

