import "./Various.scss";
import React from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const Layout = (props) => {
	return (
		<>
			<Header />
			<div className="body">
				<Outlet />
			</div>
			<Footer />
		</>
	);
};

export default Layout;
