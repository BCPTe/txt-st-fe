import React, { useEffect, useState } from "react";
import api from "../../API/axiosConfig";
import { Row, Col } from "react-bootstrap";
import "./Match.scss";

const Match = () => {
	const [nextMatch, setNextMatch] = useState(null)

	const printDate = () => {
		var temp = new Date(nextMatch.datetime)
		return `${temp.getDate()} ${temp.toLocaleString('en-US', { month: 'short' })}`;
	}

	const printHour = () => {
		// debugger
		var temp = new Date(nextMatch.datetime)
		var hour = `${temp.getHours() < 10 ? `0${temp.getHours()}` : temp.getHours()}`
		var minutes = `${temp.getMinutes() < 10 ? `0${temp.getMinutes()}` : temp.getMinutes()}`

		return `${hour}:${minutes}`
	}

	const getNextMatch = () => {
		api.get("/api/v1/surveys", {
			params: {
				active: true,
			},
		})
		.then((response) => {
			console.log(response)
			setNextMatch(response.data[0])
		});
	}

	useEffect(() => {
	  getNextMatch()
	}, [])
	
	return (
		<Row className="match-container">
			<Col xs={8} md={6} lg={4} className="match p-0">
				{nextMatch &&
				<>
					<Col xs={12} sm={12} md={4} className="info p-1">
						<div className="title text-center text-muted">
							NEXT MATCH
						</div>
						<div className="when-info text-center">
							<div className="day">{printDate()}</div>
							<div className="hour">{printHour()}</div>
						</div>
						<div className="location text-center">{nextMatch.location}</div>
					</Col>
					<Col xs={12} md={8} className="motivational p-1">
						<div className="cit text-center">
							<i>Sbagli il 100% dei colpi che non spari.</i>
						</div>
					</Col>
				</>
				}
				{!nextMatch &&
					<Col className="text-center d-flex justify-content-center align-items-center">No match currently organised!</Col>
				}
			</Col>
		</Row>
	)

}

export default Match;
