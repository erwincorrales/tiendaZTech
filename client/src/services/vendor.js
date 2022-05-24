import { http } from "./http";

const url = "/api/vendors";

const getVendors = async () => {
  const { data = [] } = await http.get(url);
  return data;
};

const getVendor = async (nit) => {
  const { data = {} } = await http.get(`${url}/${nit}`);
  return data;
};

const saveVendor = async (vendor) => {
  const { data = {} } = await http.post(url, vendor);
  return data;
};

const updateVendor = async (vendor) => {
  const { data = {} } = await http.patch(url, vendor);
  return data;
};

const deleteVendor = async (nit) => {
  const { data = {} } = await http.delete(`${url}/${nit}`);
  return data;
};

export default {
  getVendors,
  getVendor,
  saveVendor,
  updateVendor,
  deleteVendor,
};
