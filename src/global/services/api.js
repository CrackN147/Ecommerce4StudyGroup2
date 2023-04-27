import axios from "axios";

function _get (path) {
  return axios.get(path);
}
function _post (path, data) {
  return axios.post(path, data);
}
function _put (path, data) {
  return axios.put(path, data);
}
function _delete (path) {
  return axios.delete(path);
}

export const api = {
  _get,
  _post,
  _put,
  _delete
}