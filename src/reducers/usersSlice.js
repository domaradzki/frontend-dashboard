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
            ...newUserData,
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

const updateUser = createAsyncThunk(
  'users/updateUsers',
  async (updateDataUser, thunkAPI) => {
    try {
      const { users } = thunkAPI.getState();
      if (users.isPending && users.requestId !== thunkAPI.requestId) {
        return;
      }
      const response = await fetch(
        `https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data/${updateDataUser.id}`,
        {
          method: 'PUT',
          body: JSON.stringify({
            ...updateDataUser,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      );

      return Object.keys(response.json()).length === 0
        ? updateDataUser
        : response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const deleteUser = createAsyncThunk(
  'users/deleteUsers',
  async (id, thunkAPI) => {
    try {
      const { users } = thunkAPI.getState();
      if (users.isPending && users.requestId !== thunkAPI.requestId) {
        return;
      }
      const response = await fetch(
        `https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data/${id}`,
        {
          method: 'DELETE',
        }
      );

      return id;
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
        state.data.push({ ...payload, id });
        state.isPending = false;
        state.requestId = null;
      })
      .addCase(addUser.rejected, (state, { error }) => {
        state.error = error.message;
        state.isPending = false;
        state.requestId = null;
      })
      .addCase(updateUser.pending, (state, action) => {
        if (state.isPending) {
          return;
        }
        state.isPending = true;
        state.requestId = action.meta.requestId;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        if (!payload) {
          return;
        }
        const objIndex = state.data.findIndex((obj) => obj.id === payload.id);
        state.data[objIndex] = payload;
        state.isPending = false;
        state.requestId = null;
      })
      .addCase(updateUser.rejected, (state, { error }) => {
        state.error = error.message;
        state.isPending = false;
        state.requestId = null;
      })
      .addCase(deleteUser.pending, (state, action) => {
        if (state.isPending) {
          return;
        }
        state.isPending = true;
        state.requestId = action.meta.requestId;
      })
      .addCase(deleteUser.fulfilled, (state, { payload }) => {
        if (!payload) {
          return;
        }

        state.data = state.data.filter((item) => item.id !== payload);
        state.isPending = false;
        state.requestId = null;
      })
      .addCase(deleteUser.rejected, (state, { error }) => {
        state.error = error.message;
        state.isPending = false;
        state.requestId = null;
      });
  },
});

export { fetchData, addUser, updateUser, deleteUser };

export default slice.reducer;
