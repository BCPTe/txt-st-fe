import axios from 'axios';

export default axios.create({
	// baseURL: 'http://192.168.1.23:8080',
	baseURL: 'http://localhost:8080',
	headers: { 
		"ngrok-skip-browser-warning": "true",
		// "Access-Control-Allow-Origin" : "*",
		// "Access-Control-Allow-Headers" : "*",
		// "Access-Control-Allow-Methods" : "*",
		"Content-Type" : "application/json",
		"Authorization": 'Basic ' + window.btoa("user" + ":" + "fceda22c-ded4-486e-986f-d4589388e20a")
	}
})