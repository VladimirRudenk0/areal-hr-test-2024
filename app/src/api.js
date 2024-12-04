import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});


// Todo зачем этот файл?
// Функции для работы с Organizations
export const getOrganizations = async () => {
  const response = await api.get('/organizations');
  return response.data;
};

export const createOrganization = async (data) => {
  const response = await api.post('/organizations', data);
  return response.data;
};

export const updateOrganization = async (id, data) => {
  const response = await api.put(`/organizations/${id}`, data);
  return response.data;
};

export const deleteOrganization = async (id) => {
  const response = await api.delete(`/organizations/${id}`);
  return response.data;
};

// Функции для работы с Departments
export const getDepartments = async () => {
  const response = await api.get('/departments');
  return response.data;
};

export const createDepartment = async (data) => {
  const response = await api.post('/departments', data);
  return response.data;
};

export const updateDepartment = async (id, data) => {
  const response = await api.put(`/departments/${id}`, data);
  return response.data;
};

export const deleteDepartment = async (id) => {
  const response = await api.delete(`/departments/${id}`);
  return response.data;
};

// Функции для работы с Positions
export const getPositions = async () => {
  const response = await api.get('/positions');
  return response.data;
};

export const createPosition = async (data) => {
  const response = await api.post('/positions', data);
  return response.data;
};

export const updatePosition = async (id, data) => {
  const response = await api.put(`/positions/${id}`, data);
  return response.data;
};

export const deletePosition = async (id) => {
  const response = await api.delete(`/positions/${id}`);
  return response.data;
};

// Функции для работы с Employees
export const getEmployees = async () => {
  const response = await api.get('/employees');
  return response.data;
};

export const createEmployee = async (employeeData) => {
  return axios.post('/api/employees', employeeData);
};

export const updateEmployee = async (id, employeeData) => {
  return axios.put(`/api/employees/${id}`, employeeData);
};

export const deleteEmployee = async (id) => {
  return axios.delete(`/api/employees/${id}`);
};

// Функции для работы с Files
export const getFiles = async () => {
  const response = await api.get('/files');
  return response.data;
};

export const createFile = async (data) => {
  const response = await api.post('/files', data);
  return response.data;
};

export const updateFile = async (id, data) => {
  const response = await api.put(`/files/${id}`, data);
  return response.data;
};

export const deleteFile = async (id) => {
  const response = await api.delete(`/files/${id}`);
  return response.data;
};

// Функции для работы с hr_actions
export const getHrActions = async () => {
  const response = await api.get('/hr_actions');
  return response.data;
};

export const createHrAction = async (data) => {
  const response = await api.post('/hr_actions', data);
  return response.data;
};

export const updateHrAction = async (id, data) => {
  const response = await api.put(`/hr_actions/${id}`, data);
  return response.data;
};

export const deleteHrAction = async (id) => {
  const response = await api.delete(`/hr_actions/${id}`);
  return response.data;
};

// Функции для работы с history_of_changes
export const getHistoryOfChanges = async () => {
  const response = await api.get('/history-of-changes');
  return response.data;
};
