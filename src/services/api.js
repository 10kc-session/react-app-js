// src/services/api.js
import axios from 'axios';

const API_URL = 'https://13.60.56.180:8443/api/users';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const fetchUsers = async () => {
    try {
        const response = await api.get('');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchUserById = async (id) => {
    try {
        const response = await api.get(`/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createUser = async (userData) => {
    try {
        const response = await api.post('', userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateUser = async (id, userData) => {
    try {
        const response = await api.put(`/${id}`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteUser = async (id) => {
    try {
        const response = await api.delete(`/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default {
    fetchUsers,
    fetchUserById,
    createUser,
    updateUser,
    deleteUser
};