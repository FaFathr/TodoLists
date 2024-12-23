// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   todos: JSON.parse(localStorage.getItem("todos")) || [],
// };

// const todoSlice = createSlice({
//   name: "todo",
//   initialState,
//   reducers: {
//     addTodo: (state, action) => {
//       state.todos.push(action.payload);
//       localStorage.setItem("todos", JSON.stringify(state.todos));
//     },
//   },
// });

// export const { addTodo } = todoSlice.actions;
// export default todoSlice.reducer;
// redux/slices/TodoSlices.js

// import { createSlice } from "@reduxjs/toolkit";

// const todoSlice = createSlice({
//   name: "todo",
//   initialState: {
//     todos: [],
//   },
//   reducers: {
//     addTodo: (state, action) => {
//       state.todos.push(action.payload);
//     },
//     removeTodo: (state, action) => {
//       state.todos = state.todos.filter(todo => todo.id !== action.payload);
//     },
//     updateTodo: (state, action) => {
//       const { id, updatedTodo } = action.payload;
//       const index = state.todos.findIndex(todo => todo.id === id);
//       if (index !== -1) {
//         state.todos[index] = updatedTodo;
//       }
//     },
//   },
// });

// export const { addTodo, removeTodo, updateTodo } = todoSlice.actions;

// export default todoSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const loadFromLocalStorage = () => {
  const data = localStorage.getItem("todos");
  return data ? JSON.parse(data) : [];
};

const saveToLocalStorage = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: loadFromLocalStorage(),
  },
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
      saveToLocalStorage(state.todos);
    },


    // removeTodo: (state, action) => {
    //   const idToRemove = action.payload;
    //   state.todos = state.todos.filter(todo => todo.id !== idToRemove); 
    // },
    removeTodo: (state, action) => {
      const idToRemove = action.payload;
      state.todos = state.todos.filter((todo) => todo.id !== idToRemove); 
      saveToLocalStorage(state.todos); 
    },
    updateTodo: (state, action) => {
      const { id, updatedTodo } = action.payload;
      const index = state.todos.findIndex((todo) => todo.id === id);
      if (index !== -1) {
        state.todos[index] = updatedTodo;
        saveToLocalStorage(state.todos);
      }
    },
  },
});

export const { addTodo, removeTodo, updateTodo } = todoSlice.actions;

export default todoSlice.reducer;
