import axios from 'axios';

// Create an Axios instance with default settings
const api = axios.create({
  baseURL: 'https://newsapi.org/', // Replace with your API base URL
  timeout: 10000, // Timeout for requests in milliseconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add tokens or modify requests
api.interceptors.request.use(
  config => {
    // Add token or other headers if needed
    // const token = getToken(); // Implement getToken function if you use authentication
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Response interceptor to handle errors or transform responses
api.interceptors.response.use(
  response => {
    return response.data; // Extract data from the response
  },
  error => {
    // Handle errors globally
    console.error('API call error:', error.response || error.message);
    return Promise.reject(error);
  },
);

const getApiKey = () => {
  return '7f546f1d91444281862f3387e92b9ec9';
};

// API functions
export const getData = async (url: string, apiParams = {}) => {
  const params = {
    apiKey: getApiKey(),
    ...apiParams,
  };
  try {
    const fullUrl = axios.getUri({
      url,
      params,
    });

    console.log('DEEPAN CHECK THE FULL URL', fullUrl);

    const response = await api.get(url, {
      params,
    });
    console.log('DEEPAN CHECK THE RESPONSE', response.articles.length);
    return response;
  } catch (error) {
    console.log('Error fetching data:', error);
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default api;
