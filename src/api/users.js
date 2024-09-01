import axios from './axios';

export const getUserRequest = (id) => axios.get(`/users/${id}`)

export const updateUserRequest = (id, data) => axios.put(`/users/${id}`, data);

export const deleteUserRequest = (id) => axios.delete(`/users/${id}`)