import React from 'react'
import DatePicker from 'react-datepicker'
import { BiError } from 'react-icons/bi'

function DateBirth({ birthDate, errors, handleChange }) {
  return (
<div className="text-left mt-6">
      <span>Birth Date</span>
      <div className="mt-2 ml-24">
        <DatePicker
          selected={birthDate}
          onChange={(date) => handleChange("birthDate", date)}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select your birth date"
          className="border p-2 rounded-lg w-[25.5rem] relative"
          showYearDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={50}
        />
      </div>
      {errors.birthDate && (
        <div className="text-red-500 ml-24 mt-2 flex gap-2">
          <BiError size={20} />
          {errors.birthDate}
        </div>
      )}
    </div>
  )
}

export default DateBirth