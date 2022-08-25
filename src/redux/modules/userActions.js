import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const URL = {
  BASE: process.env.REACT_APP_BASE_URL,
};

export const userLogin = createAsyncThunk(
  'user/login',
  async (payload, { getState, rejectWithValue }) => {
    const { user } = getState();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: user.userToken,
        },
      };

      const response = await axios.post(
        `${URL.BASE}api/login`,
        payload,
        config
      );
      localStorage.setItem('access-token', response.headers.authorization);
      return response;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (payload, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      await axios.post(
        `${URL.BASE}api/register`,
        payload,
        config
      );
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (arg, { getState, rejectWithValue }) => {
    const { user } = getState();
    try {
      await axios.post(
        `${URL.BASE}api/member/logout`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: user.userToken,
          },
        }
      );
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const existMemberId = createAsyncThunk(
  'user/existMemberId',
  async (payload, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await axios.post(
        `${URL.BASE}api/idcheck`,
        payload,
        config
      );
      return response;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
