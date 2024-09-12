import axios from './axios';

export const updateUserRequest = (id, data) => axios.put(`/users/${id}`, data);

export const deleteUserRequest = (id) => axios.delete(`/users/${id}`)