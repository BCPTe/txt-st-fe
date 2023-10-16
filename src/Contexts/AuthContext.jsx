import React, { useContext, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import api from '../API/axiosConfig';

const AuthContext = React.createContext()

export const useAuth = () => {
	return useContext(AuthContext)
}

export const AuthProvider = (props) => {
	const [cookies, setCookie, removeCookie] = useCookies(['auth'])

	// this is for debugging purpose (up to the "// || \\")
	// useEffect(() => {
	// 	const auth = {
	// 		authUser: {
	// 			name: "Christian",
	// 			surname: "Gatto",
	// 			username: "BCPTe",
	// 			email: "djdjchri@gmail.com",
	// 			birthdate: "2000-04-27",
	// 			admin: true
	// 		},
	
	// 		isLoggedIn: true,
	// 		isAdmin: true
	// 	} 
	// 	setCookie('auth', auth)
	// }, [setCookie])
	// || \\
	

	const authStatus = () => {
		return cookies['auth']
	}

	const login = (payload, setError, setPassword) => {
		api.post("/api/v1/users/login", payload)
			.then(response => {
				console.log("response: ", response)
				if (response.status === 200) {
					const authObj = {
						authUser: {
							// token: response.data.token,
							name: response.data.name,
							surname: response.data.surname,
							username: response.data.username,
							email: response.data.email,
							birthdate: response.data.birthdate,
							// admin: response.data.admin
						},
						isLoggedIn: true,
						isAdmin: response.data.admin ? true : false
					}
					setCookie("auth", authObj)
					// console.log(cookies['auth'])
					setError(false)
				}
			})
			.catch(err => {
				setError(true)
				setPassword("")
				console.log("ciao")
			})
	}

	const logout = () => {
		console.warn("auth: ", cookies['auth'])
		// localStorage.setItem("authInfo", JSON.stringify(noAuthenticated))
		removeCookie("auth")
	}

	const value = {
		login,
		logout,
		authStatus
	}


	return (
		<AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
	)
}