import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTodo } from "../../redux/slices/TodoSlices";
import { handleSkillChange, removeSkill } from "../../utils/Createskil";
import { validateFormData } from "../../utils/Validation";
import { BiError } from "react-icons/bi";
import Addnames from "../Addnames/Addnames";
import AddSkils from "../AddSkils/AddSkils";
import DateBirth from "../DateBirth/DateBirth";

function CreateTodo() {
  const [formData, setFormData] = useState({
    name: { firstName: "", lastName: "" },
    role: "",
    birthDate: null,
    skill: [],
  });

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSave = () => {
    const validationErrors = validateFormData(formData);

    if (Object.keys(validationErrors).length === 0) {
      const newTodo = {
        id: Date.now(),
        name: formData.name,
        role: formData.role,
        birthDate: formData.birthDate ? formData.birthDate.toISOString() : "",
        skill: formData.skill,
      };

      dispatch(addTodo(newTodo));
      navigate("/showtodo");
    } else {
      setErrors(validationErrors);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleNameChange = (field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      name: { ...prevState.name, [field]: value },
    }));
  };

  return (
    <div>
      <div className="text-left">
        <span className="text-[#181D27] font-semibold">Personal Info</span>
        <div className="text-[#535862]">
          Update your photo and personal details here.
        </div>
      </div>
      <hr className="mt-6" />
      <div className="flex text-left mt-6">
        <Addnames
          name={formData.name}
          errors={errors}
          handleNameChange={handleNameChange}
        />
      </div>
      <hr className="mt-6" />
      <div className="flex text-left mt-6">
        <span>Role</span>

        <select
          value={formData.role}
          onChange={(e) => handleChange("role", e.target.value)}
          id="roles"
          className="bg-[#ffff] w-1/3 border ml-16 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2"
        >
          <option value="frontend">Front-end</option>
          <option value="frontend">Front-end</option>
          <option value="backend">Back-End</option>
          <option value="uiux">UI-UX</option>
        </select>
        {errors.role && (
          <div className="text-red-500 ml-5 mt-2 flex gap-2">
            <BiError size={20} />
            {errors.role}
          </div>
        )}
      </div>
      <hr className="mt-6" />
      <DateBirth
        birthDate={formData.birthDate}
        errors={errors}
        handleChange={handleChange}
      />

      <hr className="mt-6" />
      <AddSkils
        skills={formData.skill}
        errors={errors}
        handleSkillChange={(value) =>
          handleSkillChange(value, formData, setFormData)
        }
        removeSkill={(skill) => removeSkill(formData.skill, setFormData, skill)}
      />
      <hr className="mt-6" />
      <div className="flex justify-end mt-8 gap-3">
        <button className="border w-24 bg-[#ffff] text-[#414651] p-2 rounded-lg">
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="border w-32 bg-[#C60026] text-[#ffff] p-2 rounded-lg"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default CreateTodo;
