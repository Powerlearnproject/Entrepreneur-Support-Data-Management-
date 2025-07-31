import axios from 'axios';
const API_BASE_URL = "http://localhost:5000/api/funds";

export const getAllFunds = async () => {
  return await axios.get("/api/funds");
};

export const getTotalFunds = () => axios.get(`${API_BASE_URL}/api/funds/total`);
export const getFundsByEntrepreneur = async (id) => {
  return await axiosInstance.get(`/funds/entrepreneur/${id}`);
};

export const createFund = (data) => axios.post(`${API_BASE_URL}/api/funds`, data);
