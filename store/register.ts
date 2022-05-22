import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RegisterState } from "../types/reduxState";

const initialState: RegisterState = {
  largeSpeciesType: null,
  speciesType: null,
  applyType: null,

  country: "",
  city: "",
  district: "",
  streetAddress: "",
  detailAddress: "",
  postcode: "",
  latitude: 0,
  longitude: 0,

  photos: [],
  name: "",
};

const register = createSlice({
  name: "register",
  initialState,
  reducers: {
    setInit() {
      return {
        largeSpeciesType: null,
        speciesType: null,
        applyType: null,
        country: "",
        city: "",
        district: "",
        streetAddress: "",
        detailAddress: "",
        postcode: "",
        latitude: 0,
        longitude: 0,
        photos: [],
        name: "",
      };
    },
    setLargeSpeciesType(state, action: PayloadAction<string>) {
      if (action.payload === "") {
        state.largeSpeciesType = null;
      }
      state.largeSpeciesType = action.payload;
      return state;
    },
    setSpeciesType(state, action: PayloadAction<string>) {
      if (action.payload === "") {
        state.speciesType = null;
      }
      state.speciesType = action.payload;
      return state;
    },
    setApplyType(
      state,
      action: PayloadAction<"entire" | "private" | "public">
    ) {
      state.applyType = action.payload;
      return state;
    },
    setCountry(state, action: PayloadAction<string>) {
      state.country = action.payload;
    },
    setCity(state, action: PayloadAction<string>) {
      state.city = action.payload;
    },
    setDistrict(state, action: PayloadAction<string>) {
      state.district = action.payload;
    },
    setStreetAddress(state, action: PayloadAction<string>) {
      state.streetAddress = action.payload;
    },
    setDetailAddress(state, action: PayloadAction<string>) {
      state.detailAddress = action.payload;
    },
    setPostcode(state, action: PayloadAction<string>) {
      state.postcode = action.payload;
    },
    setLatitude(state, action: PayloadAction<number>) {
      state.latitude = action.payload;
    },
    setLongitude(state, action: PayloadAction<number>) {
      state.longitude = action.payload;
    },
    setPhotos(state, action: PayloadAction<string[]>) {
      state.photos = action.payload;
    },
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
  },
});

export const registerActions = { ...register.actions };

export default register;
