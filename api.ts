import axios from 'axios';

// Create an Axios instance with default settings
const api = axios.create({
  baseURL: 'https://newsapi.org/',
  timeout: 10000, // Timeout for requests in milliseconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add tokens or modify requests
api.interceptors.request.use(
  config => {
    // Add logic here to add auth token in headers
    // Add other headers if needed

    // config.headers.Authorization = `Bearer ${token}`;
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
    return response;
  } catch (error) {
    throw error;
  }
};

export default api;
