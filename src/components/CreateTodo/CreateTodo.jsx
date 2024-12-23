import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTodo } from "../../redux/slices/TodoSlices";
import { AiOutlineClose } from "react-icons/ai";
function CreateTodo() {
  const [name, setName] = useState({ firstName: "", lastName: "" });
  const [role, setRole] = useState("");
  const [birthDate, setBirthDate] = useState(null);
  const [skill, setSkill] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSave = () => {
    const newTodo = {
      id: Date.now(),
      name,
      role,
      birthDate: birthDate ? birthDate.toISOString() : "",
      skill,
    };

    dispatch(addTodo(newTodo));
    navigate("/showtodo");
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkill(skill.filter((s) => s !== skillToRemove));
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
        <span>Name</span>
        <input
          type="text"
          className="border ml-14 p-1 rounded-lg"
          value={name.firstName}
          onChange={(e) => setName({ ...name, firstName: e.target.value })}
        />
        <input
          type="text"
          className="border ml-6 p-1 rounded-lg"
          value={name.lastName}
          onChange={(e) => setName({ ...name, lastName: e.target.value })}
        />
      </div>
      <hr className="mt-6" />
      <div className="flex text-left mt-6">
        <span>Role</span>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          id="roles"
          className="bg-[#ffff] w-1/3 border ml-16  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 "
        >
          <option value="frontend"> Front-end</option>
          <option value="backend">Back-End</option>
          <option value="uiux">UI-UX</option>
        </select>
      </div>
      <hr className="mt-6" />
      <div className="text-left mt-6">
        <span>Birth Date</span>
        <div className="mt-2 ml-24 ">
          <DatePicker
            selected={birthDate}
            onChange={(date) => setBirthDate(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select your birth date"
            className="border p-2 rounded-lg w-[25.5rem] relative"
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={50}
          />
        </div>
      </div>
      <hr className="mt-6" />
      <div className="flex text-left mt-6 flex-col ">
        <span>Skil Set</span>
        <select
          onChange={(e) => {
            const selectedValue = e.target.value;
            if (selectedValue && !skill.includes(selectedValue)) {
              setSkill([...skill, selectedValue]);
            }
          }}
          value={skill}
          id="skills"
          className="bg-[#ffff] w-1/3 border ml-24 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2"
        >
          <option selected>search keywords</option>
          <option value=".net">.Net </option>
          <option value="c++">c++ </option>
          <option value="java"> java </option>
          <option value="php"> php </option>
          <option value="figma"> figma </option>
          <option value="illustraator"> illustraator </option>
          <option value="react">React</option>
          <option value="typescript">Typescript</option>
          <option value="javascript">javascript</option>
          <option value="nextjs">Next js</option>
        </select>
        {skill.length > 0 && (
          <div className="flex ml-24 ">
            {skill.map((s, index) => (
              <div
                key={index}
                className="bg-[#F5F5F5] text-[#9C0003] ml-2 flex w-28  font-semibold p-2 mt-2 rounded-lg"
              >
                {s}
                <AiOutlineClose
                  className="mt-[0.4rem] ml-1"
                  onClick={() => handleRemoveSkill(s)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <hr className="mt-6" />
      <div className=" flex justify-end mt-8 gap-3">
        <button className="border w-24 bg-[#ffff] text-[#414651] p-2 rounded-lg">
          cancel
        </button>
        <button
          onClick={handleSave}
          className="border w-32 bg-[#C60026] text-[#ffff] p-2 rounded-lg"
        >
          save
        </button>
      </div>
    </div>
  );
}

export default CreateTodo;
