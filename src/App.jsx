import { Routes, Route } from "react-router-dom";
import CreateTodo from "./components/CreateTodo/CreateTodo";
import ShowTodo from "./components/ShowTodo/ShowTodo";
import "./App.css";
function App() {
  return (
    <Routes>
      <Route path="/" element={<CreateTodo />} />
      <Route path="/showtodo" element={<ShowTodo />} />
    </Routes>
  );
}

export default App;
