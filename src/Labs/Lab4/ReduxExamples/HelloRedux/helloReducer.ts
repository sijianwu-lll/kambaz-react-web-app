import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "Hello World",
};

const helloSlice = createSlice({
  name: "hello",
  initialState,
  reducers: {}  // 暂时没有 actions，只提供默认 state
});

export default helloSlice.reducer;
