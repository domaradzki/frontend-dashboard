import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  isPending: false,
  requestId: null,
};

const fetchData = createAsyncThunk('users/fetchUsers', async (_, thunkAPI) => {
  try {
    const { users } = thunkAPI.getState();
    if (users.isPending && users.requestId !== thunkAPI.requestId) {
      return;
    }

    const response = await fetch(
      `https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data`
    );

    return response.json();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const addUser = createAsyncThunk(
  'users/addUsers',
  async (newUserData, thunkAPI) => {
    try {
      const { users } = thunkAPI.getState();
      if (users.isPending && users.requestId !== thunkAPI.requestId) {
        return;
      }

      const response = await fetch(
        `https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data`,
        {
          method: 'POST',
          body: JSON.stringify({
            newUserData,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      );

      return response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const slice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state, action) => {
        if (state.isPending) {
          return;
        }
        state.isPending = true;
        state.requestId = action.meta.requestId;
      })
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        if (!payload) {
          return;
        }
        state.data.push(...payload);
        state.isPending = false;
        state.requestId = null;
      })
      .addCase(fetchData.rejected, (state, { error }) => {
        state.error = error.message;
        state.isPending = false;
        state.requestId = null;
      })
      .addCase(addUser.pending, (state, action) => {
        if (state.isPending) {
          return;
        }
        state.isPending = true;
        state.requestId = action.meta.requestId;
      })
      .addCase(addUser.fulfilled, (state, { payload }) => {
        if (!payload) {
          return;
        }
        const id = state.data.length + 1; //  payload.id
        state.data.push({ ...payload.newUserData, id });
        state.isPending = false;
        state.requestId = null;
      })
      .addCase(addUser.rejected, (state, { error }) => {
        state.error = error.message;
        state.isPending = false;
        state.requestId = null;
      });
  },
});

export { fetchData, addUser };

export default slice.reducer;
