import React, { useEffect } from 'react'
import { useAuth } from '../../../Contexts/AuthContext'

const Logout = () => {
	const { logout } = useAuth()
	
	useEffect(() => {
		logout()
	}, [])
}

export default Logout