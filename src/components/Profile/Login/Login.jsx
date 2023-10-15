import React, { useState } from 'react'
import { Row, Form, Col, Button, FloatingLabel } from 'react-bootstrap'
import '../Profile.scss'
import api from '../../../API/axiosConfig'
import { useAuth } from '../../../Contexts/AuthContext'

const Login = () => {
	const { login } = useAuth()

	const [usernameOrEmail, setUsernameOrEmail] = useState("")
	const [password, setPassword] = useState("")

	const handleLogin = (e) => {
		e.preventDefault();

		// using slice() cause need a literal copy of d string, may dont needed, boh after vidimu
		// const hashed = "test";
		// bcrypt.hash(password).then(hash => hashed = hash.slice()).catch(err => console.log(err))

		const payload = JSON.stringify({
			usernameOrEmail: usernameOrEmail,
			password: password
		})
		console.log("payload: ", payload)
		login(payload)
	}

	return (
		<Row className='profile-form-container'>
			<Col xs={10} md={6} lg={4}>
				<Form onSubmit={handleLogin} className="profile-form">
					<h4>Login</h4>
					<FloatingLabel className="usernameoremail-group" controlId="floatingUsernameOrMail" label="Username or Email">
						<Form.Control type='text' placeholder="Username or Email" onChange={(e) => setUsernameOrEmail(e.target.value)} required />
					</FloatingLabel>
					<FloatingLabel className="password-group" controlId="floatingPassword" label="Password">
						<Form.Control type='password' placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
					</FloatingLabel>
					<Button variant="secondary" type="submit">LOGIN</Button>
					<Form.Text>or <a href='/register'>register</a> if you don't have an account yet</Form.Text>
				</Form>
			</Col>
		</Row>
	)
}

export default Login