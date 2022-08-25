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
  comment: {},
}

// ::: 댓글 등록
export const __createCommentByPostId = createAsyncThunk(
  "detail/__createCommentByPostId",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(`${URL.BASE}api/comment/${payload.postId}`, {
        comment: payload.comment
      }, {
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

// ::: 댓글 리스트 출력
export const __getCommentAllByPostId = createAsyncThunk(
  "detail/__getCommentAllByPostId",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.get(`${URL.BASE}api/comment/${payload}`);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// ::: 댓글 삭제
export const __deleteCommentByCommentId = createAsyncThunk(
  "detail/__deleteCommentByCommentId",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.delete(`${URL.BASE}api/comment/${payload}`, {
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

// ::: 댓글 수정
export const __updateCommentByCommentId = createAsyncThunk(
  "detail/__updateCommentByCommentId",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.put(`${URL.BASE}api/comment/${payload.commentId}`, {
        comment: payload.comment,
      }, {
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

const commentSlice = createSlice({
  name: "commentSlice",
  initialState,
  reducers: {},
  extraReducers: {
    // :: 전체 댓글 불러오기
    [__getCommentAllByPostId.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getCommentAllByPostId.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comment = {...action.payload.data};
    },
    [__getCommentAllByPostId.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },


    // :: 댓글 등록
    [__createCommentByPostId.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__createCommentByPostId.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comment.responseDto.push(action.payload.data);
      state.comment.commentcount += 1;
    },
    [__createCommentByPostId.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },


    // :: 댓글 삭제
    [__deleteCommentByCommentId.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__deleteCommentByCommentId.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comment.responseDto = state.comment.responseDto.filter(
        (commentCard) => 
          commentCard.commentId !== action.payload.data
        );
      state.comment.commentcount -= 1;
    },
    [__deleteCommentByCommentId.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },


    // :: 댓글 수정
    [__updateCommentByCommentId.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__updateCommentByCommentId.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comment.responseDto = state.comment.responseDto.map((commentCard) => (
        commentCard.commentId === action.payload.data.commentId
          ? action.payload.data
          : commentCard
      ));
    },
    [__updateCommentByCommentId.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

  }
});


export default commentSlice.reducer;

