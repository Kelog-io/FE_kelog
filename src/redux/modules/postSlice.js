import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL = {
  BASE: process.env.REACT_APP_BASE_URL,
};
const USER = {
  AUTHORIZATION: localStorage.getItem('access-token'),
};

// ::: 초기값
const initialState = {
  isLoading: false,
  error: null,
  post: [],
  postDetail: {},
  heartCount: null,
  heartPush: null,
  userDetail: {}
}

// ::: 상세 게시글 출력
export const __getPostDetail = createAsyncThunk(
  "detail/__getPostDetail",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.get(`${URL.BASE}api/post/${payload}`, {
        headers: {
          Authorization: `${USER.AUTHORIZATION}`
        }
      });
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const __updatePostHeart = createAsyncThunk(
  "detail/__updatePostHeart",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(`${URL.BASE}api/postheart/${payload}`, {}, {
        headers: {
          Authorization: `${USER.AUTHORIZATION}`,
        }
      });
      return thunkAPI.fulfillWithValue(response.data);
    } catch(error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// ::: 상세 유저정보 출력
export const __getUserDetail = createAsyncThunk(
  "detail/__getUserDetail",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.get(`${URL.BASE}api/info/${payload}`);

      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// ::: 게시글 삭제

export const __deletePost = createAsyncThunk(
  "detail/__deletePost",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.delete(`${URL.BASE}api/post/delete/${payload}`, {
        headers: {
          Authorization: `${USER.AUTHORIZATION}`
        }
      }, {});
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// ::: 게시글 수정


const postSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {},
  extraReducers: {
    // :: 유저 정보 불러오기
    [__getUserDetail.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getUserDetail.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.userDetail = action.payload;
    },
    [__getUserDetail.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // :: 상세 게시글 불러오기
    [__getPostDetail.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getPostDetail.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.postDetail = action.payload.data;
      state.heartCount = action.payload.data.heartCount;
      state.heartPush= action.payload.data.heartPush;
    },
    [__getPostDetail.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // :: 게시글 좋아요
    [__updatePostHeart.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__updatePostHeart.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.heartPush === true ? state.heartPush = false : state.heartPush = true;
      state.heartCount = action.payload.data;
    },
    [__updatePostHeart.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // :: 게시글 삭제하기
    [__deletePost.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__deletePost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.post = state.post.filter(
        (postcard) => 
          postcard.id !== action.payload.data
        );
    },
    [__deletePost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  }
});


export default postSlice.reducer;

