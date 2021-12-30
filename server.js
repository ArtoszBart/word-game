const PORT = 8000;
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

app.use(cors());

app.get('/game', (req, res) => {
	const options = {
		method: 'GET',
		url: 'https://twinword-word-association-quiz.p.rapidapi.com/type1/',
		params: { level: req.query.level, area: 'sat' },
		headers: {
			'x-rapidapi-host': 'twinword-word-association-quiz.p.rapidapi.com',
			'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
		}
	};

	axios.request(options).then(response => {
		console.log(response.data);
		res.json(response.data);
	}).catch(err => {
		console.error(err);
	});
});

app.listen(PORT, () => console.log(`API running on PORT ${PORT}`));