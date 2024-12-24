import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { VscEdit } from "react-icons/vsc";
import { removeTodo, updateTodo } from "../../redux/slices/TodoSlices";
import { calculateAge, getSkillBackground } from "../../utils/Showtodoutil";

function ShowTodo() {
  const todos = useSelector((state) => state.todo.todos); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const handleDelete = (id) => {
    console.log("Deleting todo with id:", id);
    if (id) {
      dispatch(removeTodo(id));
    } else {
      console.error("Todo id is missing");
    }
  };

  const handleEdit = (todo) => {
    navigate(`/edit-todo/${todo.id}`);
  };


  const handleBack = () => {
    navigate("/");
  };


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };


  const filteredTodos = todos.filter((todo) => {
    if (todo && todo.name) {
      const fullName =
        `${todo.name.firstName} ${todo.name.lastName}`.toLowerCase();
      return fullName.includes(searchQuery.toLowerCase());
    }
    return false;
  });

  return (
    <div>
      <div className="flex justify-between mb-4">
        <span className="font-semibold">Team Member</span>
        <div>
          <input
            type="text"
            className="border p-2 rounded-lg mr-4"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button
            onClick={handleBack}
            className="border w-32 bg-[#C60026] text-[#ffff] p-2 rounded-lg"
          >
            Create
          </button>
        </div>
      </div>
      <h1 className="text-xl font-bold mb-4">Todo List</h1>
      {filteredTodos.length === 0 ? (
        <p>No Todos Available</p>
      ) : (
        <table className="table-auto w-full border">
          <thead>
            <tr className="border-b bg-[#E9EAEB]">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Skill Set</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Age</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTodos.map((todo) => (
              <tr key={todo.id} className="border">
                <td className="text-[#181D27] font-medium">
                  {todo.name.firstName} {todo.name.lastName}
                </td>
                <td className="px-4 py-2 text-[#181D27]">
                  <div className="flex flex-wrap gap-2">
                    {todo.skill && todo.skill.length > 0
                      ? todo.skill.map((skill, index) => (
                          <div
                            key={index}
                            className={`p-2 rounded-lg ${getSkillBackground(
                              index
                            )}`}
                          >
                            {skill}
                          </div>
                        ))
                      : "N/A"}
                  </div>
                </td>
                <td className="px-4 py-2 text-[#181D27]">{todo.role}</td>
                <td className="px-4 py-2 text-[#181D27]">
                  {calculateAge(todo.birthDate)}
                </td>
                <td className="px-4 py-2">
                  <div className="flex gap-2 justify-center">
                    <button
                      className="text-red-500"
                      onClick={() => handleDelete(todo.id)}
                    >
                      <RiDeleteBin6Line />
                    </button>
                    <button
                      className="text-blue-500"
                      onClick={() => handleEdit(todo)}
                    >
                      <VscEdit />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ShowTodo;
