import http from "../httpApi";

const getAll =  (ruta) => {
  return  http.get(`/api/${ruta}`);
};

const get = (ruta) => {
  return http.get(`${ruta}`);
};

const create = (ruta, data) => {
  return http.post(`/api/${ruta}`, data);
};

const update = (ruta, data) => {
  return http.put(`${ruta}`, data);
};

const remove = (ruta, id) => {
  return http.delete(`${ruta}`);
};

const Service = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default Service;
