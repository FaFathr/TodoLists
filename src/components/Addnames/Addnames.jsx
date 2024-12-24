import React from 'react'
import { BiError } from 'react-icons/bi'

function Addnames({ name, errors, handleNameChange }) {
  return (
    <div className="flex text-left mt-6">
    <span>Name</span>
    <div>
      <input
        type="text"
        className="border ml-14 p-1 rounded-lg"
        value={name.firstName}
        onChange={(e) => handleNameChange("firstName", e.target.value)}
      />
      {errors.firstName && (
        <div className="text-red-500 ml-16 mt-2 flex gap-2">
          <BiError size={20} />
          {errors.firstName}
        </div>
      )}
    </div>
    <div>
      <input
        type="text"
        className="border ml-6 p-1 rounded-lg"
        value={name.lastName}
        onChange={(e) => handleNameChange("lastName", e.target.value)}
      />
      {errors.lastName && (
        <div className="text-red-500 ml-6 mt-2 flex gap-2">
          <BiError size={20} />
          {errors.lastName}
        </div>
      )}
    </div>
  </div>
  )
}

export default Addnames