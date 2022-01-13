import { setUserActionCreator } from '../reducers/userReducer';
import { instanceAxios } from '../utils/instanceAxios';

export const registration = async (email, password) => {
  try {
    const response = await instanceAxios.post(`auth/registration`, {
      email,
      password,
    });
    alert(response.data.message);
  } catch (e) {
    alert(e.response.data.message);
  }
};

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await instanceAxios.post(`auth/login`, {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      dispatch(setUserActionCreator(response.data.user));
    } catch (e) {
      alert(e.response.data.message);
    }
  };
};

export const auth = () => {
  return async (dispatch) => {
    try {
      const response = await instanceAxios.get(`auth/auth`);
      dispatch(setUserActionCreator(response.data.user));
      localStorage.setItem('token', response.data.token);
    } catch (e) {
      alert(e.response.data.message);
      localStorage.removeItem('token');
    }
  };
};

export const uploadAvatar = (file) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await instanceAxios.post(`files/avatar`, formData);
      dispatch(setUserActionCreator(response.data));
    } catch (e) {
      console.log(e);
    }
  };
};

export const deleteAvatar = () => {
  return async (dispatch) => {
    try {
      const response = await instanceAxios.delete(`files/avatar`);
      dispatch(setUserActionCreator(response.data));
    } catch (e) {
      console.log(e);
    }
  };
};
