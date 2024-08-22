import axios from './axios';

export const registerRequest = user => axios.post(`/users/register`, user)

export const loginRequest = user => axios.post(`/auth/login`, user)

export const verifyTokenRequest = () => axios.get('/auth/profile')