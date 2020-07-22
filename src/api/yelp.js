import axios from 'axios';

export default axios.create({
	baseURL: 'https://api.yelp.com/v3/businesses',
	headers: {
		Authorization: 'Bearer n-3dFpsY5WtszBP67iJiYLLqlmV9dxyC05vWR265DG7p9Iluy7qQo7KPI9adzAM4xVa3u23ds3r6jnIvnOnnCLTxthkHttT2cikYzxzzd7clmbacjsrKH84fUIwVX3Yx'
	}
});


