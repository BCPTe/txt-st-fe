import { React, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import "./Header.scss";
import "../../style/buttons.scss";
import logo_black from "../../assets/logo/logo_entire.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faBoxArchive,
	faHouse,
	faClock,
	faUser,
	faRightFromBracket,
	faRightToBracket,
	faCirclePlus,
	faVolleyball,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../Contexts/AuthContext";
import { useCookies } from "react-cookie";

const Header = () => {
	const { authStatus } = useAuth();
	const auth = authStatus();

	return (
		<Navbar bg="light" expand="lg">
			<Container fluid>
				<Navbar.Brand>
					<img
						className="logo"
						src={logo_black}
						alt="logo"
					/>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link href="/">
							<FontAwesomeIcon icon={faHouse} />
							<span className="label">HOME</span>
						</Nav.Link>
						{auth?.isLoggedIn && (
							<Nav.Link href="/survey">
								<FontAwesomeIcon icon={faClock} />
								<span className="label">WHEN DO WE PLAY?</span>
							</Nav.Link>
						)}
						<Nav.Link href="archive">
							<FontAwesomeIcon icon={faBoxArchive} />
							<span className="label">ARCHIVE</span>
						</Nav.Link>
					</Nav>
					<Nav>
						{auth?.isLoggedIn && auth?.isAdmin && (
							<Nav.Link href="/survey?openModal=true">
								<FontAwesomeIcon icon={faVolleyball} />
								<span className="label">CREATE NEW MATCH</span>
							</Nav.Link>
						)}
						<Nav.Link
							href={auth?.isLoggedIn ? "/profile" : "/register"}
						>
							<FontAwesomeIcon
								icon={auth?.isLoggedIn ? faUser : faCirclePlus}
							/>
							<span className="label">
								{auth?.isLoggedIn
									? auth.authUser.name
									: "REGISTER"}
							</span>
						</Nav.Link>
						<Nav.Link
							href={auth?.isLoggedIn ? "/logout" : "/login"}
						>
							<FontAwesomeIcon
								icon={
									auth?.isLoggedIn
										? faRightFromBracket
										: faRightToBracket
								}
							/>
							<span className="label">
								{auth?.isLoggedIn ? "LOGOUT" : "LOGIN"}
							</span>
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Header;
