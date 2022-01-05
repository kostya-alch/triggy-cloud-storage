import axios from 'axios';
import {
  addFileActionCreator,
  setFileActionCreator,
} from '../reducers/fileReducer';

export const instanceAxios = axios.create({
  baseURL: 'http://localhost:5000/api/',
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});

export function getFiles(dirId) {
  return async (dispatch) => {
    try {
      const response = await instanceAxios.get(
        `files${dirId ? '?parent=' + dirId : ''}`
      );
      dispatch(setFileActionCreator(response.data));
    } catch (error) {
      alert(error.response.data.message);
    }
  };
}

export function createDir(dirId, name) {
  return async (dispatch) => {
    try {
      const response = await instanceAxios.post(`files`, {
        name,
        parent: dirId,
        type: `dir`,
      });
      dispatch(addFileActionCreator(response.data));
    } catch (error) {
      alert(error.response.data.message);
    }
  };
}

export function uploadFile(file, dirId) {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      if (dirId) {
        formData.append('parent', dirId);
      }
      const response = await instanceAxios.post(`files/upload`, formData, {
        onUploadProgress: (progressEvent) => {
          const totalLength = progressEvent.lengthComputable
            ? progressEvent.total
            : progressEvent.target.getResponseHeader('content-length') ||
              progressEvent.target.getResponseHeader(
                'x-decompressed-content-length'
              );
          if (totalLength) {
            let progress = Math.round(
              (progressEvent.loaded * 100) / totalLength
            );
            console.log(progress);
          }
        },
      });
      dispatch(addFileActionCreator(response.data));
    } catch (error) {
      alert(error.response.data.message);
    }
  };
}

export async function downloadFile(file) {
  const response = await fetch(
    `http://localhost:5000/api/files/download?id=${file._id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
  if (response.status === 200) {
    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}
