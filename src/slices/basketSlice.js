import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      const item = state.items.find(
        (element) => element.id === action.payload.id
      );
      if (item) {
        item.quantaty++;
        item.price = item.fixedPrice + item.price;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromBasket: (state, action) => {
      const item = state.items.find((element) => element.id === action.payload);
      if (item.quantaty > 1) {
        item.quantaty--;
        item.price = item.price - item.fixedPrice;
      } else {
        state.items = state.items.filter(
          (element) => element.id !== action.payload
        );
      }
    },
  },
});

export const { addToBasket, removeFromBasket, incrementItem } =
  basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
export const totalPrice = (state) => {
  return state.basket.items.reduce((total, item) => total + item.price, 0);
};
export default basketSlice.reducer;
