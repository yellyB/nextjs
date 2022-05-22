import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StoredAppliedType } from "../types/apply";
import { ApplyState } from "../types/reduxState";

const initialState: ApplyState = {
  applies: [],
  detail: null,
};

const apply = createSlice({
  name: "apply",
  initialState,
  reducers: {
    setApplies(state, action: PayloadAction<StoredAppliedType[]>) {
      state.applies = action.payload;
      return state;
    },
    setDetailApply(state, action: PayloadAction<StoredAppliedType>) {
      state.detail = action.payload;
    },
  },
});

export const applyActions = { ...apply.actions };

export default apply;
