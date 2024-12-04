import axios from 'axios';

// Todo что это? и зачем тут ? вопрос для всех таких файлов в приложении api
const API_URL = 'http://localhost:3000/departments';

export const getDepartments = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createDepartment = async (depData: {
  name: string;
  comment?: string;
}) => {
  const response = await axios.post(API_URL, depData);
  return response.data;
};

export const updateDepartment = async (
  id: number,
  depData: { name: string; comment?: string },
) => {
  const response = await axios.put(`${API_URL}/${id}`, depData);
  return response.data;
};

export const deleteDepartment = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};
