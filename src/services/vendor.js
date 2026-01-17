import api from "./api";

export const getAllServices = () => api.get("/services");

export const getVendors = () => api.get("/vendors");

export const assignServicesToVendor = (vendorId, serviceIds) =>
  api.post(`/vendors/${vendorId}/services`, {
    serviceIds,
  });
