import { faArrowLeft, faArrowRight, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import api from "../../../API/axiosConfig";
import "./NewMatchModal.scss";

const NewMatchModal = (props) => {
	const [matchInfo, setMatchInfo] = useState([])
	// for showing modal
	const [show, setShow] = useState(false);
	const [showPlayersModal, setShowPlayersModal] = useState(false);
	const [error, setError] = useState(false)
	// modal content (survey used or full)
	const [surveyUsed, setSurveyUsed] = useState([]);
	const [playersList, setPlayersList] = useState([]);
	// activating management
	const [activatingStep, setActivatingStep] = useState([]) 	// 0 -> not activating
																// 1 -> setting location
																// 2 -> setting hour

	const PlayersModal = () => {
		return (
			<Modal
				show={showPlayersModal}
				onHide={() => setShowPlayersModal(false)}
				size="md"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title>Players</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{playersList.map((p) => (
						<div className="player" key={p.username}>
							{p.username}
						</div>
					))}
				</Modal.Body>
			</Modal>
		)
	}

	const printDate = (dateToPrint) => {
		const temp = new Date(dateToPrint)
		// this way it prints a "0" if the month is between 1 and 9 (to always have a 2-digit notation)
		return `${temp.getDate()}/${temp.getMonth()+1 < 10 ? `0${temp.getMonth()+1}` : temp.getMonth()+1}`
	}

	const handleSubmitNewMatch = (index, s) => {
		var surveyDate = s.date
		var surveyActive = !s.active
		var payload = null

		if(surveyActive) {
			// activate match
			var [h,m] = matchInfo[index].hour.split(":")		// get hour and minute
			if(!h || !m) {
				console.error("PROBLEM WITH MATCH HOUR, INSERTED: ", matchInfo[index].hour)
				setError(true)
				return
			}
			var matchDatetime = new Date(surveyDate)
			matchDatetime.setHours(h)
			matchDatetime.setMinutes(m)

			payload = {
				operation: "set-active",
				surveyDate: surveyDate,
				matchDate: matchDatetime.getTime(),
				active: surveyActive,
				location: matchInfo[index].location
			}
		}
		else {
			// deactivate match
			payload = {
				operation: "set-active",
				surveyDate: surveyDate,
				active: surveyActive,
			}
		}

		api.post("/api/v1/surveys", payload)
			.then((response) => {
				getUsedSurveys();
			})
			.catch((err) => {
				console.warn(err);
			});

		console.log(payload);
		updateActivatingStep(index, 0)
		setError(false)
	}

	const getUsedSurveys = () => {
		api.get("/api/v1/surveys").then((response) => {
			var usedDates = response.data.filter(
				(s) => s.players.length > 0
			);
			setSurveyUsed(usedDates);
		})
	}

	// matches management
	const updateMatchInfo = (index, updatedValue) => {
		setMatchInfo((prevMatchInfo) => {
			const newMacthInfo = [...prevMatchInfo];
			newMacthInfo[index] = updatedValue;
			return newMacthInfo;
		})
	}

	// const convertStringToHour = (e, index, s) => {
	// 	debugger
	// 	const hour_inserted = e.target.value
	// 	console.log(hour_inserted)
	// 	var [h,m] = hour_inserted.split(":")		// get hour ant minute
	// 	if (!h || !m) {
	// 		updateMatchInfo(
	// 			index,
	// 			{
	// 				hour: null,
	// 				location: matchInfo[index].location
	// 			}
	// 		)
	// 		return
	// 	}
	// 	// add date to this time
	// 	const surveyDate = s.date
	// 	const datetime = new Date(surveyDate)
	// 	datetime.setHours(h)
	// 	datetime.setMinutes(m)

	// 	updateMatchInfo(
	// 		index,
	// 		{
	// 			hour: datetime.getTime(),
	// 			location: matchInfo[index].location
	// 		}
	// 	)
	// }

	const updateActivatingStep = (index, step) => {
		setActivatingStep((prevActivatingStep) => {
			const newActivatingStep = [...prevActivatingStep];
			newActivatingStep[index] = step;
			return newActivatingStep;
		})
	}
	//


	useEffect(() => {
		// open modal if "openModal" param in url is setted
		setShow(props.showModal);
		// get all used an full surveys
		getUsedSurveys();
	}, [props.showModal]);


	// TODO: RETHINK THE ACTIVATIONSTATE METHOD
	useEffect(() => {
		setMatchInfo(surveyUsed.map(s => ({hour: s.datetime, location: s.location})))
	}, [surveyUsed]);

	useEffect(() => {
		console.log(matchInfo)
	}, [matchInfo]);

	useEffect(() => {
		console.log("actstep :", activatingStep)
	}, [activatingStep]);

	
	return (
		<>
			<Modal
				show={show}
				onHide={() => setShow(false)}
				size="md"
				centered
				className="modal-newmatch"
			>
				<Modal.Header closeButton>
					<Modal.Title className="fw-bold">
						Available matches
					</Modal.Title>
				</Modal.Header>
				<Modal.Body className="matches">
					{surveyUsed.length > 0 &&
						surveyUsed.map((s, index) => (
							<div className="match-row" key={s.date}>
								<div className="match-date">{printDate(s.date)}</div>
								{!activatingStep[index] > 0 &&
									<div className="match-manage-btns">
										<Button
										variant="secondary"
										onClick={() => {
											setPlayersList(s.players);
											setShowPlayersModal(true);
										}}
										>
											View {s.players.length} {s.players > 1 ? "players" : "player"}
										</Button>
										{s.active ? (
											/* set survey active = false */
											<Button
											variant="danger"
											onClick={() => handleSubmitNewMatch(index, s)}
											>
											Deactivate
											</Button>
											) : (
												/* set survey active = true */
												<Button
												variant="success"
												onClick={() => updateActivatingStep(index, 1)}
												>
											Activate
										</Button>
										)}
									</div>
								}
								{activatingStep[index] > 0 &&
									<div className="match-manage-btns">
										{activatingStep[index] === 1 ? (
											<>
												<Form.Control
													placeholder="Enter location"
													value={matchInfo[index].location ?? ""}
													onChange={(e) => updateMatchInfo(index, {location: e.target.value, hour: matchInfo[index].hour})}
												/>
												{!matchInfo[index].location ? (
													<Button
													variant="danger"
													className="confirm-btn"
													onClick={() => updateActivatingStep(index, 0)}
													>
														<FontAwesomeIcon icon={faTimes} />
													</Button>
												) : (
													<Button
													variant="success"
													className="confirm-btn"
													onClick={() => updateActivatingStep(index, 2)}
													>
														<FontAwesomeIcon icon={faArrowRight} />
													</Button>
												)}
											</>
										) : (
											<>
												<Form.Control
													placeholder="Enter hour"
													value={matchInfo[index].hour ?? ""}
													onChange={(e) => updateMatchInfo(index, {location: matchInfo[index].location, hour: e.target.value})}
												/>
												{!matchInfo[index].hour ? (
													<Button
													variant="danger"
													className="confirm-btn"
													onClick={() => updateActivatingStep(index, 1)}>
														<FontAwesomeIcon icon={faArrowLeft} />
													</Button>
												) : (
													<Button
														variant="success"
														className="confirm-btn"
														onClick={() => handleSubmitNewMatch(index, s)}>
														<FontAwesomeIcon icon={faCheck} />
													</Button>
												)}
											</>
										)}
									</div>
								}
							</div>
						))}
					{surveyUsed.length === 0 && 
						<div>No matches available!</div>
					}
				</Modal.Body>
				<Modal.Footer>
					<span className="text-danger">{error ? "Check inserted details!" : ""}</span>
					<Button variant="danger" onClick={() => setShow(false)}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
			<PlayersModal></PlayersModal>
		</>
	);
};

export default NewMatchModal;
