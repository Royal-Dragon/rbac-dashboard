import axios from "axios";

const API_URL = "http://localhost:3001";

export const getUsers = async () => axios.get(`${API_URL}/users`);
export const addUser = async (user) => axios.post(`${API_URL}/users`, user);
export const updateUser = async (id, user) => axios.put(`${API_URL}/users/${id}`, user);
export const deleteUser = async (id) => axios.delete(`${API_URL}/users/${id}`);
export const getRoles = async () => axios.get(`${API_URL}/roles`);
export const addRole = async (role) => axios.post(`${API_URL}/roles`, role);
export const updateRole = async (id, role) => axios.put(`${API_URL}/roles/${id}`, role);
export const deleteRole = async (id) => axios.delete(`${API_URL}/roles/${id}`);


