import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { VscEdit } from "react-icons/vsc";
import { removeTodo, updateTodo } from "../../redux/slices/TodoSlices";

function ShowTodo() {
  const todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [editedTodo, setEditedTodo] = useState({});

  const calculateAge = (birthDate) => {
    if (!birthDate) return "N/A";
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };
  const getSkillBackground = (index) => {
    const colors = [
      "bg-[#E7FFF5] text-[#009E20]", 
      "bg-[#EFF8FF] text-[#175CD3]", 
      "bg-[#F9F5FF] text-[#C64143]", 
    ];
    return colors[index % colors.length];
  };
  const handleDelete = (id) => {
    console.log("Deleting todo with id:", id);
    dispatch(removeTodo(id));
  };
  const handleEdit = (todo) => {
    setIsEditing(true);
    setEditedTodo(todo);
  };

  const handleSaveEdit = () => {
    dispatch(updateTodo({ id: editedTodo.id, updatedTodo: editedTodo }));
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleback = () => {
    navigate("/");
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <span>Team Member</span>
        <button
          onClick={handleback}
          className="border w-32 bg-[#C60026] text-[#ffff] p-2 rounded-lg"
        >
          Create
        </button>
      </div>
      <h1 className="text-xl font-bold mb-4">Todo List</h1>
      {todos.length === 0 ? (
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
            {todos.map((todo) => (
              <tr key={todo.id} className="border">
                <td className="text-[#181D27] font-medium">
                  {todo.name.firstName} {todo.name.lastName}
                </td>
                <td className="px-4 py-2 text-[#181D27]">
                  {/* <div className="bg-[#E7FFF5] text-[#009E20] p-2 rounded-lg">
                    {todo.skill && todo.skill.length > 0 ? todo.skill : "N/A"}
                  </div> */}
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
                <td className="px-4 py-2 ">
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

      {isEditing && (
        <div className="mt-6 border p-4 rounded-lg bg-[#F9F9F9]">
          <h2 className="text-lg font-bold mb-4">Edit Todo</h2>
          <div className="flex flex-col">
            <label className="mb-2 font-medium">First Name</label>
            <input
              type="text"
              value={editedTodo.name?.firstName || ""}
              onChange={(e) =>
                setEditedTodo({
                  ...editedTodo,
                  name: { ...editedTodo.name, firstName: e.target.value },
                })
              }
              className="border p-2 mb-4 rounded-lg"
            />
            <label className="mb-2 font-medium">Last Name</label>
            <input
              type="text"
              value={editedTodo.name?.lastName || ""}
              onChange={(e) =>
                setEditedTodo({
                  ...editedTodo,
                  name: { ...editedTodo.name, lastName: e.target.value },
                })
              }
              className="border p-2 mb-4 rounded-lg"
            />
            <label className="mb-2 font-medium">Role</label>
            <input
              type="text"
              value={editedTodo.role || ""}
              onChange={(e) =>
                setEditedTodo({ ...editedTodo, role: e.target.value })
              }
              className="border p-2 mb-4 rounded-lg"
            />
            <label className="mb-2 font-medium">Skills</label>
            <input
              type="text"
              value={editedTodo.skill?.join(", ") || ""}
              onChange={(e) =>
                setEditedTodo({
                  ...editedTodo,
                  skill: e.target.value.split(", "),
                })
              }
              className="border p-2 mb-4 rounded-lg"
            />
            <div className="flex justify-end">
              <button
                onClick={handleCancelEdit}
                className="bg-gray-300 text-black p-2 rounded-lg mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="bg-green-500 text-white p-2 rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowTodo;
