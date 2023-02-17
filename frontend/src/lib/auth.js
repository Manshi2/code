// import jwt from 'jsonwebtoken'
import jwtDecode from "jwt-decode"
import { useNavigate } from 'react-router-dom';

const useAuthorization = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token')
    
    const user = jwtDecode(token)

    const logout = () => {
        const token = localStorage.removeItem('token')
        navigate('/admin/login')
    }

    const validate = () => {
        if(token && token !== ''){
            const user = jwtDecode(token)
        }else logout()
    }

    return {validate, user, logout}
}

export {useAuthorization}