import React from 'react';
import ReactDOM from 'react-dom/client';
import './fonts/NCS_Rogueland.ttf';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { AuthProvider } from './Contexts/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<CookiesProvider>
			<AuthProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/*" element={<App />} />
					</Routes>
				</BrowserRouter>
			</AuthProvider>
		</CookiesProvider>
	</React.StrictMode>
);
