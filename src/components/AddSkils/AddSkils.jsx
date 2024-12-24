import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { BiError } from 'react-icons/bi'

function AddSkils({ skills, errors, handleSkillChange, removeSkill }) {
  return (
<div className="flex text-left mt-6 flex-col">
      <span>Skill Set</span>
      <select
        onChange={(e) => handleSkillChange(e.target.value)}
        value={skills}
        className="bg-[#ffff] w-1/3 border ml-24 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2"
      >
        <option selected>Search keywords</option>
        <option value=".net">.Net</option>
        <option value="c++">C++</option>
        <option value="java">Java</option>
        <option value="php">PHP</option>
        <option value="figma">Figma</option>
        <option value="illustrator">Illustrator</option>
        <option value="react">React</option>
        <option value="typescript">Typescript</option>
        <option value="javascript">JavaScript</option>
        <option value="nextjs">Next.js</option>
      </select>
      {errors.skill && (
        <div className="text-red-500 ml-24 mt-2 flex gap-2">
          <BiError size={20} />
          {errors.skill}
        </div>
      )}
      {skills.length > 0 && (
        <div className="flex ml-24">
          {skills.map((s, index) => (
            <div
              key={index}
              className="bg-[#F5F5F5] text-[#9C0003] ml-2 flex w-28 font-semibold p-2 mt-2 rounded-lg"
            >
              {s}
              <AiOutlineClose
                className="mt-[0.4rem] ml-1"
                onClick={() => removeSkill(s)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AddSkils