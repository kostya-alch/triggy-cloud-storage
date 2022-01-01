import axios from 'axios';
import { setFileActionCreator } from '../reducers/fileReducer';

export function getFiles(dirId) {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/files${dirId ? '?parent=' + dirId : ''}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      dispatch(setFileActionCreator(response.data));
    } catch (error) {
      alert(error.response.data.message);
    }
  };
}
