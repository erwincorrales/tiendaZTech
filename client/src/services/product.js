import { http } from "./http";

const getProducts = async () => {
  const response = await http.get("/api/products");
  return response.data;
};

const getProduct = async (id) => {
  const { data = {} } = await http.get(`/api/product/${id}`);
  return data;
};

const saveProduct = async (product) => {
  const { data = {} } = await http.post(`/api/product`, product);
  return data;
};

const updateProduct = async (product) => {
  const { data = {} } = await http.patch(`/api/product`, product);
  return data;
};

const deleteProduct = async (id) => {
  const { data = {} } = await http.delete(`/api/product/${id}`);
  return data;
};

export default {
  getProducts,
  getProduct,
  saveProduct,
  updateProduct,
  deleteProduct,
};
