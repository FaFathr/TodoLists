
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
    setTodos: (state, action) => {
      state.todos = action.payload;
      saveToLocalStorage(state.todos); 
    },
    addTodo: (state, action) => {
      state.todos.push(action.payload);
      saveToLocalStorage(state.todos);
    },
    removeTodo: (state, action) => {
      const idToRemove = action.payload;
      state.todos = state.todos.filter((todo) => todo.id !== idToRemove);
      saveToLocalStorage(state.todos);
    },
    // removeTodo: (state, action) => {

    //   state.todos = state.todos.filter(todo => todo && todo.id !== action.payload);
    // },
    
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