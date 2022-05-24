import { http } from "./http";

const authenticate = async (credentials) => {
  const { data = {} } = await http.post("/login", credentials);
  return data;
};

export default { authenticate };
