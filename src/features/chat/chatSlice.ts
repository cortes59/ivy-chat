import { createSlice } from "@reduxjs/toolkit";
import { IChatItem } from "../../app/models/interfaces";
import { AppThunk } from "../../app/store";
import { submitPromptAPI } from "./chatApi";

export interface ChatState {
  loading: boolean;
  chat: IChatItem[];
}

const initialState: ChatState = {
  loading: false,
  chat: [
    {
      text: "Hello, how can I help you?",
      createdAt: Date.now(),
      type: "answer",
    },
  ],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addQuestion(state, { payload }) {
      state.chat = [
        ...state.chat,
        { type: "question", text: payload, createdAt: Date.now() },
      ];
    },
    addAnswer(state, { payload }) {
      state.chat = [
        ...state.chat,
        { type: "answer", text: payload, createdAt: Date.now() },
      ];
    },
    setLoading(state, { payload }) {
      state.loading = payload;
    },
  },
});

export const { addQuestion, addAnswer, setLoading } = chatSlice.actions;

export const submitPrompt =
  (prompt: string): AppThunk =>
  async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(addQuestion(prompt));
    try {
      const response = await submitPromptAPI(prompt);
      dispatch(addAnswer(response.data.answer));
    } catch (err) {
      dispatch(addAnswer("Sorry, try again later"));
    }
    dispatch(setLoading(false));
  };

export default chatSlice.reducer;
