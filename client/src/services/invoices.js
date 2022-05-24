import { http } from "./http";
const url = "/api/invoices";

const getInvoices = async () => {
  const { data = [] } = await http.get(url);
  return data;
};

const saveInvoice = async (invoice) => {
  const { data = {} } = await http.post(url, invoice);
  return data;
};

const deleteInvoice = async (id) => {
  const { data = {} } = await http.delete(`${url}/${id}`);
  return data;
};

export default { getInvoices, saveInvoice, deleteInvoice };
