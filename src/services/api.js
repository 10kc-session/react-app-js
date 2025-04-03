import axios from 'axios';

const API_URL = 'https://user-management.site/api/users';

// Create the API instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Response interceptor
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            console.error('API Error:', {
                status: error.response.status,
                data: error.response.data,
                headers: error.response.headers
            });
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Request setup error:', error.message);
        }
        return Promise.reject(error);
    }
);

// Named exports
export const fetchUsers = async () => {
    const response = await api.get('');
    return response.data;
};

export const fetchUserById = async (id) => {
    const response = await api.get(`/${id}`);
    return response.data;
};

export const createUser = async (userData) => {
    const response = await api.post('', userData);
    return response.data;
};

export const updateUser = async (id, userData) => {
    const response = await api.put(`/${id}`, userData);
    return response.data;
};

export const deleteUser = async (id) => {
    const response = await api.delete(`/${id}`);
    return response.data;
};

// Assign to a variable before exporting as default
const apiService = {
    fetchUsers,
    fetchUserById,
    createUser,
    updateUser,
    deleteUser
};

export default apiService;