import React from 'react'
import '../../Contexts/AuthContext'
import { Row, Form, Col, Button, FloatingLabel } from 'react-bootstrap'
import { useAuth } from '../../Contexts/AuthContext'

const Profile = () => {
	const { authStatus } = useAuth()
	const auth = authStatus()

	return (
		<Row className='profile-form-container'>
			<Col xs={10} md={5} lg={3}>
				<Form className="profile-form user-info">
					<h4>User Info</h4>
					<div className="name-surname-container">
						<FloatingLabel className="name-group" controlId="floatingName" label="Name">
							<Form.Control type='text' placeholder="Name" value={auth.authUser.name} required disabled/>
						</FloatingLabel>
						<FloatingLabel className="surname-group" controlId="floatingSurname" label="Surname">
							<Form.Control type='text' placeholder="Surname" value={auth.authUser.surname} required disabled/>
						</FloatingLabel>
					</div>
					<FloatingLabel className="birthdate-group" controlId="floatingDate" label="Birthdate">
						<Form.Control type='date' placeholder="Birthdate" value={auth.authUser.birthdate} required disabled/>
					</FloatingLabel>
					<FloatingLabel className="username-group" controlId="floatingUsername" label="Username">
						<Form.Control type='text' placeholder="Username" value={auth.authUser.username} required disabled/>
					</FloatingLabel>
					<FloatingLabel className="email-group" controlId="floatingEmail" label="Email">
						<Form.Control type='email' placeholder="Email" value={auth.authUser.email} required disabled/>
					</FloatingLabel>
				</Form>
			</Col>
		</Row>
	)
}

export default Profile