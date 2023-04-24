import axios from "axios";

export function _get (path) {
  return axios.get(path);
}
export function _post (path, data) {
  return axios.post(path, data);
}
export function _put (path, data) {
  return axios.put(path, data);
}
export function _delete (path) {
  return axios.delete(path);
}