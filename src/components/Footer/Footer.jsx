import React from "react";
import { Row, Col } from "react-bootstrap";
import "./Footer.scss";

const Footer = () => {
	return (
		<Row className="footer">
			<Col>
				<span>&copy; <strong>BCPTe</strong> for TXT E-TECH Sport Team</span>
			</Col>
		</Row>
	);
};

export default Footer;
