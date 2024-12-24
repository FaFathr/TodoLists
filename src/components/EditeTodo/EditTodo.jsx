import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateTodo } from "../../redux/slices/TodoSlices";

function EditTodo() {
  const { id } = useParams();
  const todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const todo = todos.find((todo) => todo.id.toString() === id);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    role: "",
    skill: [],
    birthDate: "",
  });

  useEffect(() => {
    if (todo) {
      setFormData({
        firstName: todo.name.firstName,
        lastName: todo.name.lastName,
        role: todo.role,
        skill: todo.skill,
        birthDate: todo.birthDate,
      });
    }
  }, [todo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = () => {
    const updatedTodo = {
      ...todo,
      name: {
        firstName: formData.firstName,
        lastName: formData.lastName,
      },
      role: formData.role,
      skill: formData.skill,
      birthDate: formData.birthDate,
    };

    dispatch(updateTodo({ id: todo.id, updatedTodo }));
    navigate("/showtodo");
  };

  const handleCancel = () => {
    navigate("/showtodo");
  };

  if (!todo) {
    return <div>Todo with ID {id} not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-6 text-left">Edit Todo</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 text-left">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 text-left">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 text-left">
            Role
          </label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 text-left">
            Skills
          </label>
          <input
            type="text"
            name="skill"
            value={formData.skill.join(", ")}
            onChange={(e) =>
              setFormData({ ...formData, skill: e.target.value.split(", ") })
            }
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 text-left">
            Birth Date
          </label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditTodo;
