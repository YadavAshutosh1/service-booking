import api from "./api";

export const getServices = () => api.get("/services");
export const getServiceById = (id) => api.get(`/services/${id}`);
