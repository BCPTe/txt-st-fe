import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../Contexts/AuthContext'

const PrivateRoutes = () => {
	const { authStatus } = useAuth()
	const auth = authStatus()

	const bypassed = ['/register']

	const location = useLocation().pathname

	if(auth?.isLoggedIn || bypassed.includes(location))
		return <Outlet />
	else
		return <Navigate to={'/login'} />

}

export default PrivateRoutes