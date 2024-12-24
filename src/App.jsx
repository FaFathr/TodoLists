import { Routes, Route } from "react-router-dom";
import CreateTodo from "./components/CreateTodo/CreateTodo";
import ShowTodo from "./components/ShowTodo/ShowTodo";
import "./App.css";
import EditTodo from "./components/EditeTodo/EditTodo";
function App() {
  return (
    <Routes>
      <Route path="/" element={<CreateTodo />} />
      <Route path="/showtodo" element={<ShowTodo />} />
      <Route path="/edit-todo/:id" element={<EditTodo />} />
    </Routes>
  );
}

export default App;
