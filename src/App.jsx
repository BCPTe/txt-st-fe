import "./App.scss";
// import api from './API/axiosConfig';
import { Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Layout from "./components/Layout";
import Home from "./components/Home/Home";
import Survey from "./components/Survey/Survey";
import Archive from "./components/Archive/Archive";
import Profile from "./components/Profile/Profile";
import Login from "./components/Profile/Login/Login";
import Logout from "./components/Profile/Login/Logout";
import Register from "./components/Profile/Register/Register";
import PrivateRoutes from "./components/PrivateRoutes/PrivateRoutes";
import { useAuth } from "./Contexts/AuthContext";
import { useCookies } from "react-cookie";
import NotFound from "./components/NotFound";

function App() {
	const { authStatus } = useAuth();
	const auth = authStatus();

	return (
		<div className="App">
			<Routes>
				<Route exact path="/" element={<Layout />}>
					<Route path="/*" element={<NotFound />} />
					<Route exact path="/" element={<Home />} />
					<Route path="/archive" element={<Archive />} />
					<Route
						path="/login"
						element={
							auth?.isLoggedIn ? (
								<Navigate to="/" replace />
							) : (
								<Login />
							)
						}
					/>
					<Route element={<PrivateRoutes />}>
						<Route path="/register" element={<Register />} />
						<Route path="/profile" element={<Profile />} />
						<Route path="/logout" element={<Logout />} />
						<Route path="/survey" element={<Survey />} />
					</Route>
					<Route
						path="/survey?openModal=true"
						element={
							!auth?.isLoggedIn || !auth?.isAdmin ? (
								<Navigate to="/" replace />
							) : (
								<Navigate to="/survey?openModal=true" />
							)
						}
					/>
				</Route>
			</Routes>
		</div>
	);
}

export default App;
